import React, { useEffect, useState, useMemo  } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { getActionMovie, getAdventureMovie, getAnimationMovie, getComedyMovie, getCrimeMovie, getDocumentaryMovie, getDramaMovie, getFamilyMovie, getFantasyMovie, getHistoryMovie, getHorrorMovie, getMusicMovie, getMysteryMovie, getNowPlaying, getPopular, getRomanceMovie, getSingleMovie, getThrillerMovie, getTopRated, getUpcoming } from '../../slice/slice';
import dummyImg from "../../assets/vertical-dummy.jpg"


const MovieCollection = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { screenMode, popularMovieList, nowPlayingMovieList, topRatedMovieList, 
        upcomingMovieList, actionMovie, adventureMovie, animationMovie, 
        comedyMovie, crimeMovie, DocumentaryMovie, DramaMovie, FamilyMovie, FantasyMovie, 
        HistoryMovie, HorrorMovie, MusicMovie, MysteryMovie, RomanceMovie, ThrillerMovie } = useSelector((state) => state.movieReducer);
    const [page, setPage] = useState(Number(location.pathname.split('/')[2].charAt(5)));

    const fetchingInitiator = location.pathname.split('/');

    const handlerDispatch = (idVal) => {
        dispatch(getSingleMovie({ id: idVal }));
        localStorage.setItem('movieIdBackup', JSON.stringify(idVal));
    };

    const handlerPageControl = (value) => {
        if (value === "prev" && page > 2) {
            setPage((prev) => prev - 1);
            navigate(`/${fetchingInitiator[1]}/page-${page-1}`);
        } else if (value === "next" && page <= dataLoad.total_pages) {
            setPage((prev) => prev + 1);
            navigate(`/${fetchingInitiator[1]}/page-${page+1}`);
        }
    };

    const dataLoad = useMemo(() => {
        switch (fetchingInitiator[1]) {
            case 'upcoming':
                return upcomingMovieList;
            case 'popular':
                return popularMovieList;
            case 'now-showing':
                return nowPlayingMovieList;
            case 'top-rated':
                return topRatedMovieList;
            case 'action-movies':
                return actionMovie;
            case 'adventure-movies':
                return adventureMovie;
            case 'animation-movies':
                return animationMovie;
            case 'comedy-movies':
                return comedyMovie;
            case 'crime-movies':
                return crimeMovie;
            case 'documentary-movies':
                return DocumentaryMovie;
            case 'drama-movies':
                return DramaMovie;
            case 'family-movies':
                return FamilyMovie;
            case 'fantasy-movies':
                return FantasyMovie;
            case 'history-movies':
                return HistoryMovie;
            case 'horror-movies':
                return HorrorMovie;
            case 'music-movies':
                return MusicMovie;
            case 'mystery-movies':
                return MysteryMovie;
            case 'romance-movies':
                return RomanceMovie;
            case 'thriller-movies':
                return ThrillerMovie;
            default:
                return [];
        }
    }, [upcomingMovieList, popularMovieList, nowPlayingMovieList, topRatedMovieList,
        actionMovie, adventureMovie, animationMovie, comedyMovie, crimeMovie, DocumentaryMovie, 
        DramaMovie, FamilyMovie, FantasyMovie, HistoryMovie, HorrorMovie, MusicMovie, MysteryMovie,
        RomanceMovie, ThrillerMovie, fetchingInitiator[1]]);

    const rendering = () => {
        const fetchingPage = location.pathname.split('/');
        const pageNumber = fetchingPage[2].charAt(5) ? fetchingPage[2].charAt(5) : 1;
        if (fetchingPage[1] === 'upcoming') {
            dispatch(getUpcoming({ type: fetchingPage[1], page: pageNumber }));
        } else if (fetchingPage[1] === 'popular') {
            dispatch(getPopular({ type: fetchingPage[1], page: pageNumber }));
        } else if (fetchingPage[1] === 'now-showing') {
            dispatch(getNowPlaying({ type: fetchingPage[1], page: pageNumber }));
        } else if (fetchingPage[1] === 'top-rated') {
            dispatch(getTopRated({ type: fetchingPage[1], page: pageNumber }));
        }else if (fetchingPage[1] === 'action-movies') {
            dispatch(getActionMovie({ type: fetchingPage[1], page: pageNumber }));
        }else if (fetchingPage[1] === 'adventure-movies') {
            dispatch(getAdventureMovie({ type: fetchingPage[1], page: pageNumber }));
        }else if (fetchingPage[1] === 'animation-movies') {
            dispatch(getAnimationMovie({ type: fetchingPage[1], page: pageNumber }));
        }else if (fetchingPage[1] === 'comedy-movies') {
            dispatch(getComedyMovie({ type: fetchingPage[1], page: pageNumber }));
        }else if (fetchingPage[1] === 'crime-movies') {
            dispatch(getCrimeMovie({ type: fetchingPage[1], page: pageNumber }));
        }else if (fetchingPage[1] === 'documentary-movies') {
            dispatch(getDocumentaryMovie({ type: fetchingPage[1], page: pageNumber }));
        }else if (fetchingPage[1] === 'family-movies') {
            dispatch(getFamilyMovie({ type: fetchingPage[1], page: pageNumber }));
        }else if (fetchingPage[1] === 'fantasy-movies') {
            dispatch(getFantasyMovie({ type: fetchingPage[1], page: pageNumber }));
        }else if (fetchingPage[1] === 'history-movies') {
            dispatch(getHistoryMovie({ type: fetchingPage[1], page: pageNumber }));
        }else if (fetchingPage[1] === 'horror-movies') {
            dispatch(getHorrorMovie({ type: fetchingPage[1], page: pageNumber }));
        }else if (fetchingPage[1] === 'music-movies') {
            dispatch(getMusicMovie({ type: fetchingPage[1], page: pageNumber }));
        }else if (fetchingPage[1] === 'mystery-movies') {
            dispatch(getMysteryMovie({ type: fetchingPage[1], page: pageNumber }));
        }else if (fetchingPage[1] === 'romance-movies') {
            dispatch(getRomanceMovie({ type: fetchingPage[1], page: pageNumber }));
        }else if (fetchingPage[1] === 'thriller-movies') {
            dispatch(getThrillerMovie({ type: fetchingPage[1], page: pageNumber }));
        }else if (fetchingPage[1] === 'drama-movies') {
            dispatch(getDramaMovie({ type: fetchingPage[1], page: pageNumber }));
        }
    };

    useEffect(() => {
        rendering();
    }, [location.pathname, page]);


  return (
    <>  
        <div className={`flex flex-col justify-center items-center ${screenMode==="dark"?"bg-slate-800 text-white":"bg-white text-black"}`}>
            <div id='check'className={`flex flex-row justify-center flex-wrap gap-4 px-2 py-4 `}  >
                { dataLoad?.results?.map((item)=> (
                    <Link key={item.id} onClick={()=>handlerDispatch(item.id)} to={`${item.title}`}>
                        <div className='w-[150px] cursor-pointer flex flex-col justify-center items-center hover:opacity-60'>
                            {item.poster_path ? 
                                <img className='w-[150px]' src={`https://image.tmdb.org/t/p/original${item.poster_path}`} alt="img" /> 
                                : (<img src={dummyImg} />)
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
        </div>
    </>
  )
}

export default MovieCollection