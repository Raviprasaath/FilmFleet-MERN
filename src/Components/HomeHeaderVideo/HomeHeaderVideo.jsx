import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getTrailerOut } from '../../slice/slice';

const HomeHeaderVideo = () => {
    const { trailerLink, popularMovieList, nowPlayingMovieList, topRatedMovieList, 
        upcomingMovieList, actionMovie, adventureMovie, animationMovie, comedyMovie,
        crimeMovie, DocumentaryMovie, DramaMovie, FamilyMovie, FantasyMovie, HistoryMovie,
        HorrorMovie, MusicMovie, MysteryMovie, RomanceMovie, ThrillerMovie } = useSelector((state) => state.movieReducer);
    const [trailerKey, setTrailerKey] = useState('1DJYiG6wh0w');
    const [indexNum, setIndexNum] = useState(0);
    const [movieNumber, setMovieNumber] = useState(0);

    const [renderDelay, setRenderDelay] = useState(false);
    const dispatch = useDispatch();
  
    
    const array = [popularMovieList, nowPlayingMovieList, topRatedMovieList, 
        upcomingMovieList, actionMovie, adventureMovie, animationMovie, comedyMovie,
        crimeMovie, DocumentaryMovie, DramaMovie, FamilyMovie, FantasyMovie, HistoryMovie,
        HorrorMovie, MusicMovie, MysteryMovie, RomanceMovie, ThrillerMovie];
        
        
    useEffect(()=> {
        const indexNumber = Math.floor(Math.random()*array.length+1);
        const randomMovie = Math.floor(Math.random()*7+1);
        setMovieNumber(randomMovie);
        
        const time = setTimeout(()=> {
            let num = indexNumber;
            dispatch(getTrailerOut( {id: array[num]?.results[randomMovie]?.id} ));
            setIndexNum(num);
            setRenderDelay(true);
        }, 100)

        return (()=> clearTimeout(time));
    }, [FantasyMovie])

    useEffect(()=> {
        if (trailerLink?.results?.length > 0) {
            console.log(trailerLink.results);
            const keyFilter = trailerLink.results.filter((movie)=>movie.type === 'Trailer' || 'Teaser')
            let filterFromKey = keyFilter[0];
            if (keyFilter.length > 1) {
                filterFromKey = keyFilter.filter((movie)=>movie.name.includes('Trailer'));
                setTrailerKey(filterFromKey[0].key);
            } else {
                setTrailerKey(filterFromKey.key);
            }
        }
    }, [trailerLink])


    return (
        <>
            {renderDelay &&
            <>
                <div className='w-full relative -my-20'>
                    <div className='w-full mm:h-[400px] sm:h-[450px] md:h-[600px] lg:h-[650px] xl:h-[790px] '>
                    <iframe
                        className="w-full aspect-video"
                        src={ "https://www.youtube.com/embed/" + trailerKey + "?&autoplay=1&mute=1&loop=1" }
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    ></iframe>
                    </div>
                    <div className='absolute top-0 px-10 left-0 w-full aspect-video bg-gradient-to-r from-gray-800 from-5% via-transparent via-50% to-transparent to-100%'>
                        <p className='font-bold uppercase pt-[30%] text-3xl'>
                            {array[indexNum]?.results[movieNumber]?.title || array[indexNum]?.results[movieNumber]?.original_title}
                        </p>
                        <p className=' mm:w-full sm:w-full md:w-1/2 lg:w-3/4 xl:w-2/5 py-4 font-mono font-bold'>
                            {array[indexNum].results[movieNumber].overview}
                        </p>
                    </div>
                </div>
                
            </>
            }
        </>
    )
}

export default HomeHeaderVideo
