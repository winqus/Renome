import { useState, useEffect, useRef } from 'react';

const classNames = require('classnames');

export default function Navbar({ navTitle }) {
  return (
    <header className="nav-menu">
      <div className="nav-menu__header">
        <a href="/" className="nav-menu__title">{navTitle}</a>
        <div className="horizontal-space-filler" />
        <NavMenuCart cartCount="2" cartValue="$44.50">
          <CartNavItem href="#cart" text="View Cart" />
          <CartNavItem href="#checkout" text="Checkout" />
        </NavMenuCart>
        <span className="nav-menu__vertical-line" />
        <HambugerDropdownMenu />
      </div>
    </header>
  );
}
function HambugerDropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    document.body.classList.toggle('no-scroll', isOpen);
  }, [isOpen]);
  const hambugerIconClasses = classNames({
    'nav-menu__icon': true,
    'icon-hamburger': true,
    'icon-hamburger--active': isOpen,
  });
  const wrapperRef = useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [wrapperRef]);

  return (
    <div ref={wrapperRef}>
      <button onClick={() => setIsOpen(!isOpen)} type="button" id="navBtn" className="nav-menu__btn nav-menu__btn--rightMost">
        <i id="navHambugerIcon" className={hambugerIconClasses}>
          <div className="icon-hamburger__bars" />
        </i>
      </button>

      <DropdownMenu open={isOpen} />
    </div>
  );
}
function CartNavItem({ href, text }) {
  return <a href={href} className="nav-menu__cart-dropdown-item">{text}</a>;
}
function NavMenuCart({ cartCount, cartValue, children }) {
  const [isClicked, setIsClicked] = useState(false);
  const wrapperRef = useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsClicked(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [wrapperRef]);

  const dropdownClasses = classNames({
    'nav-menu__cart-dropdown-content': true,
    'nav-menu__cart-dropdown-content--show': isClicked,
  });

  return (
    <div ref={wrapperRef} className="nav-menu__cart-dropdown">
      <button type="button" onClick={() => setIsClicked(!isClicked)} id="cartBtn" className="nav-menu__btn">
        <i className="nav-menu__icon icon-cart" />
        <div className="nav-menu__btnText">{cartCount}</div>
      </button>
      <ul id="cartDropdown" className={dropdownClasses}>
        <li className="nav-menu__cart-dropdown-item nav-menu__cart-dropdown-item--non-selectable">{cartValue}</li>
        {children}
      </ul>
    </div>
  );
}
function DropdownItem({ href, text }) {
  return (
    <a href={href} className="nav-menu__item">{text}</a>
  );
}
function DropdownSearchItem({ placeholderText, inputValue }) {
  return (
    <div className="nav-menu__search-item">
      <input type="text" className="nav-menu__search-item-input" placeholder={placeholderText} defaultValue={inputValue} />
      <button type="button" aria-label="Search"><i className="nav-menu__search-item-icon icon-search" /></button>
    </div>
  );
}
function DropdownSubnavItem(props) {
  const {
    href, text, targetMenuName, onChangeMenu, arrowOnLeft,
  } = props;
  const handleButtonClick = () => {
    onChangeMenu(targetMenuName);
  };
  return (
    <div role="button" onClick={handleButtonClick} onKeyPress={() => {}} tabIndex="0" id="featuresBtn" className="nav-menu__item">
      {!arrowOnLeft && (<a href={href}>{text}</a>)}
      <button type="button" className="nav-menu__button" aria-label="OpenNav">
        {arrowOnLeft ? <i className="icon-arrow-left-features" /> : <i className="icon-arrow-right-features" />}
      </button>
      {arrowOnLeft && (<a href={href}>{text}</a>)}
    </div>
  );
}
function DropdownMenu(props) {
  const { open } = props;
  const [activeMenu, setActiveMenu] = useState('main');
  const mainNavClasses = classNames({
    'nav-menu__list': true,
    'nav-menu__list--hide-vertical': !open || activeMenu !== 'main',
    'nav-menu__list--show-vertical': open && activeMenu === 'main',
  });
  const sideNavClasses = classNames({
    'nav-menu__list': true,
    'nav-menu__list--hide-horizontal': !open || activeMenu !== 'features',
    'nav-menu__list--show-horizontal': open && activeMenu === 'features',
  });

  return (
    <>
      <ul className={mainNavClasses}>
        <DropdownSearchItem placeholderText="Search..." inputValue="" />
        <DropdownItem href="#home" text="HOME" />
        <DropdownItem href="#about" text="ABOUT" />
        <DropdownItem href="#menu" text="MENU" />
        <DropdownItem href="#reservations" text="RESERVATIONS" />
        <DropdownItem href="#blog" text="BLOG" />
        <DropdownSubnavItem href="#features" text="FEATURES" targetMenuName="features" onChangeMenu={setActiveMenu} />
        <DropdownItem href="#shop" text="SHOP" />
        <DropdownItem href="#contact" text="CONTACT" />
      </ul>
      <ul className={sideNavClasses}>
        <DropdownSubnavItem href="/#" text="BACK" targetMenuName="main" onChangeMenu={setActiveMenu} arrowOnLeft />
        <DropdownItem href="#onepage" text="One page" />
        <DropdownItem href="#portfolio" text="Portfolio" />
        <DropdownItem href="#shortcodes" text="Shortcodes" />
      </ul>
    </>
  );
}
