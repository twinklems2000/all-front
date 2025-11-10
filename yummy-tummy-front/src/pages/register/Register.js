import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './register.css';
import LoginMainLayOut from '../../components/common/login-mainlayout/LoginMainLayOut';
import Button from '../../components/common/button/Button';
import { toastService } from '../../constant/data';

const Register = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (name === undefined || email === undefined || password === undefined) {
      setError(true);
    } else {
      setError(false);
    }
    if (
      error !== true &&
      name !== undefined &&
      email !== undefined &&
      password !== undefined
    ) {
      let result = await fetch('https://yummytummy-client.onrender.com/register', {
        method: 'post',
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      result = await result.json();
      if (result.errors) {
        result.errors?.map((item) => {
          toastService.error(item?.msg);
        });
      } else {
        toastService.success('You are registered successfully');
        navigate('/');
      }
    }
  };

  return (
    <>
      <LoginMainLayOut
        headerTitle="Sign Up"
        children={
          <form>
            <div className="fieldContainer">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Name"
              />
              {error && name === undefined && (
                <span className="errorText">Please enter name</span>
              )}
            </div>
            <div className="fieldContainer">
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
              />
              {error && email === undefined && (
                <span className="errorText">Please enter email</span>
              )}
            </div>
            <div className="fieldContainer">
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
              />
              {error && password === undefined && (
                <span className="errorText">Please enter password</span>
              )}
            </div>
            <Button
              title="Sign Up"
              type="button"
              handleClick={() => handleSubmit()}
            />
          </form>
        }
      />
    </>
  );
};

export default Register;
