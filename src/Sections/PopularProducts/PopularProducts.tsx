import React, { useState, useEffect } from 'react';
import { popularProducts } from '@/src/source';
import { IoIosHeartEmpty } from "react-icons/io";
import { IoHeart } from "react-icons/io5";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const PopularProducts = () => { 
  const [quantities, setQuantities] = useState<Record<number, number>>(
    popularProducts.reduce((acc, product) => {
      acc[product.id] = 1; 
      return acc;
    }, {} as Record<number, number>) 
  );

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

  const [likedProducts, setLikedProducts] = useState<Record<number, boolean>>({});
  const [savedProducts, setSavedProducts] = useState<number[]>([]);

  const toggleLike = (productId: number) => {
    setLikedProducts((prev) => {
      const isLiked = !prev[productId];
  
      if (isLiked) {
        setSavedProducts((prevSaved) => [...prevSaved, productId]);
      } else {
        setSavedProducts((prevSaved) => prevSaved.filter((id) => id !== productId));
      }
  
      return {
        ...prev,
        [productId]: isLiked,
      };
    });
  };

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedProducts') || '[]');
    setSavedProducts(saved);
    const liked = saved.reduce((acc: Record<number, boolean>, id: number) => {
      acc[id] = true;
      return acc;
    }, {});
    setLikedProducts(liked);
  }, []);

  useEffect(() => {
    localStorage.setItem('savedProducts', JSON.stringify(savedProducts));
  }, [savedProducts]);

  const [currentImageIndex, setCurrentImageIndex] = useState<Record<number, number>>(
    popularProducts.reduce((acc, product) => {
      acc[product.id] = 0; 
      return acc;
    }, {} as Record<number, number>)
  );

  const handleImageChange = (productId: number, direction: 'prev' | 'next') => {
    const product = popularProducts.find((p) => p.id === productId);
    if (!product || !product.imageThumbnails) return;

    setCurrentImageIndex((prev) => ({
      ...prev,
      [productId]:
        direction === 'prev'
          ? (prev[productId] - 1 + product.imageThumbnails.length) % product.imageThumbnails.length
          : (prev[productId] + 1) % product.imageThumbnails.length,
    }));
  };

  return (
    <section className="popular-products">
      <h2 className="popular-products__title">Популярные товары</h2>
      <div className="popular-products__list">
        {popularProducts.map((product) => (
          <div key={product.id} className="popular-products__item">
            
            <div className="popular-products__image-wrapper">
              <button
                className="popular-products__image-button popular-products__image-button--prev"
                onClick={() => handleImageChange(product.id, 'prev')}
              >
                <MdKeyboardArrowLeft className="popular-products__icon--prev"/>
              </button>
              <img
                src={product.imageThumbnails[currentImageIndex[product.id]]}
                alt={product.name}
                className="popular-products__image"
              />
              <button
                className="popular-products__image-button popular-products__image-button--next"
                onClick={() => handleImageChange(product.id, 'next')}
              >
                <MdKeyboardArrowRight className="popular-products__icon--next"/>
              </button>
            </div>

            <button
              className="popular-products__heart-button"
              onClick={() => toggleLike(product.id)}
            >
              {likedProducts[product.id] ? (
                <IoHeart className="popular-products__heart-icon active" />
              ) : (
                <IoIosHeartEmpty className="popular-products__heart-icon" />
              )}
            </button>

            <p className="popular-products__name">{product.name}</p>
            <p className="popular-products__article">Артикул: {product.article}</p>
            <p className="popular-products__price">
              {product.price} {product.currency}
            </p>

            <div className="popular-products-actions">
              <button className="popular-products-actions__add-to-cart">В корзину</button>
              <div className="popular-products-actions__quantity">
                <button
                  className="popular-products-actions__button"
                  onClick={() => decreaseQuantity(product.id)}
                >
                  -
                </button>
                <p className="popular-products-actions__value">{quantities[product.id]}</p>
                <button
                  className="popular-products-actions__button"
                  onClick={() => increaseQuantity(product.id)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularProducts;
