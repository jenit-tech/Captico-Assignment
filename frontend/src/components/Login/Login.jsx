import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'



const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault()
    const data = {
      email, password
    };
    

    if (!email) {
      setError("Email is required.")
      return
    }

    if (!password) {
      setError("Password is required.")
      return
    }
    

    try {
      const result = await axios.post("http://localhost:5555/course/login", data);

      if (result.status === 201) {
        console.log("Login successful");
        navigate("/");
      } else {
        console.log("Login failed");
      }
    } catch (err) {
      console.error("Error Loging up:", err);
    }
  }


  return (
    <>
      <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow'>
        <h2 className='text-2xl font-medium text-black py-2'>Invoice App</h2>
      </div>
      <div className='flex items-center justify-center mt-28'>
        <div className='w-96 border rounded bg-white px-7 py-10'>
          <form onSubmit={handleLogin}>
            <h4 className='text-2xl mb-7'>Login</h4>
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

            <button type='submit' className='w-full text-sm bg-primary text-white p-2 rounded my-1 bg-blue-600'>Login</button>

            <p className='text-sm text-center mt-4'>
              Not registered yet?{" "}
              <Link to="/signup" className="font-medium text-[#2B85FF] underline">Create an Account</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
