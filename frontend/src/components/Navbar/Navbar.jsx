import React from 'react'
import { useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()

  const onLogout = () => {
    navigate("/login")
  }

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <h2 className="text-2xl font-medium text-black">Course App</h2>
      <button
        type="button"
        className="text-sm bg-blue-600 text-white px-4 py-2 rounded"
        onClick={onLogout}
      >
        Log out
      </button>
    </div>
  )
}

export default Navbar
