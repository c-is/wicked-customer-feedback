import React from 'react';
import s from './Footer.css';

function Footer() {
  return (
    <footer className={s.footer} role="contentinfo">
      <span className={s.copyright}>© Wicked customer feedback</span>
    </footer>
  );
}

export default Footer;
