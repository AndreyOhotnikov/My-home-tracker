import React from "react";
import { useState } from "react";
import MyButton from '../button/MyButton';
import MyInput from '../input/MyInput';
import { useNavigate } from "react-router-dom";
import { authReducer } from '../../store/reducers/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from "react-bootstrap";
import Button from '@mui/material/Button'
import { signup_UserReducer } from "../../store/actionCreators/userAC";
import { types } from "../../store/types/userTypes";

const Signup = () => {
  const [name, setName] = useState('')
  const [pass, setPass] = useState('')
  const [email, setEmail] = useState('')
  const [idHome, setIdHome] = useState(0)
  const [predsedatel, setPredsedatel] = useState(true)
  const [photoIsChairman, setPhotiIsChairman] = useState({})

  const dispatche = useDispatch()
  const auth = useSelector(state => state.auth.auth)
  const navigate = useNavigate()
  const logIn = async (e) => {
    e.preventDefault();
    if (idHome) {
      dispatche({type: types.SIGN_UP_USER_SAGA, user: {name, email, pass, idHome}})
      navigate('/signin') // или navigate('/')
    } else {
      console.log({name, email, pass, isChairman: predsedatel, photoIsChairman:  photoIsChairman[0] })
      dispatche(signup_UserReducer({name, email, pass, isChairman: !predsedatel, photoIsChairman:  photoIsChairman[0] }))
      navigate('/locationHome')
    }
    console.log('name-', name,'pass-', pass,'email-', email)
    console.log(photoIsChairman)
  }

  return (
        <form id="signupForm" method="POST" action="" style={{marginTop:'70px'}}>
          <div >
            <h2  id="formTitle">Регистрация</h2>
            <MyInput 
              onChange={e => setName(e.target.value)}
              id="username"  
              type="text" 
              placeholder="Enter name" 
              name="name" 
              required 
              pattern="[A-Za-z]\w+"
              title="Латинские буквы, цифры и _"
              
            />

            <MyInput 
              onChange={e => setEmail(e.target.value)}
              id="email"  
              type="text" 
              placeholder="Enter e-mail" 
              name="email" 
              required 
              pattern="^[A-Z0-9a-z._%+-]+@[A-Z0-9a-z.-]+\.[A-Za-z]{2,}$"
            />
            
            <MyInput 
              onChange={e => setPass(e.target.value)}
              type="password"  
              placeholder="Enter Password" 
              name="password" 
              required
            />
            <div className='post_content'>
              <span>Войти как председатель</span><Form.Check.Input type="checkbox" id={`check-api-checkbox`} name="checkbox" value="checkbox" onChange={() => setPredsedatel(!predsedatel)} />
            </div>
            {predsedatel ? 
              <input style={{width: '300px'}}
                onChange={(e) => setIdHome(e.target.value)}
                type="number"
                placeholder={'Введите id своего дома'}
              /> :
              <input style={{width: '300px'}}
                type="file"
                // onChange={e => console.log([...e.target.files])}
                onChange={(e) => setPhotiIsChairman([...e.target.files])}
                placeholder={'Прикрепите документ подтверждения'}
              />}
              <Button onClick={(e) => logIn(e)} variant="outlined">Регистрация</Button>
            {/* <MyButton  type="submit" onClick={(e) => logIn(e)} >Регистрация</MyButton> */}
          </div>
    </form>
  );
};


export default Signup;
