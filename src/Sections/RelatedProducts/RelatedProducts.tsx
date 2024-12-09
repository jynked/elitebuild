import React, { useState, useEffect } from 'react';
import { recommendedProducts } from '@/src/source';
import { IoIosHeartEmpty } from "react-icons/io";
import { IoHeart } from "react-icons/io5";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { getSavedProducts, saveProduct, removeProduct, isProductSaved } from '@/services/storageHelpers';

const RelatedProducts = () => { 
  const [quantities, setQuantities] = useState<Record<number, number>>(
    recommendedProducts.reduce((acc, product) => {
      acc[product.id] = 1; 
      return acc;
    }, {} as Record<number, number>) 
  );

  const [likedProducts, setLikedProducts] = useState<Record<number, boolean>>({});
  const [savedProducts, setSavedProducts] = useState<any[]>([]);

  useEffect(() => {
    const saved = getSavedProducts();
    setSavedProducts(saved);
    const liked = saved.reduce((acc: Record<number, boolean>, product: any) => {
      acc[product.id] = true;
      return acc;
    }, {});
    setLikedProducts(liked);
  }, []);

  /*const toggleLike = (product: any) => {
    const isLiked = likedProducts[product.id];
    if (isLiked) {
      removeProduct(product.id);
      setLikedProducts((prev) => ({ ...prev, [product.id]: false }));
      setSavedProducts((prev) => prev.filter((p) => p.id !== product.id));
    } else {
      saveProduct(product);
      setLikedProducts((prev) => ({ ...prev, [product.id]: true }));
      setSavedProducts((prev) => [...prev, product]);
    }
  };*/
  const toggleLike = (product: any) => {
    const isLiked = likedProducts[product.id];
  
    if (isLiked) {
      // Если товар уже в избранном — удаляем
      removeProduct(product.id);
      setLikedProducts((prev) => ({ ...prev, [product.id]: false }));
      setSavedProducts((prev) => prev.filter((p) => p.id !== product.id));
  
      // Убираем количество, если удаляем товар
      setQuantities((prevQuantities) => {
        const { [product.id]: _, ...rest } = prevQuantities; // Удаляем количество для удаленного товара
        return rest;
      });
    } else {
      // Если товара нет в избранном — добавляем
      saveProduct(product);
      setLikedProducts((prev) => ({ ...prev, [product.id]: true }));
      setSavedProducts((prev) => [...prev, product]);
  
      // Устанавливаем количество по умолчанию (например, 1)
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [product.id]: prevQuantities[product.id] || 1,
      }));
    }
  
    console.log('Избранное обновлено:', getSavedProducts());
    console.log('Текущее количество:', quantities);
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

  const [currentImageIndex, setCurrentImageIndex] = useState<Record<number, number>>(
    recommendedProducts.reduce((acc, product) => {
      acc[product.id] = 0; 
      return acc;
    }, {} as Record<number, number>)
  );

  const handleImageChange = (productId: number, direction: 'prev' | 'next') => {
    const product = recommendedProducts.find((p) => p.id === productId);
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
    <section className="related-products">
      <h2 className="related-products__title">С этим товаром покупают</h2>
      <div className="related-products__list">
        {recommendedProducts.map((product) => (
          <div key={product.id} className="related-products__item">
            <div className="related-products__image-wrapper">
              <button
                className="related-products__image-button related-products__image-button--prev"
                onClick={() => handleImageChange(product.id, 'prev')}
              >
                <MdKeyboardArrowLeft className="related-products__icon--prev" />
              </button>
              <img
                src={product.imageThumbnails[currentImageIndex[product.id]]}
                alt={product.name}
                className="related-products__image"
              />
              <button
                className="related-products__image-button related-products__image-button--next"
                onClick={() => handleImageChange(product.id, 'next')}
              >
                <MdKeyboardArrowRight className="related-products__icon--next" />
              </button>
            </div>

            <button
              className="related-products__heart-button"
              onClick={() => toggleLike(product)}
            >
              {likedProducts[product.id] ? (
                <IoHeart className="related-products__heart-icon active" />
              ) : (
                <IoIosHeartEmpty className="related-products__heart-icon" />
              )}
            </button>

            <p className="related-products__name">{product.name}</p>
            <p className="related-products__article">Артикул: {product.article}</p>
            <p className="related-products__price">
              {product.price} {product.currency}
            </p>

            <div className="related-products-actions">
              <button className="related-products-actions__add-to-cart">В корзину</button>
              <div className="related-products-actions__quantity">
                <button
                  className="related-products-actions__button"
                  onClick={() => decreaseQuantity(product.id)}
                >
                  -
                </button>
                <p className="related-products-actions__value">{quantities[product.id]}</p>
                <button
                  className="related-products-actions__button"
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

export default RelatedProducts;


