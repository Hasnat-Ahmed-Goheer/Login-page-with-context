import React,{useRef,useImperativeHandle} from "react";
import classes from './Input.module.css';

const Input = React.forwardRef((props,ref) =>{

    const forwardRef = useRef();

    const activate = () =>{
        forwardRef.current.focus();
    }

    useImperativeHandle(ref,()=>{
        return{
            activate: activate,
        }
    })


    return (
      <div
        className={`${classes.control} ${
          props.isValid === false ? classes.invalid : ""
        }`}
      >
        <label htmlFor={props.id}>{props.label}</label>
        <input
        ref={forwardRef}
          type={props.type}
          id={props.id}
          value={props.value}
          onChange={props.change}
          onBlur={props.blur}
        />
      </div>
    );

});

export default Input;