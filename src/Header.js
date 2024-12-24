import React from 'react';
import logo from 'https://www.logodalil.com.eg/Edu/Universities/EJUST_en.html'; // Ensure the correct path to your logo image

const Header = () => {
  return (
    <header style={headerStyle}>
      <img src={logo} alt="Logo" style={logoStyle} />
    </header>
  );
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'flex-start', // Align logo to the top-left
  alignItems: 'center',
  padding: '10px',
  position: 'absolute', // Keeps the logo at the top
  top: '0',
  left: '0',
  zIndex: '10', // Makes sure the logo is above other content
};

const logoStyle = {
  width: '50px', // Adjust the size of the logo
  height: 'auto',
};

export default Header;
