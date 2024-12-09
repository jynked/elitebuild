import React, { useState, useEffect } from 'react';
import { IoIosHeartEmpty } from "react-icons/io";
import { IoHeart } from "react-icons/io5";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Link from 'next/link';
import { getSavedProducts, removeProduct } from '@/services/storageHelpers';

const FavoriteProducts = () => {
  const [favoriteProducts, setFavoriteProducts] = useState<any[]>([]);
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [currentImageIndex, setCurrentImageIndex] = useState<Record<number, number>>({});

  const loadFavorites = () => {
    const savedProducts = getSavedProducts();
    setFavoriteProducts(savedProducts);

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
    loadFavorites();

    const handleStorageChange = () => {
      loadFavorites();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

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

  const removeFavorite = (productId: number) => {
    removeProduct(productId);
    loadFavorites();
  };

  const handleImageChange = (productId: number, direction: 'prev' | 'next') => {
    const product = favoriteProducts.find((p) => p.id === productId);
    if (!product || !product.imageThumbnails) return;

    setCurrentImageIndex((prev) => ({
      ...prev,
      [productId]:
        direction === 'prev'
          ? (prev[productId] - 1 + product.imageThumbnails.length) % product.imageThumbnails.length
          : (prev[productId] + 1) % product.imageThumbnails.length,
    }));
  };

  //фильтрация
  const [sortBy, setSortBy] = useState<string>(''); // Состояние для выбранного фильтра

  const handleSortChange = (sortBy: 'price' | 'popularity' | 'rating') => {
    setActiveSort(sortBy); // Устанавливаем активную кнопку
    setSortBy(sortBy);     // Применяем сортировку
  };
  
    const sortedProducts = favoriteProducts.sort((a, b) => {
        if (sortBy === 'price') {
        return a.price - b.price; // Сортировка по цене
        } else if (sortBy === 'popularity') {
        return a.popularity - b.popularity; // Сортировка по популярности
        } else if (sortBy === 'rating') {
        return a.rating - b.rating; // Сортировка по рейтингу
        }
        return 0; // Если сортировка не выбрана, то не меняем порядок
    });
    
    //активная кнопка
    const [activeSort, setActiveSort] = useState<'price' | 'popularity' | 'rating'>('price'); // Активная сортировка



  return (
    <section className="favorite-products">
       <div className="favorites-header__breadcrumb">
        <Link href="/">Главная</Link>
        {" / "}
        <Link href="/favorites">
            <span>Избранное</span>
        </Link>
       </div>  
      <h2 className="favorite-products__title">Избранное</h2>
      <div className="favorites-header__controls">
      <div className="favorites-header__categories">
        <div className="favorites-header__categories-header">
            <p className="favorites-header__categories-title-all">Все категории</p>
            <p className="favorites-header__categories-title-tools">Инструменты</p>
        </div>
        <div className="favorites-header__categories-list">
            <span className="favorites-header__categories-count-all">1</span>
            <span className="favorites-header__categories-count-tools">1</span>
        </div>
      </div>
      <div className="favorites-header__sort">
        <p className="favorites-header__sort-title">Сортировать:</p>
        <div className="favorites-header__sort-options">
            <button
                className={`favorites-header__sort-price ${activeSort === 'price' ? 'active' : ''}`}
                onClick={() => handleSortChange('price')}
            >
                по цене
            </button>
            <button
                className={`favorites-header__sort-popularity ${activeSort === 'popularity' ? 'active' : ''}`}
                onClick={() => handleSortChange('popularity')}
            >
                по популярности
            </button>
            <button
                className={`favorites-header__sort-rating ${activeSort === 'rating' ? 'active' : ''}`}
                onClick={() => handleSortChange('rating')}
            >
                по рейтингу
            </button>
            </div>
       </div>
      </div>      

      <div className="favorite-products__list">
        {favoriteProducts.length > 0 ? (
          favoriteProducts.map((product) => (
            <div key={product.id} className="favorite-products__item">
              <div className="favorite-products__image-wrapper">
                <button
                  className="favorite-products__image-button favorite-products__image-button--prev"
                  onClick={() => handleImageChange(product.id, 'prev')}
                >
                  <MdKeyboardArrowLeft className="favorite-products__icon--prev" />
                </button>
                <img
                    src={
                        product.imageThumbnails &&
                        product.imageThumbnails[currentImageIndex[product.id]] !== undefined
                        ? product.imageThumbnails[currentImageIndex[product.id]]
                        : "/placeholder-image.jpg" // Указываем изображение-заглушку
                    }
                    alt={product.name}
                    className="related-products__image"
                    />
                <button
                  className="favorite-products__image-button favorite-products__image-button--next"
                  onClick={() => handleImageChange(product.id, 'next')}
                >
                  <MdKeyboardArrowRight className="favorite-products__icon--next" />
                </button>
              </div>

              <button
                className="favorite-products__heart-button"
                onClick={() => removeFavorite(product.id)}
              >
                <IoHeart className="favorite-products__heart-icon active" />
              </button>

              <p className="favorite-products__name">{product.name}</p>
              <p className="favorite-products__article">Артикул: {product.article}</p>
              <p className="favorite-products__price">
                {product.price} {product.currency}
              </p>

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
            </div>
          ))
        ) : (
          <p className="favorite-products__empty">Избранных товаров нет</p>
        )}
      </div>
    </section>
  );
};

export default FavoriteProducts;
