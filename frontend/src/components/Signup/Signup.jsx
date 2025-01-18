import axios from 'axios'
import React, { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault()

    if (!name) {
      setError("Name is required.")
      return
    }

    if (!email) {
      setError("Email is required.")
      return
    }

    if (!password) {
      setError("Password is required.")
      return
    }

    // Clear errors before sending the request
    setError(null)
    const data = {
      name, email, password
    };
    

    try {
      const result = await axios.post("http://localhost:5555/course/signup", data);

      if (result.status === 201) {
        console.log("Signup successful");
        navigate("/");
      } else {
        console.log("Signup failed");
      }
    } catch (err) {
      console.error("Error signing up:", err);
    }
  }


  return (
    <>
      <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow'>
        <h2 className='text-2xl font-medium text-black py-2'>Course App</h2>
      </div>
      <div className='flex items-center justify-center mt-28'>
        <div className='w-96 border rounded bg-white px-7 py-10'>
          <form onSubmit={handleSignUp}>
            <h4 className='text-2xl mb-7'>SignUp</h4>
            <input type='text'
              placeholder='Name'
              className='w-full text-sm bg-transparent border-[1.5px] px-5 py-3 rounded mb-4 outline-none'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type='text'
              placeholder='Email'
              className='w-full text-sm bg-transparent border-[1.5px] px-5 py-3 rounded mb-4 outline-none'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type='password'
              placeholder='Password'
              className='w-full text-sm bg-transparent border-[1.5px] px-5 py-3 rounded mb-4 outline-none'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}


            <button type='submit' className='w-full text-sm bg-primary text-white p-2 rounded my-1 bg-blue-600' >Create Account</button>
            <p className='text-sm text-center mt-4'>Already have an account?{" "}
              <Link to="/login" className='font-medium text-[#2B85FF] underline'>Login</Link>
            </p>
          </form>
        </div>
      </div>

    </>
  )
}

export default Signup
