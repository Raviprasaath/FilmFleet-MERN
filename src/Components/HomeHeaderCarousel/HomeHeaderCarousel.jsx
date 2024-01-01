import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import "./HomeHeader.css"
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleMovie } from '../../slice/slice';
import "./HomeHeader.css"

const HomeHeaderCarousel = () => {
const { FantasyMovie, screenMode} = useSelector((state) => state.movieReducer);
    const dispatch = useDispatch();

  return (
    <>
      <Swiper className="mySwiper "
        slidesPerView={1}
        autoplay={{
            delay: 1000,
          }}
        loop={true}
        navigation={true}
        modules={[Pagination, Navigation, Autoplay]}
      >
        {FantasyMovie?.results?.slice(1, 20)?.map((item)=> (
            <SwiperSlide key={item.id} className='w-[90%]'>
                <Link onClick={()=>dispatch(getSingleMovie({ id:  item.id}))} to={`movie/${item.title}`}>
                    <div className={` w-full cursor-pointer flex mm:flex-col lg:flex-row gap-5 justify-center items-center ${screenMode==="light"?'border':''}`}>
                        <div className='w-[50%] flex flex-col gap-5 p-5'>
                            <p className='text-[25px] uppercase font-bold'> {item.title} </p>
                            <p className='header-overview'> {item.overview} </p>
                        </div>
                        <div className=' w-50% relative'>
                          <div className="w-[65vw] mm:h-[30vh] sm:h-[35vh] md:h-[40vh] lg:h-[70vh] bg-cover bg-center rounded-[20px]" style={{ backgroundImage: `url('https://image.tmdb.org/t/p/original${item.backdrop_path}')` }}>
                            <div className={`${screenMode==='light'?'img-blur-style-1':'img-blur-style-2'}`}></div>
                          </div>
                        </div>
                    </div>
                </Link>
            </SwiperSlide>

        ))}
      </Swiper>
    </>
  )
}

export default HomeHeaderCarousel
