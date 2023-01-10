import React, { useState } from 'react'
import { saveUser, UserInfo } from '../utils/utils';
import { signIn } from "next-auth/react";

type Props = {
    setLoggedIn: Function
}

function Login({setLoggedIn}: Props) {

    const [userInfo, setUserInfo] = useState({ email: "", password: "" });
    const [register, setRegister] = useState<Boolean>(false)

    async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
        // Prevent the browser from reloading the page
        event.preventDefault();
        console.log("loggin in")
        const res = await signIn("credentials", {
            email: userInfo.email,
            password: userInfo.password,
            redirect: false,
          });

        if(res?.ok){
            setLoggedIn(true)
        }
      }
    
      function handleRegister(event: React.FormEvent<HTMLFormElement>) {
        // Prevent the browser from reloading the page
        event.preventDefault();
        console.log("register")
        saveUser(userInfo);
        setLoggedIn(true);
        setRegister(false)
      }

  return (
    <div className="mx-auto w-5/6">
        <form onSubmit={register? handleRegister : handleLogin} className="flex flex-col justify-center">
            <input
                className="rounded-2xl mx-2 text-center text-green-600 h-9"
                value={userInfo.email}
                onChange={({ target }) =>
                    setUserInfo({ ...userInfo, email: target.value })
                }
                type="email"
                placeholder="john@email.com"
                />
                <input
                className="rounded-2xl m-2 mb-3 mt-3 text-center text-green-600 h-9"
                value={userInfo.password}
                onChange={({ target }) =>
                    setUserInfo({ ...userInfo, password: target.value })
                }
                type="password"
                placeholder="********"
                />
                <button type="submit" className="category-entry">Login</button>
                <button type="submit" onClick={()=>setRegister(true)} className="category-entry">Register</button> 
        </form>
    </div>
    
  )
}

export default Login