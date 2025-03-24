import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios"
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";


export function Signup(){
  const usernameRef= useRef<HTMLInputElement>(null);
  const passwordRef=useRef<HTMLInputElement>(null);
  const navigate=useNavigate();

   async function signup(){
        const username= usernameRef.current?.value;
        const password=passwordRef.current?.value;
        await axios.post(BACKEND_URL+"/api/v1/signup",{
                username,
                password
            
        })
        alert("you have signd up")
        navigate("/signin")
    }
return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
    <div className="bg-white rounded-xl p-8 border min-w-48 ">
        <Input reference={usernameRef} placeholder="username" ></Input>
        <Input  reference={passwordRef} placeholder="password"></Input>
        <div className="pt-4 flex justify-center" >
          <Button onClick={signup} loading={false} text="sign up" varient="primary" size="md"></Button>
        </div>
       
    </div>

</div>



}