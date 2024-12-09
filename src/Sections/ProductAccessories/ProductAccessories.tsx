import React, { useState, useEffect } from 'react';
import { accessories } from '@/src/source';
import { IoIosHeartEmpty } from "react-icons/io";
import { IoHeart } from "react-icons/io5";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const ProductAccessories = () => { 
  const [quantities, setQuantities] = useState<Record<number, number>>(
    accessories.reduce((acc, product) => {
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
    accessories.reduce((acc, product) => {
      acc[product.id] = 0; 
      return acc;
    }, {} as Record<number, number>)
  );

  const handleImageChange = (productId: number, direction: 'prev' | 'next') => {
    const product = accessories.find((p) => p.id === productId);
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
    <section className="product-accessories">
      <h2 className="product-accessories__title">Вам могут понадобиться</h2>
      <div className="product-accessories__list">
        {accessories.map((product) => (
          <div key={product.id} className="product-accessories__item">
            
            <div className="product-accessories__image-wrapper">
              <button
                className="product-accessories__image-button product-accessories__image-button--prev"
                onClick={() => handleImageChange(product.id, 'prev')}
              >
                <MdKeyboardArrowLeft className="product-accessories__icon--prev"/>
              </button>
              <img
                src={product.imageThumbnails[currentImageIndex[product.id]]}
                alt={product.name}
                className="product-accessories__image"
              />
              <button
                className="product-accessories__image-button product-accessories__image-button--next"
                onClick={() => handleImageChange(product.id, 'next')}
              >
                <MdKeyboardArrowRight className="product-accessories__icon--next"/>
              </button>
            </div>

            <button
              className="product-accessories__heart-button"
              onClick={() => toggleLike(product.id)}
            >
              {likedProducts[product.id] ? (
                <IoHeart className="product-accessories__heart-icon active" />
              ) : (
                <IoIosHeartEmpty className="product-accessories__heart-icon" />
              )}
            </button>

            <p className="product-accessories__name">{product.name}</p>
            <p className="product-accessories__article">Артикул: {product.article}</p>
            <p className="product-accessories__price">
              {product.price} {product.currency}
            </p>

            <div className="product-accessories-actions">
              <button className="product-accessories-actions__add-to-cart">В корзину</button>
              <div className="product-accessories-actions__quantity">
                <button
                  className="product-accessories-actions__button"
                  onClick={() => decreaseQuantity(product.id)}
                >
                  -
                </button>
                <p className="product-accessories-actions__value">{quantities[product.id]}</p>
                <button
                  className="product-accessories-actions__button"
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

export default ProductAccessories;
