import React, { useState } from 'react'
import { saveUser } from '../utils/utils';

type Props = {}

function Login({}: Props) {

    const [userInfo, setUserInfo] = useState({ email: "", password: "" });

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        // Prevent the browser from reloading the page
        event.preventDefault();
    
        // Read the form data
        const form: EventTarget = event.target;
        //@ts-ignore
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
    
        // You can pass formData as a fetch body directly:
        saveUser(formJson.myInput.toString())
      }

  return (
    <div className="mx-auto w-5/6">
        <form onSubmit={handleSubmit} className="flex flex-col justify-center">
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
        </form>
        <div className="flex flex-col justify-center">
            <button type="reset" className="category-entry">Login</button>
            <button type="submit" className="category-entry">Register</button>   
        </div>
    </div>
    
  )
}

export default Login