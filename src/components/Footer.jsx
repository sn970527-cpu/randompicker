import React from 'react';
import './Footer.css';

const Footer = ({ onOpenModal }) => {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <p className="footer-copyright">
          &copy; 2026 조정연. All rights reserved.
        </p>
        <div className="footer-links">
          <button onClick={() => onOpenModal('terms')} className="footer-link-btn">이용약관</button>
          <span className="footer-separator">|</span>
          <button onClick={() => onOpenModal('privacy')} className="footer-link-btn">개인정보처리방침</button>
        </div>
        <p className="footer-info">
          개인정보책임자: 조정연 교사 (서울언북초등학교) | 문의: 02-514-5981
        </p>
      </div>
    </footer>
  );
};

export default Footer;
