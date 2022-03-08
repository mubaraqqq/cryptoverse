import React, { useState, useEffect, useRef } from 'react';
import { Button, Menu, Typography, Avatar} from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons';

import icon from '../images/icons8-cryptocurrency-50.png';

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(null);
  const clickRef = useRef(null);
  
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
      if (screenSize < 768) {
        document.body.addEventListener('click', onClickOutside);

        return () => document.body.removeEventListener('click', onClickOutside);
      }
  }, [screenSize]);

  useEffect(() => {
      if(screenSize < 768) {
          setActiveMenu(false);
      } else {
          setActiveMenu(true);
      };
  }, [screenSize]);

  const onClickOutside = (e) => {
      if (clickRef.current && !clickRef.current.contains(e.target) && screenSize < 768) {
        handleClick();
      }
  }

  const handleClick = () => {
    if(screenSize < 768) {
          setActiveMenu(false);
      } else {
          setActiveMenu(true);
      }
  };


  return (
    <div className='nav-container'>
        <div className="logo-container">
            <Avatar src={icon} size='large'/>
            <Typography.Title level={2} className='logo'>
                <Link to='/'>CryptoVerse</Link>
            </Typography.Title>
            <Button className="menu-control-container" onClick={() => setActiveMenu(!activeMenu)} ref={clickRef}>
                <MenuOutlined />
            </Button>
        </div>
        {activeMenu && (
            <Menu theme='dark'>
                <Menu.Item icon={<HomeOutlined />}>
                    <Link to='/' onClick={handleClick}>Home</Link>
                </Menu.Item>
                <Menu.Item icon={<FundOutlined />}>
                    <Link to='/cryptocurrencies' onClick={handleClick}>Cryptocurrencies</Link>
                </Menu.Item>
                <Menu.Item icon={<BulbOutlined />}>
                    <Link to='/news' onClick={handleClick}>News</Link>
                </Menu.Item>
            </Menu>
        )}
    </div>
  )
}




export default Navbar