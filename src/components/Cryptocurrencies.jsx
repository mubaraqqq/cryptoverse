import React, { useState, useEffect } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input, Spin } from 'antd';
import { SearchOutlined } from '@ant-design/icons'

import { useGetCryptosQuery } from '../services/cryptoApi';

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching} = useGetCryptosQuery(count);
  const [searchTerm, setSearchTerm] = useState('');
  const [cryptos, setCryptos] = useState([]);
  // const cryptos = cryptosList?.data?.coins;


  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()));

    setCryptos(filteredData);
  }, [cryptosList, searchTerm])

  if (isFetching) return (
    <Row align="center" justify="center">
      <Col span={12} offset={12} style={{display: 'flex', alignItems: 'center'}}><Spin size='large' style={{height: '81vh'}}/></Col>
    </Row>
);

  return (
    <>
    {!simplified && (
      <div className='search-crypto'>
        <Input addonBefore={<SearchOutlined style={{ color: 'white'}}/>} placeholder='Search Cryptocurrencies' onChange={(e) => setSearchTerm(e.target.value)} />
      </div>
    )}
    <Row gutter={[32, 32]} className='cyrpto-card-container'>
        {cryptos?.map((currency) => (
          <Col xs={24} sm={12} lg={6} className='cyrpto-card' key={currency.uuid}>
            <Link to={`/crypto/${currency.uuid}`}>
              <Card 
                title ={`${currency.rank}, ${currency.name}`}
                extra={<img className='crypto-image' src={currency.iconUrl} alt={currency.name} width={25}/>}
                hoverable
                loading={isFetching}
              >
                <p>Price: {`$${millify(currency.price)}`}</p>
                <p>Market Cap: {`$${millify(currency.marketCap)}`}</p>
                <p>Daily Change: {`${millify(currency.change)}%`}</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Cryptocurrencies