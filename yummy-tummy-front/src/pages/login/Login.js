import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './login.css'
import Button from '../../components/common/button/Button'
import LoginMainLayOut from '../../components/common/login-mainlayout/LoginMainLayOut'
import { toastService } from '../../constant/data'
// import Button from '@mui/material/Button'

const Login = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [error, setError] = useState()
  const navigate = useNavigate()

  const handleSubmit = async () => {
    if (email === undefined || password === undefined) {
      setError(true)
    } else {
      setError(false)
    }
    if (error !== true && email !== undefined && password !== undefined) {
      let result = await fetch('https://food-delivery-fedn.onrender.com/login', {
        method: 'post',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      })

      result = await result.json()

      if (result.errors) {
        result.errors.map((item) => {
          toastService.error(item?.msg)
        })
      } else {
        navigate('/home')
        toastService.success('Login successfully')
        localStorage.setItem('user', JSON.stringify(result?.result))
        localStorage.setItem('auth', JSON.stringify(result?.auth))
      }
    }
  }

  return (
    <>
      <LoginMainLayOut
        headerTitle="Login"
        children={
          <div>
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
            <div className="btnContainer">
              <Button
                title="Login"
                type="submit"
                customClass="loginBtn"
                handleClick={handleSubmit}
              />
              <Button
                title="Sign Up"
                type="button"
                handleClick={() => navigate('/register')}
              />
              {/* <Button variant="contained" color="error">
                Hello world
              </Button> */}
            </div>
          </div>
        }
      />
    </>
  )
}

export default Login
