import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css/navigation';

const Shimmer = () => {
    let arr = ['a','b','a','b','a','b','a','b','a','b'];
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
        {arr.map((item, index) => (
          <SwiperSlide key={index + Math.floor(Math.random())} className="w-[90%]">
            <div className='w-[250px] h-[150px] bg-gray-400'>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default Shimmer
