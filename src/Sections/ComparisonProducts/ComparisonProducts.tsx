import React, { useState, useEffect } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { IoHeart } from "react-icons/io5";
import Link from 'next/link';
import { getSavedProducts, removeProduct } from '@/services/storageHelpers';

const ComparisonProducts = () => {
  const [comparisonProducts, setComparisonProducts] = useState<any[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState<Record<number, number>>({});
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  const loadComparisonProducts = () => {
    const savedProducts = getSavedProducts();
    setComparisonProducts(savedProducts);

    const initialQuantities = savedProducts.reduce((acc: Record<number, number>, product: any) => {
      acc[product.id] = acc[product.id] || 1;
      return acc;
    }, {});
    setQuantities(initialQuantities);

    const initialImageIndexes = savedProducts.reduce((acc: Record<number, number>, product: any) => {
      acc[product.id] = 0;
      return acc;
    }, {});
    setCurrentImageIndex(initialImageIndexes);
  };

  useEffect(() => {
    loadComparisonProducts();

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'savedProducts') {
        loadComparisonProducts();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleImageChange = (productId: number, direction: 'prev' | 'next') => {
    const product = comparisonProducts.find((p) => p.id === productId);
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

  const removeComparison = (productId: number) => {
    removeProduct(productId);
    setComparisonProducts((prev) => prev.filter((product) => product.id !== productId));
  };

  return (
    <section className="comparison-products">
      <div className="comparison-header__breadcrumb">
        <Link href="/">Главная</Link>
        {" / "}
        <Link href="/comparison">
          <span>Сравнение</span>
        </Link>
      </div>
      <h2 className="comparison-products__title">Сравнение</h2>
      <div className="categories-container">
        <div className="category-item">
          <p className="category-title">Инструменты</p>
          <span className="category-count">1</span>
        </div>
        <div className="category-item">
          <p className="category-title">Инструменты</p>
          <span className="category-count">1</span>
        </div>
        <div className="category-item">
          <p className="category-title">Инструменты</p>
          <span className="category-count">1</span>
        </div>
      </div>
      <div className="comparison-products__list">
        {comparisonProducts.length > 0 ? (
          comparisonProducts.map((product) => (
            <div key={product.id} className="comparison-products__item">
              <div className="comparison-products__image-wrapper">
                <button
                  className="comparison-products__image-button comparison-products__image-button--prev"
                  onClick={() => handleImageChange(product.id, 'prev')}
                >
                  <MdKeyboardArrowLeft className="comparison-products__icon--prev" />
                </button>
                <img
                  src={
                    product.imageThumbnails &&
                    product.imageThumbnails[currentImageIndex[product.id]] !== undefined
                      ? product.imageThumbnails[currentImageIndex[product.id]]
                      : "/placeholder-image.jpg"
                  }
                  alt={product.name}
                  className="comparison-products__image"
                />
                <button
                  className="comparison-products__image-button comparison-products__image-button--next"
                  onClick={() => handleImageChange(product.id, 'next')}
                >
                  <MdKeyboardArrowRight className="comparison-products__icon--next" />
                </button>
              </div>

              <button
                className="comparison-products__remove-button"
                onClick={() => removeComparison(product.id)}
              >
                <IoHeart className="comparison-products__remove-icon active" />
              </button>

              <p className="comparison-products__name">{product.name}</p>
              <p className="comparison-products__article">Артикул: {product.article}</p>       
      
              <div className="favorite-products-actions">
                <button className="favorite-products-actions__add-to-cart">В корзину</button>
                <div className="favorite-products-actions__quantity">
                  <button
                    className="favorite-products-actions__button"
                    onClick={() => decreaseQuantity(product.id)}
                  >
                    -
                  </button>
                  <p className="favorite-products-actions__value">{quantities[product.id]}</p>
                  <button
                    className="favorite-products-actions__button"
                    onClick={() => increaseQuantity(product.id)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="comparison-products__details">
                <div className="comparison-products__details-price">
                        <div className="comparison-products__details-title">
                        <p>Цена:</p>
                        </div>
                        <div className="comparison-products__details-value">
                        <p>
                            {product.price} {product.currency}
                        </p>
                        </div>
                    </div>
                    <div className="comparison-products__details-dimensions">
                        <div className="comparison-products__details-title">
                        <p>Габариты:</p>
                        </div>
                        <div className="comparison-products__details-value">
                        <p>{product.dimensions || "—"}</p>
                        </div>
                    </div>
                    <div className="comparison-products__details-material">
                        <div className="comparison-products__details-title">
                        <p>Материал:</p>
                        </div>
                        <div className="comparison-products__details-value">
                        <p>{product.material || "—"}</p>
                        </div>
                    </div>
                    <div className="comparison-products__details-colors">
                        <div className="comparison-products__details-title">
                        <p>Доступные цвета:</p>
                        </div>
                        <div className="comparison-products__details-value">
                        <p>{product.availableColors?.join(", ") || "—"}</p>
                        </div>
                    </div>           
                </div>
            </div>
          ))
        ) : (
          <p className="comparison-products__empty">Нет товаров для сравнения</p>
        )}
      </div>
    </section>
  );
};

export default ComparisonProducts;


