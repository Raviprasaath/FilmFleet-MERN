import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Pagination, Navigation } from 'swiper/modules';
import './Carousel.css';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getSingleMovie } from '../../slice/slice';
import dummyImg from "../../assets/horizontal-dummy.jpg"

const Carousel = (props) => {
  const dispatch = useDispatch();
  return (
    <>
      <Swiper
        className="mySwiper h-[220px]"
        slidesPerView={3}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
      >
        {props.props?.results?.slice((Math.floor(Math.random() * 10) + 1), (Math.floor(Math.random() * 10) + 20))?.map((item) => (
          <SwiperSlide key={item.id} className="w-[90%]">
            <Link onClick={() => dispatch(getSingleMovie({ id: item.id }))} to={`/movie/${item.title}`}>
              <div className="my-2 movie-title relatives relative cursor-pointer h-[200px] flex flex-col py-4 hover:scale-[1.07]">
                {item.backdrop_path ? 
                <img className='rounded-md' src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`} alt="img" />
                :<img src={dummyImg} />
                }
                {item.title}
                <div className="detail-hidden">
                  {item.overview}
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Carousel;
