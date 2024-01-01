import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getActionMovie, getAdventureMovie, getAnimationMovie, getComedyMovie, getCrimeMovie, getDocumentaryMovie, getDramaMovie, getFamilyMovie, getFantasyMovie, getHistoryMovie, getHorrorMovie, getMusicMovie, getMysteryMovie, getNowPlaying, getPopular, getRomanceMovie, getThrillerMovie, getTopRated, getUpcoming, gettingWatchList } from '../../slice/slice';
import Carousel from '../Carousel/Carousel';
import { Suspense } from 'react';
import Loader from "../LazyLoader/LazyLoader"
import HomeHeaderCarousel from '../HomeHeaderCarousel/HomeHeaderCarousel';
import { Link } from 'react-router-dom';

const Homepage = () => {
    const { screenMode, popularMovieList, nowPlayingMovieList, topRatedMovieList, 
        upcomingMovieList, actionMovie, adventureMovie, animationMovie, comedyMovie,
        crimeMovie, DocumentaryMovie, DramaMovie, FamilyMovie, FantasyMovie, HistoryMovie,
        HorrorMovie, MusicMovie, MysteryMovie, RomanceMovie, ThrillerMovie,
    } = useSelector((state) => state.movieReducer);
    const dispatch = useDispatch();
    const [loginCheck, setLoginCheck] = useState(false);

    const LazyCarousel = React.lazy(()=>import("../Carousel/Carousel"));
    const userLocalCheck = JSON.parse(localStorage.getItem('userDetails')) || [];
    

    useEffect(()=> {
        dispatch(getNowPlaying({ type: 'now_playing', page: 1 }));
        dispatch(getTopRated({ type: 'top_rated', page: 1 }));
        dispatch(getPopular({ type: 'popular', page: 1 }));
        dispatch(getUpcoming({ type: 'upcoming', page: 1 }));
        dispatch(getActionMovie({type: '28', page: 1}));
        dispatch(getAdventureMovie({type: '12', page: 1}));
        dispatch(getAnimationMovie({type: '16', page: 1}));
        dispatch(getComedyMovie({type: '35', page: 1}));
        dispatch(getCrimeMovie({type: '80', page: 1}));
        dispatch(getDocumentaryMovie({type: '99', page: 1}));
        dispatch(getDramaMovie({type: '18', page: 1}));
        dispatch(getFamilyMovie({type: '10751', page: 1}));
        dispatch(getFantasyMovie({type: '14', page: 1}));
        dispatch(getHistoryMovie({type: '36', page: 1}));
        dispatch(getHorrorMovie({type: '27', page: 1}));
        dispatch(getMusicMovie({type: '10402', page: 1}));
        dispatch(getMysteryMovie({type: '9648', page: 1}));
        dispatch(getRomanceMovie({type: '10749', page: 1}));
        dispatch(getThrillerMovie({type: '53', page: 1}));

        if (userLocalCheck.email) {
            setLoginCheck(true);
            const result = dispatch(gettingWatchList({
                tokenValue: userLocalCheck.accessToken,
                methods: "GET",
                suffix: "watch-later/",
                movie: "",
            }))
            result.then((res=>{
                const response = res.payload;
                const tempArr = response.map((item)=>item.detail);
                localStorage.setItem('watchList', JSON.stringify(tempArr));
            }))
        }
    }, [loginCheck])

    return (
        <>
            <div className={`scroll-smooth w-[100%] m-auto px-4 ${screenMode==="dark"?"bg-slate-800 text-white":"bg-white text-black"}`}>                
                <HomeHeaderCarousel />
                <Link to='upcoming/page-1' state={{type: "upcoming"}}>
                    <h2 className='cursor-pointer font-bold uppercase px-1 py-2 hover:underline'>Upcoming Movies</h2>
                </Link>
                <Suspense fallback={<Loader />}>
                    <LazyCarousel props={upcomingMovieList}/>                
                </Suspense>
                <div className={`my-4 border ${screenMode==='dark'?'border-gray-600':'border-gray-200'}  border-[1px]`}></div>
                <Link to='now-showing/page-1' state={{type: "now-showing"}}>
                    <h2 className='cursor-pointer font-bold uppercase px-1 py-2 hover:underline'>Now Showing</h2>
                </Link>
                <Suspense fallback={<Loader />}>
                    <LazyCarousel props={nowPlayingMovieList}/>
                </Suspense>
                <div className={`my-4 border ${screenMode==='dark'?'border-gray-600':'border-gray-200'}  border-[1px]`}></div>
                <Link to='popular/page-1' state={{type: "popular"}}>
                    <h2 className='cursor-pointer font-bold uppercase px-1 py-2 hover:underline'>Popular Movies</h2>
                </Link>
                <Suspense fallback={<Loader />}>
                    <LazyCarousel props={popularMovieList}/>
                </Suspense>
                <div className={`my-4 border ${screenMode==='dark'?'border-gray-600':'border-gray-200'}  border-[1px]`}></div>
                <Link to='top-rated/page-1' state={{type: "top-rated"}}>
                    <h2 className='cursor-pointer font-bold uppercase px-1 py-2 hover:underline'>Top Rated Movies</h2>
                </Link>
                <Suspense fallback={<Loader />}>
                    <LazyCarousel props={topRatedMovieList}/>
                </Suspense>
                <div className={`my-4 border ${screenMode==='dark'?'border-gray-600':'border-gray-200'}  border-[1px]`}></div>
                <Link to='action-movies/page-1' state={{type: "top-rated"}}>
                    <h2 className='cursor-pointer font-bold uppercase px-1 py-2 hover:underline'>Action Movies</h2>
                </Link>
                <Suspense fallback={<Loader />}>
                    <LazyCarousel props={actionMovie}/>
                </Suspense>
                <div className={`my-4 border ${screenMode==='dark'?'border-gray-600':'border-gray-200'}  border-[1px]`}></div>
                <Link to='adventure-movies/page-1' state={{type: "top-rated"}}>
                    <h2 className='cursor-pointer font-bold uppercase px-1 py-2 hover:underline'>Adventure Movies</h2>
                </Link>
                <Suspense fallback={<Loader />}>
                    <LazyCarousel props={adventureMovie}/>
                </Suspense>
                <div className={`my-4 border ${screenMode==='dark'?'border-gray-600':'border-gray-200'}  border-[1px]`}></div>
                <Link to='animation-movies/page-1'>
                    <h2 className='cursor-pointer font-bold uppercase px-1 py-2 hover:underline'>Animation Movies</h2>
                </Link>
                <Suspense fallback={<Loader />}>
                    <LazyCarousel props={animationMovie}/>
                </Suspense>
                <div className={`my-4 border ${screenMode==='dark'?'border-gray-600':'border-gray-200'}  border-[1px]`}></div>
                <Link to='comedy-movies/page-1'>
                    <h2 className='cursor-pointer font-bold uppercase px-1 py-2 hover:underline'>Comedy Movies</h2>
                </Link>
                <Suspense fallback={<Loader />}>
                    <LazyCarousel props={comedyMovie}/>
                </Suspense>
                <div className={`my-4 border ${screenMode==='dark'?'border-gray-600':'border-gray-200'}  border-[1px]`}></div>
                <Link to='crime-movies/page-1'>
                    <h2 className='cursor-pointer font-bold uppercase px-1 py-2 hover:underline'>Crime Movies</h2>
                </Link>
                <Suspense fallback={<Loader />}>
                    <LazyCarousel props={crimeMovie}/>
                </Suspense>
                <div className={`my-4 border ${screenMode==='dark'?'border-gray-600':'border-gray-200'}  border-[1px]`}></div>
                <Link to='documentary-movies/page-1'>
                    <h2 className='cursor-pointer font-bold uppercase px-1 py-2 hover:underline'>Documentary Movies</h2>
                </Link>
                <Suspense fallback={<Loader />}>
                    <LazyCarousel props={DocumentaryMovie}/>
                </Suspense>
                <div className={`my-4 border ${screenMode==='dark'?'border-gray-600':'border-gray-200'}  border-[1px]`}></div>
                <Link to='drama-movies/page-1'>
                    <h2 className='cursor-pointer font-bold uppercase px-1 py-2 hover:underline'>Drama Movies</h2>
                </Link>
                <Suspense fallback={<Loader />}>
                    <LazyCarousel props={DramaMovie}/>
                </Suspense>
                <div className={`my-4 border ${screenMode==='dark'?'border-gray-600':'border-gray-200'}  border-[1px]`}></div>
                <Link to='family-movies/page-1'>
                    <h2 className='cursor-pointer font-bold uppercase px-1 py-2 hover:underline'>Family Movies</h2>
                </Link>
                <Suspense fallback={<Loader />}>
                    <LazyCarousel props={FamilyMovie}/>
                </Suspense>
                <div className={`my-4 border ${screenMode==='dark'?'border-gray-600':'border-gray-200'}  border-[1px]`}></div>
                <Link to='fantasy-movies/page-1'>
                    <h2 className='cursor-pointer font-bold uppercase px-1 py-2 hover:underline'>Fantasy Movies</h2>
                </Link>
                <Suspense fallback={<Loader />}>
                    <LazyCarousel props={FantasyMovie}/>
                </Suspense>
                <div className={`my-4 border ${screenMode==='dark'?'border-gray-600':'border-gray-200'}  border-[1px]`}></div>
                <Link to='history-movies/page-1'>
                    <h2 className='cursor-pointer font-bold uppercase px-1 py-2 hover:underline'>History Movies</h2>
                </Link>
                <Suspense fallback={<Loader />}>
                    <LazyCarousel props={HistoryMovie}/>
                </Suspense>
                <div className={`my-4 border ${screenMode==='dark'?'border-gray-600':'border-gray-200'}  border-[1px]`}></div>
                <Link to='music-movies/page-1'>
                    <h2 className='cursor-pointer font-bold uppercase px-1 py-2 hover:underline'>Music Movies</h2>
                </Link>
                <Suspense fallback={<Loader />}>
                    <LazyCarousel props={MusicMovie}/>
                </Suspense>
                <div className={`my-4 border ${screenMode==='dark'?'border-gray-600':'border-gray-200'}  border-[1px]`}></div>
                <Link to='mystery-movies/page-1'>
                    <h2 className='cursor-pointer font-bold uppercase px-1 py-2 hover:underline'>Mystery Movies</h2>
                </Link>
                <Suspense fallback={<Loader />}>
                    <LazyCarousel props={MysteryMovie}/>
                </Suspense>
                <div className={`my-4 border ${screenMode==='dark'?'border-gray-600':'border-gray-200'}  border-[1px]`}></div>
                <Link to='romance-movies/page-1'>
                    <h2 className='cursor-pointer font-bold uppercase px-1 py-2 hover:underline'>Romance Movies</h2>
                </Link>
                <Suspense fallback={<Loader />}>
                    <LazyCarousel props={RomanceMovie}/>
                </Suspense>
                <div className={`my-4 border ${screenMode==='dark'?'border-gray-600':'border-gray-200'}  border-[1px]`}></div>
                <Link to='thriller-movies/page-1'>
                    <h2 className='cursor-pointer font-bold uppercase px-1 py-2 hover:underline'>Thriller Movies</h2>
                </Link>
                <Suspense fallback={<Loader />}>
                    <LazyCarousel props={ThrillerMovie}/>
                </Suspense>
            </div>
        </>
  )
}

export default Homepage
