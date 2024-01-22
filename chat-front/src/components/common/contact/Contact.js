import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Contact = ({ contactData, changeChat }) => {
  const [userName, setUserName] = useState();
  const [userImage, setuserImage] = useState();
  const [currentChat, setCurrentChat] = useState();

  let currentUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    setUserName(currentUser.name);
    setuserImage(currentUser.avtarImg);
  }, [currentUser]);

  return (
    <Container>
      <div className="profileContainer">
        <img src={`data:image/svg+xml;base64,${userImage}`} />
        <h2>{userName}</h2>
      </div>
      <div className="contactContainer">
        {contactData?.length > 0 ? (
          contactData?.map((item, index) => {
            return (
              <div
                className={
                  currentChat?._id === item?._id ? 'selected' : 'contact'
                }
                onClick={() => {
                  setCurrentChat(item);
                  changeChat(item, index);
                }}
              >
                <img
                  src={`data:image/svg+xml;base64,${item?.avtarImg}`}
                  key={index}
                  className="contactImg"
                />
                <h4>{item?.name}</h4>
              </div>
            );
          })
        ) : (
          <p>No contact</p>
        )}
      </div>
    </Container>
  );
};

const Container = styled.div`
  padding: 10px;
  width: 20%;
  .profileContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      height: 80px;
    }
    h2 {
      margin: 10px 0;
    }
  }
  .contactContainer {
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: block;
      width: 7px;
      height: 7px;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #10002b;
      border-radius: 10px;
      border: 1px solid #10002b;
    }
  }
  .contact,
  .selected {
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 10px;
    margin: 5px 0;
    padding: 5px 10px;
    background-color: #10002b;
    cursor: pointer;
    .contactImg {
      height: 40px;
      margin-right: 10px;
    }
  }
  .selected {
    background-color: #ff6d00;
  }
`;

export default Contact;
