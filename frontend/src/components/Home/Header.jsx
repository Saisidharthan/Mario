import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='sticky top-0 shadow-md z-20'>
        <div className="flex justify-between items-center bg-black text-white w-full h-[75px] p-8">
            <Link to='/'><h1 className="text-2xl font-semibold">Mario</h1></Link>
            <div className="flex justify-center items-center text-lg gap-5">
                <Link to='/login'>Login</Link>
                <Link to='/register'>Register</Link>
            </div>
        </div>
    </div>
  )
}

export default Header