import { useState, useEffect } from "react";

import login from "../auth/login";
import signup from "../auth/signup";

const useLoginOrSignup = (navigation) => {
  const [userName, setUserName] = useState('')
  const [emailId, setEmailId] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('login')
  const [userNameError, setUserNameError] = useState('')
  const [emailIdError, setEmailIdError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  useEffect(() => {
    setUserNameError('')
    setEmailIdError('')
    setPasswordError('')

  }, [userName, emailId, password, status]);
  

  const handleLogin = () => {
    if(userName == '')
    {
      setUserNameError('Username cannot be empty')
      return
    }
    if(password == '') {
      setPasswordError('Password cannot be empty')
      return
    }


    if(userNameError === '' && passwordError === '')
    login(userName, password).then((result) => {
      console.log(result)
      if(result.token){
        navigation.navigate('Home')
      }
      else {
        setPasswordError('invalid credentials')
      }
    })
  }

  const handleSignup = () => {
    if(userName == '')
    {
      setUserNameError('Username cannot be empty')
      return
    }
    if(emailId == '')
    {
      setEmailIdError('Email id cannot be empty')
      return
    }
    if(password == '') {
      setPasswordError('Password cannot be empty')
      return
    }

    signup(userName, emailId, password).then( (response) => {
      console.log(response)
      if(response.token) {
        handleLogin()
      }
      else {
        if(response.username)
        setUserNameError(response.username[0])
        if(response.email)
        setEmailIdError(response.email[0])
        if(response.password)
        setPasswordError(response.password[0])
      }
      
    })

  }

  return {
          userName,
          setUserName,
          emailId,
          setEmailId,
          password,
          setPassword,
          status,
          setStatus,

          userNameError,
          emailIdError,
          passwordError,

          handleLogin,
          handleSignup
        }
}


export default useLoginOrSignup;