import React from "react";

const PaymentOptions: React.FC = () => {
  return (
    <section id="payment-options">
      <div className="payment-options__content">
        <h2 className="payment-options__title">Мы принимаем к оплате</h2>
        <div className="payment-options__logos">
          <div className="payment-options__logo">
            <img src="/images/МИР.png" alt="Мир" />
          </div>
          <div className="payment-options__logo">
            <img src="/images/VisaMaster 2.png" alt="Mastercard" />
          </div>
          <div className="payment-options__logo">
            <img src="/images/VisaMaster 1.png" alt="Visa" />
          </div>
          <div className="payment-options__logo">
            <img src="/images/сбп.png" alt="СБП" />
          </div>
          <div className="payment-options__logo">
            <img src="/images/халва.png" alt="Халва" />
          </div>
          <div className="payment-options__description">
            <p className="payment-options__description-text">Рассрочка через банк</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentOptions;
