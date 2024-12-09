import React, { useState } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { productData, manufacturers, colors } from '@/src/source';
import Link from 'next/link';
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { IoCheckboxSharp } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io"; 

const SubcategoryProducts = () => {
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

  // Состояние для выбранных производителей и цветов
    const [selectedManufacturers, setSelectedManufacturers] = useState<number[]>([]);
    const [selectedColors, setSelectedColors] = useState<number[]>([]);

    // Функция переключения состояния производителя
    const toggleManufacturer = (index: number) => {
    setSelectedManufacturers((prev) =>
        prev.includes(index) ? prev.filter((id) => id !== index) : [...prev, index]
    );
    };

    // Функция переключения состояния цвета
    const toggleColor = (index: number) => {
    setSelectedColors((prev) =>
        prev.includes(index) ? prev.filter((id) => id !== index) : [...prev, index]
    );
    };


    // Для сортировки и фильтрации
    const [sortBy, setSortBy] = useState<'price' | 'popularity' | 'rating'>('price');
    const [activeSort, setActiveSort] = useState<'price' | 'popularity' | 'rating'>('price');

    // Логика для сортировки
    const handleSortChange = (sortKey: 'price' | 'popularity' | 'rating') => {
        setActiveSort(sortKey);
        setSortBy(sortKey);
    };

    // Обновление productData перед рендером, но рендер остается неизменным
    const sortedProductData = [...productData].sort((a, b) => {
        if (sortBy === 'price') {
            return a.price - b.price;
        } else if (sortBy === 'popularity') {
            return b.salesCount - a.salesCount; // Сортировка по популярности
        } else if (sortBy === 'rating') {
            return b.rating - a.rating; // Сортировка по рейтингу
        }
        return 0;
    });


    
    // Фильтрация продуктов по выбранным производителям и цветам
    const filteredProductData = productData.filter((product) => {
        const matchesManufacturer =
            selectedManufacturers.length === 0 || // Если ничего не выбрано, показываем все
            selectedManufacturers.includes(manufacturers.indexOf(product.manufacturer));

        const matchesColor =
            selectedColors.length === 0 || // Если ничего не выбрано, показываем все
            product.availableColors.some((color) => selectedColors.includes(colors.indexOf(color)));

        return matchesManufacturer && matchesColor;
    });

    // Применение сортировки к отфильтрованным продуктам
    const sortedAndFilteredProductData = [...filteredProductData].sort((a, b) => {
        if (sortBy === 'price') {
            return a.price - b.price;
        } else if (sortBy === 'popularity') {
            return b.salesCount - a.salesCount; // Сортировка по популярности
        } else if (sortBy === 'rating') {
            return b.rating - a.rating; // Сортировка по рейтингу
        }
        return 0;
    });





    // Состояние для выбранной максимальной цены
    const [maxPrice, setMaxPrice] = useState(9999999);

    // Обработчик изменения значения бегунка
    const handlePriceChange = (value: number) => {
        setMaxPrice(value);
    };

    // Фильтрация продуктов по выбранной максимальной цене
    const filteredByPriceProductData = sortedAndFilteredProductData.filter((product) => {
        return product.price <= maxPrice;
    });



  return (
    <section className="subcategory-products">
        <div className="subcategory-products__breadcrumb">
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
            <Link href="/subcategory">
                <span>Подкатегория</span>
            </Link>
        </div>

      <h2 className="subcategory-products__title">Подкатегория</h2>

      <div className="subcategory-products__container">
        <div className="subcategory-products__left">            
            <div className="subcategory-products__price-range">
                <div className="subcategory-products__price-title">Цена, ₽</div>
                <div className="subcategory-products__price-inputs">
                    <div className="subcategory-products__price-min">от 110</div>
                    <div className="subcategory-products__price-divider">–</div>
                    <div className="subcategory-products__price-max">{maxPrice}</div>
                </div>
                <div className="subcategory-products__price-slider">
                    <input
                        type="range"
                        min="110"
                        max="5000"
                        value={maxPrice}
                        onChange={(e) => handlePriceChange(Number(e.target.value))}
                        className="subcategory-products__slider"
                    />
                </div>
            </div>

        
            <div className="subcategory-products__manufacturers">
                <div className="subcategory-products__manufacturer-title">Производитель <IoIosArrowDown className="icon-dropdown"/></div>
                {manufacturers.map((manufacturer, index) => (
                    <div
                    key={index}
                    className="subcategory-products__manufacturer-item"
                    onClick={() => toggleManufacturer(index)}
                    >
                    {selectedManufacturers.includes(index) ? (
                        <IoCheckboxSharp className="subcategory-products__icon-checked" />
                    ) : (
                        <MdCheckBoxOutlineBlank className="subcategory-products__icon-unchecked" />
                    )}
                    {manufacturer}
                    </div>
                ))}
                </div>

                <div className="subcategory-products__colors">
                <div className="subcategory-products__colors-title">Цвет <IoIosArrowDown className="icon-dropdown"/></div>
                {colors.map((color, index) => (
                    <div
                    key={index}
                    className="subcategory-products__color-item"
                    onClick={() => toggleColor(index)}
                    >
                    {selectedColors.includes(index) ? (
                        <IoCheckboxSharp className="subcategory-products__icon-checked" />
                    ) : (
                        <MdCheckBoxOutlineBlank className="subcategory-products__icon-unchecked" />
                    )}
                    {color}
                    </div>
                ))}
            </div>
        </div>

        <div className="subcategory-products__wrapper">        
            <div className="subcategory-products__sort">
                    <p className="subcategory-products__sort-title">Сортировать:</p>
                    <div className="subcategory-products__sort-options">
                        <button
                            className={`subcategory-products__sort-price ${activeSort === 'price' ? 'active' : ''}`}
                            onClick={() => handleSortChange('price')}
                        >
                            по цене
                        </button>
                        <button
                            className={`subcategory-products__sort-popularity ${activeSort === 'popularity' ? 'active' : ''}`}
                            onClick={() => handleSortChange('popularity')}
                        >
                            по популярности
                        </button>
                        <button
                            className={`subcategory-products__sort-rating ${activeSort === 'rating' ? 'active' : ''}`}
                            onClick={() => handleSortChange('rating')}
                        >
                            по рейтингу
                        </button>
                    </div>
            </div>  

            <div className="subcategory-products__list">
            {filteredByPriceProductData.map((product) => (
                <div key={product.id} className="subcategory-products__item">
                    <div className="subcategory-products__image-wrapper">
                    <button
                        className="subcategory-products__image-button subcategory-products__image-button--prev"
                        onClick={() => handleImageChange(product.id, 'prev')}
                    >
                        <MdKeyboardArrowLeft className="subcategory-products__icon--prev" />
                    </button>
                    <img
                        src={
                        product.imageThumbnails &&
                        product.imageThumbnails[currentImageIndex[product.id]] !== undefined
                            ? product.imageThumbnails[currentImageIndex[product.id]]
                            : "/placeholder-image.jpg"
                        }
                        alt={product.name}
                        className="subcategory-products__image"
                    />
                    <button
                        className="subcategory-products__image-button subcategory-products__image-button--next"
                        onClick={() => handleImageChange(product.id, 'next')}
                    >
                        <MdKeyboardArrowRight className="subcategory-products__icon--next" />
                    </button>
                    </div>

                    <p className="subcategory-products__name">{product.name}</p>
                    <p className="subcategory-products__article">Артикул: {product.article}</p>
                    <p className="subcategory-products__price">
                    {product.price} {product.currency}
                    </p>

                    <div className="subcategory-products-actions">
                    <button className="subcategory-products-actions__add-to-cart">В корзину</button>
                    <div className="subcategory-products-actions__quantity">
                        <button
                        className="subcategory-products-actions__button"
                        onClick={() => decreaseQuantity(product.id)}
                        >
                        -
                        </button>
                        <p className="subcategory-products-actions__value">{quantities[product.id]}</p>
                        <button
                        className="subcategory-products-actions__button"
                        onClick={() => increaseQuantity(product.id)}
                        >
                        +
                        </button>
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

export default SubcategoryProducts;
