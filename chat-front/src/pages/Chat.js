import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Contact from '../components/common/contact/Contact';
import Robot from '../assests/images/robot.gif';
import ChatContainer from '../components/common/ChatContainer';
import { io } from 'socket.io-client';

const Chat = () => {
  const [contactData, setContactData] = useState([]);
  const [currentChat, setcurrentChat] = useState(undefined);
  const socket = useRef();

  let currentUser = JSON.parse(localStorage.getItem('user'));

  const getAllData = async () => {
    let result = await axios.get(
      `http://localhost:9000/getAllUser/${currentUser._id}`
    );
    setContactData(result?.data);
  };

  useEffect(() => {
    getAllData();
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io('http://localhost:9000');
      socket.current.emit('add-user', currentUser?._id);
    }
  }, [currentUser]);

  const handleChat = (item) => {
    setcurrentChat(item);
  };

  return (
    <Container>
      <Contact contactData={contactData} changeChat={handleChat} />

      {currentChat !== undefined ? (
        <div className="chat">
          <ChatContainer currentChat={currentChat} socket={socket} />
        </div>
      ) : (
        <div className="welcomeContainer">
          <img src={Robot} />
          <h1>
            Welcome, <span>{currentUser.name}</span>
          </h1>
          <h3>Please select a chat to start messaging !</h3>
        </div>
      )}
    </Container>
  );
};

const Container = styled.div`
  background-color: #451f55;
  display: flex;
  margin: 25px;
  border-radius: 20px;
  padding: 20px;
  grid-gap: 20px;
  height: 100vh;
  .chat,
  .welcomeContainer {
    background-color: #fdc5f5;
    padding: 10px;
    border-radius: 10px;
    width: 80%;
    color: black;
  }
  .welcomeContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-color: white;
    img {
      background: transparent;
      height: 200px;
    }
    span {
      color: #451f55;
    }
    h3 {
      margin: 0;
    }
  }
`;

export default Chat;
