// import React, { useState,useEffect } from 'react';

// import Card from '../UI/Card/Card';
// import classes from './Login.module.css';
// import Button from '../UI/Button/Button';

// const Login = (props) => {
//   const [enteredEmail, setEnteredEmail] = useState('');
//   const [emailIsValid, setEmailIsValid] = useState();
//   const [enteredPassword, setEnteredPassword] = useState('');
//   const [passwordIsValid, setPasswordIsValid] = useState();
//   const [formIsValid, setFormIsValid] = useState(false);


//   useEffect(() => {

//     const timer = setTimeout(() => {
//       console.log("Checking");
//       setFormIsValid(
//         enteredEmail.includes("@") && enteredPassword.trim().length > 6
//       );
//     },200);
//     return () => {
//       console.log("Cleaning");
//       clearTimeout(timer)};
//   },[enteredEmail,enteredPassword]);


//   const emailChangeHandler = (event) => {
//     setEnteredEmail(event.target.value);

    
//   };

//   const passwordChangeHandler = (event) => {
//     setEnteredPassword(event.target.value);
//   };

//   const validateEmailHandler = () => {
//     setEmailIsValid(enteredEmail.includes('@'));
//   };

//   const validatePasswordHandler = () => {
//     setPasswordIsValid(enteredPassword.trim().length > 6);
//   };

//   const submitHandler = (event) => {
//     event.preventDefault();
//     props.onLogin(enteredEmail, enteredPassword);
//   };

//   return (
//     <Card className={classes.login}>
//       <form onSubmit={submitHandler}>
//         <div
//           className={`${classes.control} ${
//             emailIsValid === false ? classes.invalid : ''
//           }`}
//         >
//           <label htmlFor="email">E-Mail</label>
//           <input
//             type="email"
//             id="email"
//             value={enteredEmail}
//             onChange={emailChangeHandler}
//             onBlur={validateEmailHandler}
//           />
//         </div>
//         <div
//           className={`${classes.control} ${
//             passwordIsValid === false ? classes.invalid : ''
//           }`}
//         >
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             value={enteredPassword}
//             onChange={passwordChangeHandler}
//             onBlur={validatePasswordHandler}
//           />
//         </div>
//         <div className={classes.actions}>
//           <Button type="submit" className={classes.btn} disabled={!formIsValid}>
//             Login
//           </Button>
//         </div>
//       </form>
//     </Card>
//   );
// };

// export default Login;
import React, { useReducer, useState,useEffect,useContext,useRef } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../Context/auth-context";
import Input from "../Input/Input";

function emailReducer(state,action){
  if(action.type === 'USER_INPUT'){
    return {
      value:action.val,isValid:action.val.includes('@')
    }
  }
  if(action.type === 'USER_BLUR'){
      return {
        value:state.value,isValid:state.value.includes('@')
      }
    }
    return { value: "", isValid: false };

}

const passwordReducer = (state, action) => {
  if(action.type === 'USER_INPUT'){
    return {
      value:action.val,isValid:action.val.trim().length > 6
    }
  }
    if(action.type ==='INPUT_BLUR'){
      return {
        value:state.value,isValid:state.value.trim().length > 6
      }
    }
    return { value: "", isValid: false };
  }


const Login = () => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState,dispatchEmail] = useReducer(emailReducer,{value:'', isValid:null});
  const [passwordState,dispatchPassword] = useReducer(passwordReducer,{value:'', isValid:null});
  const context = useContext(AuthContext);
  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
      const timer = setTimeout(() => {
        console.log("Checking");
        setFormIsValid(emailState.isValid && passwordState.isValid);
      },500);
    
      return () =>{
        console.log("Cleared");
        clearTimeout(timer);}
    },[emailState.isValid,passwordState.isValid]);
// dependenciesare given like this because we need to check if it is valid or not but if we enter the whole state then whenever the value changes the state change meaning that the dependency changes and the useEffect runs again and again until the value change stops

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({type:'USER_INPUT', val: event.target.value});

    // setFormIsValid(
    //  emailState.isValid && passwordState.isValid
    //   // event.target.value.includes("@") && enteredPassword.trim().length > 6
    // );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type:'USER_INPUT', val: event.target.value});

    // setFormIsValid(
    //    passwordState.isValid && emailState.isValid
    // );
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(enteredEmail.includes("@"));
    dispatchEmail({type:'USER_BLUR'});
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type:'USER_BLUR'});
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if(formIsValid)
    context.onLogin(emailState.value, passwordState.value);
    else if(!emailState.isValid){
      emailRef.current.activate();
    }
    else 
    passwordRef.current.activate();
    
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        {/* <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div> */}
        <Input id = "email" type= "email" label ="E-Mail" isValid = {emailState.isValid} value ={emailState.value} change = {emailChangeHandler} blur = {validateEmailHandler}  ref={emailRef}/>
        <Input id = "password" type= "password" label ="Password" isValid = {passwordState.isValid} value ={passwordState.value} change = {passwordChangeHandler} blur = {validatePasswordHandler} ref={passwordRef
        }/>
        {/* <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div> */}
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
