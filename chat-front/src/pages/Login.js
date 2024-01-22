import React, { useState } from 'react';
import Button from '../components/common/button/Button';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toastService } from '../constants/data';
import Loader from '../components/common/Loader';

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (email === undefined || password === undefined) {
      setError(true);
    } else {
      setError(false);
    }
    if (error === false && email !== undefined && password !== undefined) {
      let result = await axios.post('http://localhost:9000/login', {
        email,
        password,
      });

      console.log('result', result);

      if (result?.data?.errors) {
        result?.data?.errors?.map((item) => {
          toastService.error(item?.msg);
        });
      } else {
        toastService.success('You are logged in successfully');
        if (result?.data?.result?.isAvtarImgSet) {
          navigate('chat');
        } else {
          navigate('/setavtar');
        }
        localStorage.setItem('user', JSON.stringify(result?.data?.result));
        localStorage.setItem('auth', JSON.stringify(result?.data?.auth));
      }
    }
  };

  return (
    // <Loader />
    <FormContainer>
      <div className="mainContainer">
        <h1>Login</h1>
        <form>
          <input
            placeholder="Email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && email === undefined && (
            <p className="errorText">Please enter email</p>
          )}
          <input
            placeholder="Password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && password === undefined && (
            <p className="errorText">Please enter password</p>
          )}
          <div className="btnContainer">
            <Button title="Create" type="button" handleClick={handleSubmit} />
            <Button
              title="Sign Up"
              customClass="signupBtn"
              handleClick={() => navigate('/register')}
            />
          </div>
        </form>
      </div>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #10002b;
  height: 100vh;
  .mainContainer {
    background-color: #e0aaff;
    padding: 30px;
    border-radius: 10px;
    h1 {
      color: #10002b;
      text-align: center;
    }
    form {
      display: flex;
      flex-direction: column;
      input {
        width: 300px;
        border-radius: 4px;
        margin-top: 20px;
        padding: 15px;
        outline: none;
        border: none;
        &:focus {
          border: 2px solid #5a189a;
        }
      }
      .errorText {
        color: red;
        margin: 0;
      }
      .btnContainer {
        display: flex;
        flex-direction: row;
        .signupBtn {
          margin-left: 10px;
        }
      }
    }
  }
`;

export default Login;
