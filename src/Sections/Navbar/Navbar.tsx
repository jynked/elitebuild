import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoSearchSharp } from "react-icons/io5";
import { MdMenu } from "react-icons/md";
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-middle__logo-mobile">
        <img src="/images/logo.png" alt="Логотип ПрестижСтрой" />
      </div>

      {/* Верхний блок */}
      <div className="navbar-top">
        <div className="navbar-top__location">
          <CiLocationOn className="icon-location" />
          Выбрать город
          <IoMdArrowDropdown className="icon-dropdown" />
        </div>
        <div className="navbar-top__phone">+7 (900) 999-99-99</div>
        <button className="navbar-top__request">
          <p className="navbar-top__request-text">Оставить заявку</p>
        </button>
      </div>

      {/* Средний блок */}
      <div className="navbar-middle">
        <div className="navbar-middle__logo">
          <img src="/images/logo.png" alt="Логотип ПрестижСтрой" />
        </div>
        <div className="navbar-middle__catalog">
          <button>
            <MdMenu className="icon-menu" />
            <p className="navbar-middle__catalog-text">Каталог</p>
          </button>
        </div>
        <div className="navbar-middle__search">
          <div className="navbar-middle__search-input-wrapper">
            <input type="text" placeholder="Поиск по товарам" />
          </div>
          <div className="navbar-middle__search-button-wrapper">
            <button className="navbar-middle__search-button">
              <IoSearchSharp className="navbar-middle__search-icon" />
            </button>
          </div>
        </div>
        <nav className="navbar-middle__icons">
        <div className="navbar-middle__service-wrapper">
        <Link href="/services">
          <button className="navbar-middle__service">
            <div className="navbar-middle__icon-wrapper">
              <img src="/images/сервисы.svg" alt="Сервисы" className="navbar-middle__icon" />
              <p className="navbar-middle__icon-text">Сервисы</p>
            </div>
          </button>
        </Link>
        </div>

          <Link href="/Comparison">
          <button className="navbar-middle__comparison">
            <div className="navbar-middle__icon-wrapper">
              <img src="/images/сравнение.svg" alt="Сравнение" className="navbar-middle__icon" />
              <p className="navbar-middle__icon-text">Сравнение</p>
            </div>
          </button>
          </Link>

          <Link href="/Favorites">          
          <button className="navbar-middle__favorites">
            <div className="navbar-middle__icon-wrapper">
              <img src="/images/отложенные.svg" alt="Отложенные" className="navbar-middle__icon" />
              <p className="navbar-middle__icon-text">Отложенные</p>
            </div>
          </button>
          </Link>

          <Link href="/cart">
          <button className="navbar-middle__cart">
            <div className="navbar-middle__icon-wrapper">
              <img src="/images/корзина.svg" alt="Корзина" className="navbar-middle__icon" />
              <p className="navbar-middle__icon-text">Корзина</p>
            </div>
          </button>
          </Link>

        </nav>

      </div>

      {/* Нижний блок */}
      <nav className="navbar-bottom">
        <a href="#about" className="navbar-bottom__link">
          О компании
        </a>
        <a href="#customers" className="navbar-bottom__link">
          Покупателям
        </a>
        <a href="#contacts" className="navbar-bottom__link">
          Контакты
        </a>
      </nav>
    
      <div className="navbar-line"></div>
     
    </div>
  );
};

export default Navbar;