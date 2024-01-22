import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../components/common/button/Button';
import axios from 'axios';
import { toastService } from '../constants/data';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (name === undefined || email === undefined || password === undefined) {
      setError(true);
    } else {
      setError(false);
    }
    if (
      error === false &&
      name !== undefined &&
      email !== undefined &&
      password !== undefined
    ) {
      let result = await axios.post('http://localhost:9000/register', {
        name,
        email,
        password,
      });

      console.log('result', result);

      if (result?.data?.errors) {
        result?.data?.errors?.map((item) => {
          toastService.error(item?.msg);
        });
      } else {
        toastService.success('You are register successfully');
        navigate('/');
        // localStorage.setItem("user")
      }
    }
  };

  return (
    <FormContainer>
      <div>
        <h1>Register</h1>
        <form>
          <input
            placeholder="Name"
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
          {error && name === undefined && (
            <p className="errorText">Please enter name</p>
          )}
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
          <Button
            title="Create"
            type="button"
            handleClick={handleSubmit}
            customClass="btn"
          />
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
  div {
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
        padding: 15px;
        outline: none;
        border: none;
        margin-top: 20px;
        &:focus {
          border: 2px solid #5a189a;
        }
      }
      .errorText {
        color: red;
        margin: 0;
      }
      .btn {
        margin: 20px auto 0 auto;
      }
    }
  }
`;

export default Register;
