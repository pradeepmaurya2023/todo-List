import React from 'react'
import './Navbar.css'

const Navbar = () => {
  return (
    <nav className='flex justify-between px-4 py-3 bg-violet-700 text-white'>
        <div className="logo">
            <span className='font-balooBhaijaan font-bold text-xl text-shadow'>iTasks</span>
        </div>
        <ul className='flex gap-5 font-balooBhaijaan text-lg'>
            <li className='mx-2 cursor-pointer hover:scale-125 duration-300'>Home</li>
            <li className='mx-2 cursor-pointer hover:scale-125 duration-300'>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar