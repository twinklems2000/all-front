import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Power from '../../assests/images/power.png';
import { useNavigate } from 'react-router-dom';
import Button from './button/Button';
import axios from 'axios';
import { toastService } from '../../constants/data';
import { v4 as uuidv4 } from 'uuid';

const ChatContainer = ({ currentChat, socket }) => {
  const navigate = useNavigate();
  let currentUser = JSON.parse(localStorage.getItem('user'));
  const [msg, setMsg] = useState('');
  const [message, setMessage] = useState([]);
  const [arrivalMsg, setArrivalMsg] = useState();
  const scrollRef = useRef();

  const handleSend = async (e) => {
    e.preventDefault();
    let result = await axios.post('http://localhost:9000/addMessage', {
      message: msg,
      from: currentUser?._id,
      to: currentChat?._id,
    });
    if (result?.data?.msg) {
      setMsg('');
    } else {
      toastService.error('Something went wrong');
    }
    socket.current.emit('send-msg', {
      message: msg,
      from: currentUser?._id,
      to: currentChat?._id,
    });

    const msgs = [...message];
    msgs.push({ fromSelf: true, message: msg });
    setMessage(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on('msg-receive', (msg) => {
        setArrivalMsg({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMsg && setMessage((prev) => [...prev, arrivalMsg]);
  }, [arrivalMsg]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: 'smooth' });
  }, [message]);

  const getAllMessages = async () => {
    if (currentChat) {
      let result = await axios.post('http://localhost:9000/getAllMessage', {
        from: currentUser?._id,
        to: currentChat?._id,
      });
      setMessage(result?.data?.data);
    }
  };

  useEffect(() => {
    getAllMessages();
  }, [currentChat?._id]);

  return (
    <Container>
      <div className="header">
        <div className="userInfo">
          <img
            src={`data:image/svg+xml;base64,${currentChat?.avtarImg}`}
            className="userImg"
          />
          <h4>{currentChat?.name}</h4>
        </div>
        <div className="powerBtn" onClick={() => navigate('/')}>
          <img src={Power} alt="power_off" className="powerImg" />
        </div>
      </div>
      <div className="chatMessage">
        {message?.map((item) => {
          return (
            <div
              className={item?.fromSelf ? 'send' : 'receive'}
              key={uuidv4()}
              ref={scrollRef}
            >
              <div className="messageContainer">{item?.message}</div>
            </div>
          );
        })}
      </div>
      <form className="chatInput" onSubmit={handleSend}>
        <input
          type="text"
          placeholder="Type your message here"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <Button title="Send" customClass="sendBtn" type="submit" />
      </form>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .userInfo {
      display: flex;
      flex-direction: row;
      align-items: center;
      .userImg {
        margin-right: 10px;
        height: 40px;
      }
    }
    .powerBtn {
      border-radius: 10px;
      border: 2px solid black;
      padding: 5px;
      cursor: pointer;
      .powerImg {
        height: 30px;
      }
    }
  }
  .chatMessage {
    height: 100%;
    overflow-y: scroll;
    margin: 5px 0;
    display: flex;
    flex-direction: column;
    .send,
    .receive {
      display: flex;
      justify-content: flex-end;
      .messageContainer {
        background-color: #10002b;
        border-radius: 10px;
        padding: 5px 10px;
        color: white;
        /* max-width: 400px; */
        margin: 5px;
        /* width: fit-content; */
      }
    }
    .receive {
      justify-content: flex-start;
      .messageContainer {
        background-color: white;
        color: #10002b;
      }
    }
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
  .chatInput {
    display: flex;
    flex-direction: row;
    background-color: white;
    border-radius: 10px;
    height: 50px;
    input {
      width: 100%;
      border: none;
      outline: none;
      padding: 10px;
      border-radius: 10px;
    }
    .sendBtn {
      margin: 0;
      border-radius: 0 10px 10px 0;
      width: fit-content;
    }
  }
`;

export default ChatContainer;
