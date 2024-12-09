import Link from 'next/link';

const Footer = () => {
  return (
    <footer id="footer" className="footer">
      <div className="footer__line"></div>
      <div className="footer__content">              
        <div className="footer__logo-section">
          <div className="footer-logo2">
            <Link href="/">
              <img src="/images/LOGO.png" alt="Интернет- магазин логотип" />
            </Link>
          </div>
          <Link href="/" className="footer__logo-text">
            Интернет- магазин строительных товаров
          </Link>
        </div>

       
        <div className="footer__links-1">
            <div className="footer__item">
                <Link href="/buyers" className="footer__link">Покупателям</Link>
            </div>
            <div className="footer__item">
                <Link href="/about" className="footer__link">О компании</Link>
            </div>
            <div className="footer__item">
                <Link href="/contacts" className="footer__link">Контакты</Link>
            </div>
        </div>
        <div className="footer__links-2">
                <div className="footer__item-2">
                    <Link href="/privacy-policy" className="footer__link-2">Политика конфиденциальности</Link>
                </div>
                <div className="footer__item-2">
                    <Link href="/public-offer" className="footer__link-2">Договор публичной оферты</Link>
                </div>
        </div>         

          <div className="footer__contacts-wrapper">
            <div className="footer__contacts">
                <p>+7 (999) 999-999</p>
                <p >
                <span className="footer__email-label">Email: </span> <a href="mailto:info@prestijstroy.ru">info@prestijstroy.ru</a>
                </p>
            </div>
            <div className="footer__back-to-top">
                <a href="#top">Наверх</a>
            </div>
          </div>  
      </div>
    </footer>
  );
};

export default Footer;

  
  