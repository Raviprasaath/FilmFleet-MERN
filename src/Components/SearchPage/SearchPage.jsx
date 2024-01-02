import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getSingleMovie, gettingSearchList } from '../../slice/slice';
import gif from "../../assets/no_result.gif"
import dummyImg from "../../assets/vertical-dummy.jpg"


const SearchPage = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { screenMode, searchResult, searchQuery } = useSelector((state) => state.movieReducer);
    const [page, setPage] = useState(Number(location.pathname.split('/')[2].charAt(5)));
    const [dataLoad, setDataLoad] = useState([]);

    const fetchingInitiator = location.pathname.split('/');

    const handlerDispatch = (idVal) => {
        dispatch(getSingleMovie({ id: idVal }));
        localStorage.setItem('movieIdBackup', JSON.stringify(idVal));
    };

    const handlerPageControl = (value) => {
        if (value === "prev" && page > 2) {
            setPage((prev) => prev - 1);
            navigate(`/${fetchingInitiator[1]}/page-${page-1}`);
            dispatch(gettingSearchList({queryValue: searchQuery, page: page-1}));
        } else if (value === "next" && page <= dataLoad.total_pages) {
            setPage((prev) => prev + 1);
            navigate(`/${fetchingInitiator[1]}/page-${page+1}`);
            dispatch(gettingSearchList({queryValue: searchQuery, page: page+1}));
        }
    };

    useEffect(()=> {
        setDataLoad(searchResult);
    }, [searchResult, location.pathname])
    console.log(searchResult.results);
    return (
        <>
            {searchResult.results.length !== 0 ?
                (<div className={`flex flex-col justify-center items-center ${screenMode==="dark"?"bg-slate-800 text-white":"bg-white text-black"}`}>
                    <div id='check'className={`flex flex-row justify-center flex-wrap gap-4 px-2 py-4 `}  >
                        { dataLoad?.results?.map((item)=> (
                            <Link key={item.id} onClick={()=>handlerDispatch(item.id)} to={`${item.title}`}>
                                <div className='w-[150px] cursor-pointer flex flex-col justify-center items-center hover:opacity-60'>
                                    {item.poster_path ? 
                                    <img className='w-[150px]' src={`https://image.tmdb.org/t/p/original${item.poster_path}`} alt="img" />
                                    :<img src={dummyImg} />
                                    }
                                    {item.title}
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className='flex gap-3 '>
                        <button onClick={()=>handlerPageControl("prev")} className="bg-green-500 hover:bg-green-700 text-white text-[1rem] px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-green">
                            Prev
                        </button>
                        <div className="bg-green-500 text-white text-[1rem] px-3 py-1 rounded-md">
                            Current Page: {location.pathname.split('/')[2].charAt(5)}
                        </div>
                        <button onClick={()=>handlerPageControl("next")} className="bg-green-500 hover:bg-green-700 text-white text-[1rem] px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-green">
                            Next
                        </button>
                    </div>
                </div>):(
                    <div className='flex justify-center items-center'>
                        <img src={gif} alt='gif-img' className='w-[50vw]' />
                    </div>
                )
            }
        </>
  )
}

export default SearchPage
