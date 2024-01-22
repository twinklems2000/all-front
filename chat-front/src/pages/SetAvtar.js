import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Buffer } from 'buffer';
import Button from '../components/common/button/Button';
import Loader from '../components/common/Loader';
import { toastService } from '../constants/data';

const SetAvtar = () => {
  const api = 'https://api.multiavatar.com/45678945';
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [avatar, setAvatar] = useState(undefined);
  const [avatarData, setAvatarData] = useState([]);

  const setProfilePicture = async () => {
    if (avatar === undefined) {
      toastService.error('Please select avatar');
    } else {
      {
        let user = await JSON.parse(localStorage.getItem('user'));
        const { data } = await axios.post(
          `http://localhost:9000/setAvatar/${user._id}`,
          {
            image: avatarData[avatar],
          }
        );
        if (data.isSet) {
          user.isAvtarImgSet = true;
          user.avtarImg = data.image;
          localStorage.setItem('user', JSON.stringify(user));
          navigate('/chat');
        }
      }
    }
  };

  const getAvatarData = async () => {
    let data = [];
    for (let i = 0; i < 4; i++) {
      const image = await axios.get(
        `${api}/${Math.round(Math.random() * 1000)}`
      );
      console.log('image', image?.data);
      const buffer = new Buffer(image.data);
      data.push(buffer.toString('base64'));
      setAvatarData(data);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAvatarData();
  }, []);

  return (
    <>
      <Container>
        <h1>Pick an avatar as your profile picture</h1>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="avtarContainer">
            {avatarData?.map((avtar, index) => {
              return (
                <div className="avtarDiv">
                  <img
                    src={`data:image/svg+xml;base64,${avtar}`}
                    key={index}
                    onClick={() => setAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
        )}
        <div className="btnContainer">
          <Button
            title="Load more"
            customClass="btn"
            handleClick={getAvatarData}
          />
          <Button
            title="Set as profile"
            customClass="btn"
            handleClick={setProfilePicture}
          />
        </div>
      </Container>
    </>
  );
};

const Container = styled.div`
  h1 {
    text-align: center;
  }
  .avtarContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .avtarDiv {
    &:hover {
      border-radius: 50%;
      border: 4px solid royalblue;
      cursor: pointer;
    }
  }
  img {
    height: 100px;
    margin: 10px;
  }
  .btnContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
  }
  .btn {
    background-color: white;
    color: #10002b;
    width: 200px;
    margin: 0 10px;
    &:hover {
      background-color: royalblue;
      color: white;
    }
  }
`;

export default SetAvtar;
