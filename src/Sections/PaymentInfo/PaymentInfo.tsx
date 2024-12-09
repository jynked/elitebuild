import React from 'react';
import Link from 'next/link';

const PaymentInfo = () => {
  return (
    <section className="payment-info">
      <div className="payment-info__breadcrumb">
        <Link href="/">
            Главная
        </Link>   
        {" / "}    
        <Link href="/Payment">
            Оплата
        </Link>
      </div>
      <h1 className="payment-info__title">Оплата</h1>
      <div className="payment-info__columns">
        <div className="payment-info__intro">
          <p>
            Для оплаты вы можете воспользоваться одним из предложенных способов:
          </p>
        </div>
        <ol className="payment-info__list">
          <li className="payment-info__item">
            <strong>Банковская карта.</strong> Выберите предпочитаемый способ оплаты и введите данные вашей карты. Обратите внимание, что при оформлении заказа может потребоваться ввести данные карты повторно.
          </li>
          <li className="payment-info__item">
            <strong>Электронные деньги.</strong> Выберите способ оплаты электронными деньгами и следуйте инструкциям на экране.
          </li>
          <li className="payment-info__item">
            <strong>Банковский перевод.</strong> Вы можете произвести оплату через ваш банк. Для этого вам потребуется указать реквизиты для перевода средств.
          </li>
          <li className="payment-info__item">
            <strong>Наличные при самовывозе.</strong> Если вы собираетесь забрать товар самостоятельно, вы можете оплатить его наличными при получении.
          </li>
        </ol>
        <div className="payment-info__note">
          <p>
            Обратите внимание, что некоторые способы оплаты могут быть недоступны в зависимости от вашего местоположения и других факторов. Пожалуйста, убедитесь, что выбранный вами способ оплаты поддерживается на нашем сайте.
          </p>
          <p>
            После выбора способа оплаты и ввода необходимой информации вы будете перенаправлены на страницу подтверждения заказа. Нажмите кнопку «Оплатить», чтобы завершить покупку.
          </p>
        </div>
        <h2 className="payment-info__subtitle">Оплата для юридических лиц</h2>
        <ol className="payment-info__list">
          <li className="payment-info__item">
            <strong>Расчётный счёт.</strong> Выберите предпочитаемый способ оплаты и укажите реквизиты вашей организации. Обратите внимание, что при оформлении заказа может потребоваться ввести реквизиты повторно.
          </li>
          <li className="payment-info__item">
            <strong>Электронные деньги.</strong> Выберите способ оплаты электронными деньгами и следуйте инструкциям на экране.
          </li>
        </ol>
        <div className="payment-info__note">
          <p>
            Если у вас возникнут вопросы или проблемы с оплатой, пожалуйста, свяжитесь с нашей службой поддержки.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PaymentInfo;
