import { ReactElement } from "react";
type Variants="primary"|"secondary"
 interface ButtonProps {
      varient:Variants;
      size:"sm"|"md"|"lg";
      text:string;
      startIcon?:ReactElement;
      endIcon?:ReactElement;
      onClick ?: ()=>void;
      loading?:boolean;
      
}
const variantStyles={
    "primary":"bg-[#5c56d6] text-white",
    "secondary":"bg-[#c2e4ed] text-black"
}

const sizeStyles={
    "sm":"py-1 px-2",
    "md":"py-2 px-4",
    "lg":"py-4 px-6"
}
const defaultStyles="rounded-lg py-3 px-3 mx-2 my-3 flex font-light items-center"

export const Button=(props:ButtonProps)=>{

return <button disabled={props.loading} onClick={props.onClick} className={`${variantStyles[props.varient]} ${defaultStyles} ${sizeStyles[props.size]} ${props.loading?"opacity-45":""}`}>

    {props.startIcon ?<div className="pr-2">{props.startIcon}</div>:null}{props.text}  {props.endIcon?<div className="pr-2">{props.endIcon}

    </div>:null}</button>
}