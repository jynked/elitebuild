import React from "react";

const DeliveryOptions: React.FC = () => {
  return (
    <section id="delivery-options">
      <div className="delivery-options__container">
        <div className="delivery-options__left">
          <h2 className="delivery-options__title">Способ доставки</h2>
          <img
            src="/images/сдэк 1.png"
            alt="Логотип СДЭК"
            className="delivery-options__logo"
          />
        </div>
        <div className="delivery-options__right">
          <h3 className="delivery-options__subtitle">
            Почему мы выбираем СДЭК?
          </h3>
          <div className="delivery-options__features">
            <div className="delivery-options__feature">
              <img
                src="/images/быстро.png"
                alt="Иконка быстро"
                className="delivery-options__icon"
              />
              <p className="delivery-options__text">Быстро</p>
            </div>
            <div className="delivery-options__feature">
              <img
                src="/images/Надежно.png"
                alt="Иконка надежно"
                className="delivery-options__icon"
              />
              <p className="delivery-options__text">Надежно</p>
            </div>
            <div className="delivery-options__feature">
              <img
                src="/images/Выгодно.png"
                alt="Иконка выгодно"
                className="delivery-options__icon"
              />
              <p className="delivery-options__text">Выгодно</p>
            </div>
          </div>
          <div className="delivery-options__button-container">
            <button className="delivery-options__button">Правила доставки</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliveryOptions;
