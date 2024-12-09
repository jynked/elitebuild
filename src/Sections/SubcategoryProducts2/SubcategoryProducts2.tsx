import React, { useState } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { productData, manufacturers, colors } from '@/src/source';
import Link from 'next/link';
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { IoCheckboxSharp } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io"; 
import { IoStarSharp } from "react-icons/io5";

const SubcategoryProducts2 = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState<Record<number, number>>(
    productData.reduce((acc, product) => {
      acc[product.id] = 0;
      return acc;
    }, {} as Record<number, number>)
  );

  const [quantities, setQuantities] = useState<Record<number, number>>(
    productData.reduce((acc, product) => {
      acc[product.id] = 1;
      return acc;
    }, {} as Record<number, number>)
  );

  const handleImageChange = (productId: number, direction: 'prev' | 'next') => {
    const product = productData.find((p) => p.id === productId);
    if (!product || !product.imageThumbnails) return;

    setCurrentImageIndex((prev) => ({
      ...prev,
      [productId]:
        direction === 'prev'
          ? (prev[productId] - 1 + product.imageThumbnails.length) % product.imageThumbnails.length
          : (prev[productId] + 1) % product.imageThumbnails.length,
    }));
  };

  const increaseQuantity = (productId: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: prevQuantities[productId] + 1,
    }));
  };

  const decreaseQuantity = (productId: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: prevQuantities[productId] > 1 ? prevQuantities[productId] - 1 : 1,
    }));
  };

  const [selectedManufacturers, setSelectedManufacturers] = useState<number[]>([]);
  const [selectedColors, setSelectedColors] = useState<number[]>([]);

  const toggleManufacturer = (index: number) => {
    setSelectedManufacturers((prev) =>
      prev.includes(index) ? prev.filter((id) => id !== index) : [...prev, index]
    );
  };

  const toggleColor = (index: number) => {
    setSelectedColors((prev) =>
      prev.includes(index) ? prev.filter((id) => id !== index) : [...prev, index]
    );
  };

  const [sortBy, setSortBy] = useState<'price' | 'popularity' | 'rating'>('price');
  const [activeSort, setActiveSort] = useState<'price' | 'popularity' | 'rating'>('price');

  const handleSortChange = (sortKey: 'price' | 'popularity' | 'rating') => {
    setActiveSort(sortKey);
    setSortBy(sortKey);
  };

  const sortedProductData = [...productData].sort((a, b) => {
    if (sortBy === 'price') {
      return a.price - b.price;
    } else if (sortBy === 'popularity') {
      return b.salesCount - a.salesCount;
    } else if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    return 0;
  });

  const filteredProductData = productData.filter((product) => {
    const matchesManufacturer =
      selectedManufacturers.length === 0 ||
      selectedManufacturers.includes(manufacturers.indexOf(product.manufacturer));

    const matchesColor =
      selectedColors.length === 0 ||
      product.availableColors.some((color) => selectedColors.includes(colors.indexOf(color)));

    return matchesManufacturer && matchesColor;
  });

  const sortedAndFilteredProductData = [...filteredProductData].sort((a, b) => {
    if (sortBy === 'price') {
      return a.price - b.price;
    } else if (sortBy === 'popularity') {
      return b.salesCount - a.salesCount;
    } else if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    return 0;
  });

  const [maxPrice, setMaxPrice] = useState(9999999);

  const handlePriceChange = (value: number) => {
    setMaxPrice(value);
  };

  const filteredByPriceProductData = sortedAndFilteredProductData.filter((product) => {
    return product.price <= maxPrice;
  });

  const [activeTabs, setActiveTabs] = useState<Record<number, string>>(
    productData.reduce((acc, product) => {
      acc[product.id] = "description"; // Изначально вкладка "Описание"
      return acc;
    }, {} as Record<number, string>)
  );
  
  const handleTabChange = (productId: number, tab: string) => {
    setActiveTabs((prev) => ({
      ...prev,
      [productId]: tab,
    }));
  };
  
  


  const getTabContent = (product: any) => {
    switch (activeTabs[product.id]) {
        case "description":
            return product.description[0].split("<br><br>");
        case "instruction":
            return product.instruction || ["Информация отсутствует."];
        case "delivery":
            return product.deliveryOptions || ["Информация отсутствует."];
        default:
            return [];
    }
};


  
  
  return (
    <section className="subcategory-products2">
      <div className="subcategory-products2__breadcrumb">
        <Link href="/">Главная</Link>
        {" / "}
        <Link href="/catalog">
          <span>Каталог</span>
        </Link>
        {" / "}
        <Link href="/category">
          <span>Категория</span>
        </Link>
        {" / "}
        <Link href="/subcategory2">
          <span>Подкатегория</span>
        </Link>
      </div>

      <h2 className="subcategory-products2__title">Подкатегория2</h2>

      <div className="subcategory-products2__container">
        <div className="subcategory-products2__left">
          <div className="subcategory-products2__price-range">
            <div className="subcategory-products2__price-title">Цена, ₽</div>
            <div className="subcategory-products2__price-inputs">
              <div className="subcategory-products2__price-min">от 110</div>
              <div className="subcategory-products2__price-divider">–</div>
              <div className="subcategory-products2__price-max">{maxPrice}</div>
            </div>
            <div className="subcategory-products2__price-slider">
              <input
                type="range"
                min="110"
                max="5000"
                value={maxPrice}
                onChange={(e) => handlePriceChange(Number(e.target.value))}
                className="subcategory-products2__slider"
              />
            </div>
          </div>

          <div className="subcategory-products2__manufacturers">
            <div className="subcategory-products2__manufacturer-title">Производитель <IoIosArrowDown className="icon-dropdown"/></div>
            {manufacturers.map((manufacturer, index) => (
              <div
                key={index}
                className="subcategory-products2__manufacturer-item"
                onClick={() => toggleManufacturer(index)}
              >
                {selectedManufacturers.includes(index) ? (
                  <IoCheckboxSharp className="subcategory-products2__icon-checked" />
                ) : (
                  <MdCheckBoxOutlineBlank className="subcategory-products2__icon-unchecked" />
                )}
                {manufacturer}
              </div>
            ))}
          </div>

          <div className="subcategory-products2__colors">
            <div className="subcategory-products2__colors-title">Цвет <IoIosArrowDown className="icon-dropdown"/></div>
            {colors.map((color, index) => (
              <div
                key={index}
                className="subcategory-products2__color-item"
                onClick={() => toggleColor(index)}
              >
                {selectedColors.includes(index) ? (
                  <IoCheckboxSharp className="subcategory-products2__icon-checked" />
                ) : (
                  <MdCheckBoxOutlineBlank className="subcategory-products2__icon-unchecked" />
                )}
                {color}
              </div>
            ))}
          </div>
        </div>

        <div className="subcategory-products2__wrapper">
          <div className="subcategory-products2__sort">
            <p className="subcategory-products2__sort-title">Сортировать:</p>
            <div className="subcategory-products2__sort-options">
              <button
                className={`subcategory-products2__sort-price ${activeSort === 'price' ? 'active' : ''}`}
                onClick={() => handleSortChange('price')}
              >
                по цене
              </button>
              <button
                className={`subcategory-products2__sort-popularity ${activeSort === 'popularity' ? 'active' : ''}`}
                onClick={() => handleSortChange('popularity')}
              >
                по популярности
              </button>
              <button
                className={`subcategory-products2__sort-rating ${activeSort === 'rating' ? 'active' : ''}`}
                onClick={() => handleSortChange('rating')}
              >
                по рейтингу
              </button>
            </div>
          </div>

          <div className="subcategory-products2__list">
            {filteredByPriceProductData.slice(0, 2).map((product) => (
                <div key={product.id} className="subcategory-products2__card">
                {/* Левая часть карточки */}
                <div className="subcategory-products2__left">
                    <img
                    src={product.imageThumbnails[currentImageIndex[product.id]] || "/placeholder-image.jpg"}
                    alt={product.name}
                    className="subcategory-products2__image"
                    />
                </div>

                {/* Правая часть карточки */}
                <div className="subcategory-products2__right">
                    {/* Название товара */}
                    <h3 className="subcategory-products2__name">{product.name}</h3>
                    <p className="subcategory-products2__article">Артикул: {product.article}</p>

                    {/* Рейтинг */}
                    <div className="subcategory-products2__rating">
                    {Array.from({ length: Math.round(product.rating) }).map((_, index) => (
                        <IoStarSharp key={index} className="subcategory-products2__star" />
                    ))}
                    </div>

                    {/* Цена */}
                    <p className="subcategory-products2__price">
                    {product.price} {product.currency}
                    </p>

                    {/* Вкладки */}
                    <div className="subcategory-products2__tabs">
                        <button
                            className={`subcategory-products2__tab ${
                                activeTabs[product.id] === "description" ? "active" : ""
                            }`}
                            onClick={() => handleTabChange(product.id, "description")}
                        >
                            Описание
                        </button>
                        <button
                            className={`subcategory-products2__tab ${
                                activeTabs[product.id] === "instruction" ? "active" : ""
                            }`}
                            onClick={() => handleTabChange(product.id, "instruction")}
                        >
                            Инструкция
                        </button>
                        <button
                            className={`subcategory-products2__tab ${
                                activeTabs[product.id] === "delivery" ? "active" : ""
                            }`}
                            onClick={() => handleTabChange(product.id, "delivery")}
                        >
                            Доставка и оплата
                        </button>
                    </div>


                    {/* Контент вкладок */}
                    <div className="subcategory-products2__tab-content">
                        {getTabContent(product).map((content: string, index: number) => (
                            <p key={index}>{content}</p>
                        ))}
                    </div>


                    {/* Кнопки */}
                    <div className="subcategory-products2__actions">
                    <div className="subcategory-products2__quantity">
                        <button onClick={() => decreaseQuantity(product.id)}>-</button>
                        <span>{quantities[product.id]}</span>
                        <button onClick={() => increaseQuantity(product.id)}>+</button>
                    </div>
                    <button className="subcategory-products2__add-to-cart">В корзину</button>
                    </div>
                </div>
                </div>
            ))}
            </div>





        </div>
      </div>
    </section>
  );
};

export default SubcategoryProducts2;

