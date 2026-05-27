import React from 'react'

function Navbar() {
  return (
    <nav className='bg-gray-900 text-white flex justify-between items-center px-4 h-16'>
      <div className='logo font-bold text-lg'>
        Get Me A Chai
      </div>
      <ul className='flex gap-4 justify-between'>
        <li className=' cursor-pointer'>Home</li>
        <li className=' cursor-pointer'>About</li>
        <li className=' cursor-pointer'>Projects</li>
        <li className=' cursor-pointer'>Sign In</li>
        <li className=' cursor-pointer'>Login</li>
      </ul>
    </nav>
  )
}

export default Navbar
