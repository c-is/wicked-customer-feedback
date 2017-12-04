import React from 'react';
import s from './Header.css';

function Header() {
  return (
    <header className={s.header} id="header" role="banner">
      <h1 className={s.headerTitle}>Wicked Customer Feedback</h1>
    </header>
  );
}

export default Header;
