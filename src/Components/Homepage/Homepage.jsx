import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getActionMovie, getAdventureMovie, getAnimationMovie, getComedyMovie, getCrimeMovie, getDocumentaryMovie, getDramaMovie, getFamilyMovie, getFantasyMovie, getHistoryMovie, getHorrorMovie, getMusicMovie, getMysteryMovie, getNowPlaying, getPopular, getRomanceMovie, getThrillerMovie, getTopRated, getUpcoming, gettingWatchList } from '../../slice/slice';
import { Suspense } from 'react';
import Shimmer from '../Shimmer/Shimmer';
import useScrollTop from "../CustomHook/useScrollTop"
import { Link } from 'react-router-dom';
import HomeHeaderVideo from '../HomeHeaderVideo/HomeHeaderVideo';

const Homepage = () => {
    const { screenMode, popularMovieList, nowPlayingMovieList, topRatedMovieList, 
        upcomingMovieList, actionMovie, adventureMovie, animationMovie, comedyMovie,
        crimeMovie, DocumentaryMovie, DramaMovie, FamilyMovie, FantasyMovie, HistoryMovie,
        HorrorMovie, MusicMovie, MysteryMovie, RomanceMovie, ThrillerMovie, watchList
    } = useSelector((state) => state.movieReducer);
    const dispatch = useDispatch();
    const [loginCheck, setLoginCheck] = useState(false);

    const LazyCarousel = React.lazy(()=>import("../Carousel/Carousel"));
    const userLocalCheck = JSON.parse(localStorage.getItem('userDetails')) || [];   
    
    useScrollTop();

    useEffect(()=> {
        nowPlayingMovieList.length === 0 && dispatch(getNowPlaying({ type: 'now_playing', page: 1 }));
        topRatedMovieList.length === 0 && dispatch(getTopRated({ type: 'top_rated', page: 1 }));
        popularMovieList.length === 0 && dispatch(getPopular({ type: 'popular', page: 1 }));
        upcomingMovieList.length === 0 && dispatch(getUpcoming({ type: 'upcoming', page: 1 }));
        actionMovie.length === 0 && dispatch(getActionMovie({type: '28', page: 1}));
        adventureMovie.length === 0 && dispatch(getAdventureMovie({type: '12', page: 1}));
        animationMovie.length === 0 && dispatch(getAnimationMovie({type: '16', page: 1}));
        comedyMovie.length === 0 && dispatch(getComedyMovie({type: '35', page: 1}));
        crimeMovie.length === 0 && dispatch(getCrimeMovie({type: '80', page: 1}));
        DocumentaryMovie.length === 0 && dispatch(getDocumentaryMovie({type: '99', page: 1}));
        DramaMovie.length === 0 && dispatch(getDramaMovie({type: '18', page: 1}));
        FamilyMovie.length === 0 && dispatch(getFamilyMovie({type: '10751', page: 1}));
        FantasyMovie.length === 0 && dispatch(getFantasyMovie({type: '14', page: 1}));
        HistoryMovie.length === 0 && dispatch(getHistoryMovie({type: '36', page: 1}));
        HorrorMovie.length === 0 && dispatch(getHorrorMovie({type: '27', page: 1}));
        MusicMovie.length === 0 && dispatch(getMusicMovie({type: '10402', page: 1}));
        MysteryMovie.length === 0 && dispatch(getMysteryMovie({type: '9648', page: 1}));
        RomanceMovie.length === 0 && dispatch(getRomanceMovie({type: '10749', page: 1}));
        ThrillerMovie.length === 0 && dispatch(getThrillerMovie({type: '53', page: 1}));

        if (userLocalCheck.email) {
            setLoginCheck(true);
            
        }
        
    }, [loginCheck, location.pathname])
    
    return (
        <>
            <div className={`scroll-smooth w-full px-4 lg:px-4 m-auto ${screenMode==="dark"?"bg-slate-800 text-white":"bg-white text-black"}`}>                
                <div className=' w-full'>
                    <HomeHeaderVideo />
                </div>
                <Link to='upcoming/page-1' className='relative z-5' state={{type: "upcoming"}}>
                    <h2 className='cursor-pointer font-bold uppercase px-1 py-2 hover:underline'>Upcoming Movies</h2>
                </Link>
                <Suspense fallback={<Shimmer />}>
                    <LazyCarousel props={upcomingMovieList}/>                
                </Suspense>
                <div className={`my-4 border ${screenMode==='dark'?'border-gray-600':'border-gray-200'}  border-[1px]`}></div>
                <Link to='now-showing/page-1' state={{type: "now-showing"}}>
                    <h2 className='cursor-pointer font-bold uppercase px-1 py-2 hover:underline'>Now Showing</h2>
                </Link>
                <Suspense fallback={<Shimmer />}>
                    <LazyCarousel props={nowPlayingMovieList}/>
                </Suspense>
                <div className={`my-4 border ${screenMode==='dark'?'border-gray-600':'border-gray-200'}  border-[1px]`}></div>
                <Link to='popular/page-1' state={{type: "popular"}}>
                    <h2 className='cursor-pointer font-bold uppercase px-1 py-2 hover:underline'>Popular Movies</h2>
                </Link>
                <Suspense fallback={<Shimmer />}>
                    <LazyCarousel props={popularMovieList}/>
                </Suspense>
                <div className={`my-4 border ${screenMode==='dark'?'border-gray-600':'border-gray-200'}  border-[1px]`}></div>
                <Link to='top-rated/page-1' state={{type: "top-rated"}}>
                    <h2 className='cursor-pointer font-bold uppercase px-1 py-2 hover:underline'>Top Rated Movies</h2>
                </Link>
                <Suspense fallback={<Shimmer />}>
                    <LazyCarousel props={topRatedMovieList}/>
                </Suspense>
                <div className={`my-4 border ${screenMode==='dark'?'border-gray-600':'border-gray-200'}  border-[1px]`}></div>
                <Link to='action-movies/page-1' state={{type: "top-rated"}}>
                    <h2 className='cursor-pointer font-bold uppercase px-1 py-2 hover:underline'>Action Movies</h2>
                </Link>
                <Suspense fallback={<Shimmer />}>
                    <LazyCarousel props={actionMovie}/>
                </Suspense>
                <div className={`my-4 border ${screenMode==='dark'?'border-gray-600':'border-gray-200'}  border-[1px]`}></div>
                <Link to='adventure-movies/page-1' state={{type: "top-rated"}}>
                    <h2 className='cursor-pointer font-bold uppercase px-1 py-2 hover:underline'>Adventure Movies</h2>
                </Link>
                <Suspense fallback={<Shimmer />}>
                    <LazyCarousel props={adventureMovie}/>
                </Suspense>
                <div className={`my-4 border ${screenMode==='dark'?'border-gray-600':'border-gray-200'}  border-[1px]`}></div>
                <Link to='animation-movies/page-1'>
                    <h2 className='cursor-pointer font-bold uppercase px-1 py-2 hover:underline'>Animation Movies</h2>
                </Link>
                <Suspense fallback={<Shimmer />}>
                    <LazyCarousel props={animationMovie}/>
                </Suspense>
                <div className={`my-4 border ${screenMode==='dark'?'border-gray-600':'border-gray-200'}  border-[1px]`}></div>
                <Link to='comedy-movies/page-1'>
                    <h2 className='cursor-pointer font-bold uppercase px-1 py-2 hover:underline'>Comedy Movies</h2>
                </Link>
                <Suspense fallback={<Shimmer />}>
                    <LazyCarousel props={comedyMovie}/>
                </Suspense>
                <div className={`my-4 border ${screenMode==='dark'?'border-gray-600':'border-gray-200'}  border-[1px]`}></div>
                <Link to='crime-movies/page-1'>
                    <h2 className='cursor-pointer font-bold uppercase px-1 py-2 hover:underline'>Crime Movies</h2>
                </Link>
                <Suspense fallback={<Shimmer />}>
                    <LazyCarousel props={crimeMovie}/>
                </Suspense>
                <div className={`my-4 border ${screenMode==='dark'?'border-gray-600':'border-gray-200'}  border-[1px]`}></div>
                <Link to='documentary-movies/page-1'>
                    <h2 className='cursor-pointer font-bold uppercase px-1 py-2 hover:underline'>Documentary Movies</h2>
                </Link>
                <Suspense fallback={<Shimmer />}>
                    <LazyCarousel props={DocumentaryMovie}/>
                </Suspense>
                <div className={`my-4 border ${screenMode==='dark'?'border-gray-600':'border-gray-200'}  border-[1px]`}></div>
                <Link to='drama-movies/page-1'>
                    <h2 className='cursor-pointer font-bold uppercase px-1 py-2 hover:underline'>Drama Movies</h2>
                </Link>
                <Suspense fallback={<Shimmer />}>
                    <LazyCarousel props={DramaMovie}/>
                </Suspense>
                <div className={`my-4 border ${screenMode==='dark'?'border-gray-600':'border-gray-200'}  border-[1px]`}></div>
                <Link to='family-movies/page-1'>
                    <h2 className='cursor-pointer font-bold uppercase px-1 py-2 hover:underline'>Family Movies</h2>
                </Link>
                <Suspense fallback={<Shimmer />}>
                    <LazyCarousel props={FamilyMovie}/>
                </Suspense>
                <div className={`my-4 border ${screenMode==='dark'?'border-gray-600':'border-gray-200'}  border-[1px]`}></div>
                <Link to='fantasy-movies/page-1'>
                    <h2 className='cursor-pointer font-bold uppercase px-1 py-2 hover:underline'>Fantasy Movies</h2>
                </Link>
                <Suspense fallback={<Shimmer />}>
                    <LazyCarousel props={FantasyMovie}/>
                </Suspense>
                <div className={`my-4 border ${screenMode==='dark'?'border-gray-600':'border-gray-200'}  border-[1px]`}></div>
                <Link to='history-movies/page-1'>
                    <h2 className='cursor-pointer font-bold uppercase px-1 py-2 hover:underline'>History Movies</h2>
                </Link>
                <Suspense fallback={<Shimmer />}>
                    <LazyCarousel props={HistoryMovie}/>
                </Suspense>
                <div className={`my-4 border ${screenMode==='dark'?'border-gray-600':'border-gray-200'}  border-[1px]`}></div>
                <Link to='music-movies/page-1'>
                    <h2 className='cursor-pointer font-bold uppercase px-1 py-2 hover:underline'>Music Movies</h2>
                </Link>
                <Suspense fallback={<Shimmer />}>
                    <LazyCarousel props={MusicMovie}/>
                </Suspense>
                <div className={`my-4 border ${screenMode==='dark'?'border-gray-600':'border-gray-200'}  border-[1px]`}></div>
                <Link to='mystery-movies/page-1'>
                    <h2 className='cursor-pointer font-bold uppercase px-1 py-2 hover:underline'>Mystery Movies</h2>
                </Link>
                <Suspense fallback={<Shimmer />}>
                    <LazyCarousel props={MysteryMovie}/>
                </Suspense>
                <div className={`my-4 border ${screenMode==='dark'?'border-gray-600':'border-gray-200'}  border-[1px]`}></div>
                <Link to='romance-movies/page-1'>
                    <h2 className='cursor-pointer font-bold uppercase px-1 py-2 hover:underline'>Romance Movies</h2>
                </Link>
                <Suspense fallback={<Shimmer />}>
                    <LazyCarousel props={RomanceMovie}/>
                </Suspense>
                <div className={`my-4 border ${screenMode==='dark'?'border-gray-600':'border-gray-200'}  border-[1px]`}></div>
                <Link to='thriller-movies/page-1'>
                    <h2 className='cursor-pointer font-bold uppercase px-1 py-2 hover:underline'>Thriller Movies</h2>
                </Link>
                <Suspense fallback={<Shimmer />}>
                    <LazyCarousel props={ThrillerMovie}/>
                </Suspense>
            </div>
        </>
  )
}

export default Homepage
