import React, { useState, useEffect } from 'react';
import './home.css';
import Card from '../../components/common/card/Card';
import { bannerImgData, toastService } from '../../constant/data';

const Home = () => {
  const [img, setImg] = useState(bannerImgData[0].path);
  const [foodData, setFoodData] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      let imgIndex =
        bannerImgData[Math.floor(Math.random() * bannerImgData.length)];
      if (imgIndex !== undefined) {
        setImg(imgIndex?.path);
      } else {
        setImg(bannerImgData[0].path);
      }
    }, 6000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    getAllFood({ name: name });
  }, []);

  const getAllFood = async () => {
    let result = await fetch('http://localhost:9000/getAllData', {
      method: 'post',
      body: JSON.stringify({ name }),
      headers: {
        'Content-Type': 'application/json',
        authorization: 'bearer ' + JSON.parse(localStorage.getItem('auth')),
      },
    });

    result = await result.json();

    if (result.errors) {
      result.errors.map((item) => {
        toastService.error(item?.msg);
      });
    } else {
      setFoodData(result);
    }
  };

  return (
    <>
      <img src={img} className="bannerImg" />
      <div className="home">
        {foodData?.length > 0 ? (
          foodData?.map((item) => {
            return <Card foodDetail={item} />;
          })
        ) : (
          <h1 style={{ margin: 'auto' }}>🙆‍♀️</h1>
        )}
      </div>
    </>
  );
};

export default Home;
