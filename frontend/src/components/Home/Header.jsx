import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import img from '../../assets/logo.png';
import img2 from '../../assets/user-photo.png';

const Header = () => {
  const { user, logoutUser } = useContext(UserContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className='sticky top-0 shadow-md z-20'>
      <div className="flex justify-between items-center bg-black text-white w-full h-[85px] p-8">
        <div className='flex justify-center items-center gap-8'>
          <Link to='/'>
            <img src={img} alt='Logo' width={90} height={90} />
          </Link>
          {user && (
            <Link to='/'>
              <h1 className='text-xl'>Home</h1>
            </Link>
          )}
        </div>
        <div className="flex justify-center items-center text-lg gap-5">
          {user ? (
            <div className='relative'>
              <button onClick={toggleDropdown} className='w-10 h-10'>
                <img src={img2} alt='User' className='w-full h-full object-cover' />
              </button>
              {dropdownOpen && (
                <div className='absolute right-0 mt-2 bg-white text-black rounded shadow-lg w-[150px] flex flex-col justify-center items-center'>
                  <button onClick={() => {
                    toggleDropdown();
                    logoutUser();
                  }} className='px-4 py-2 text-left w-full hover:bg-gray-200 rounded'>
                    Logout
                  </button>
                  <button onClick={toggleDropdown} className='px-4 py-2 text-left w-full hover:bg-gray-200 rounded'>
                    <Link to='/profile'>
                      Profile
                    </Link>
                  </button>
                  <button onClick={toggleDropdown} className='px-4 py-2 text-left w-full hover:bg-gray-200 rounded'>
                    <Link to='/managepurchase'>
                      Orders
                    </Link>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to='/login'>Login</Link>
              <Link to='/register'>Register</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
