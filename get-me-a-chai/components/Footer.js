import React from 'react'

function Footer() {
  return (
    <footer  className='bg-gray-900 text-white flex justify-center items-center px-4 h-16'>
      <p className='text-center'>
        &copy; {new Date().getFullYear()} Get Me A Chai - All rights reserved.
      </p>
    </footer>
  )
}

export default Footer
