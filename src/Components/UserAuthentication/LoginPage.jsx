import React, { useEffect, useState } from 'react'
import bg from '../../assets/userpage.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSignup } from '../../slice/slice';
import { useScreenSize } from '../CustomHook/useScreenSize';
import CircleLoader from 'react-spinners/CircleLoader'
import useScrollTop from '../CustomHook/useScrollTop';

const LoginPage = () => {
  const { screenMode, userAuth, error:errorMessageFromSlice, isLoading } = useSelector((state) => state.movieReducer);
  const [errorMessage, setErrorMessage] = useState("");
  const [status, setStatus] = useState(false);
  const [forceLoader, setForceLoader] = useState(false);
  const [allFieldCheck, setAllFieldCheck] = useState(true);
  const screen = useScreenSize();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState({
    email: false,
    password: false,
    showGeneralError: false,
  });

  const handleUserForm = (e) => {
    e.preventDefault();

    const isEmailValid = /\S+@\S+\.\S+/.test(user.email);
    const isPasswordValid = user.password.trim().length >= 8;

    const isAnyFieldMissing = !isEmailValid || !isPasswordValid;
    setAllFieldCheck(isAnyFieldMissing);

    setError({
      email: !isEmailValid,
      password: !isPasswordValid,
      showGeneralError: isAnyFieldMissing,
    });

    if (!isAnyFieldMissing) {
      dispatch(getSignup({
        email: user.email,
        password: user.password,
        signing: 'login',
      }));
      setForceLoader(!forceLoader);
    }
  };
  useScrollTop();
  useEffect(()=> {
      if (userAuth.accessToken) {
        setStatus(true);
        navigateHome();
        localStorage.setItem('userDetails', JSON.stringify(userAuth));
      } else {
        setErrorMessage(errorMessageFromSlice);
      }
  }, [userAuth, errorMessageFromSlice])


  function navigateHome() {
    setTimeout (()=> {
      navigate('/', { replace: true } )
    }, 2000)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));

    setError((prevError) => ({
      ...prevError,
      [name]: false,
      showGeneralError: false, 
    }));
  };

  return (
    <>
      <div className={`relative flex h-dvh justify-center  ${screenMode==="dark"?"bg-slate-800 text-white":"bg-white text-black"}`}>
        {screen > 960 &&
        <img className=" h-fit w-[60%]" src={bg} alt="background" />
        }
        <div className='flex h-fit flex-col justify-center w-[40%]'>
          <h2 className='text-[28px] my-5 text-center font-bold'>LOGIN</h2>
          <form onSubmit={handleUserForm} className=" flex flex-col gap-2 justify-center items-center">
            <label htmlFor="email">EMAIL</label>
            <input
              type="text"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              className={`border ${error.email ? 'border-red-500' : ''} ${screenMode==="dark"? 'bg-slate-800 text-white':'bg-white text-black border-black'}`}
            />
            {error.email && <p className="text-red-500 text-[14px]">Please enter a valid email</p>}
            <div className="my-1"></div>

            <label htmlFor="password">PASSWORD</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleInputChange}
              className={`border ${error.password ? 'border-red-500' : ''} ${screenMode==="dark"? 'bg-slate-800 text-white':'bg-white text-black border-black'}`}
            />
            {error.password && <p className="text-red-500 text-[14px]">Please enter a valid password</p>}
            <div className="my-1"></div>

            <button type="submit" className="bg-orange-400 px-4 py-1 rounded-lg hover:bg-orange-300">
              Continue
            </button>
            {error.showGeneralError && (
              <p className="text-red-500 text-[14px]">Please fill in all the fields</p>
            )}
            <Link to='/user-authentication/signup'>
              New User
            </Link>
            {status ?
              (<div className='text-green-500'>
                Login Success 
              </div>):(
              <div className='text-red-500'>
                {!allFieldCheck && errorMessage}
              </div>
              )
            }
          </form>
        </div>
        {isLoading && 
          <div className='absolute flex justify-center items-center bg-black opacity-50 w-full h-full'>
            <CircleLoader 
            size={250}
            color="white"
            />
          </div>
        }
      </div>
    </>
  )
}

export default LoginPage
