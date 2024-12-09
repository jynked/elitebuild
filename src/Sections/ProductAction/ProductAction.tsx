import React from "react";

const ProductAction: React.FC = () => {
  return (
    <section id="product-action">
      <div className="product-action__content">       
        <div className="product-action__block product-action__block--1"></div>
        <div className="product-action__block product-action__block--2"></div>
        <div className="product-action__block product-action__block--3"></div>
        <div className="product-action__block product-action__block--4"></div>
      </div>

      <div className="product-action__show-all">
        <button className="product-action__show-all-button">Показать все</button>
      </div>
    </section>
  );
};

export default ProductAction;


