import React from 'react'
import { saveUser } from '../types/utils';

type Props = {}

function Login({}: Props) {

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
    <form onSubmit={handleSubmit}>
      <label>
        Username: <input name="myInput" className="text-green-600" defaultValue="Enter your username" />
      </label>
      <button type="reset">Reset form</button>
      <button type="submit">Submit form</button>
    </form>
  )
}

export default Login