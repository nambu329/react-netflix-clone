import axios from '../api/axios';
import React, { useEffect, useState } from 'react'
import "./Row.css"
import MovieModal from './MovieModal';
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

//app.js에 만든 props를 받아서 사용
export default function Row({isLargeRow, title, id, fetchUrl}) {

    const [movies, setMovies] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [movieSelected, setMovieSelected] = useState([]);

    //영화 클릭시 상세정보 modal 호출 클릭이벤트
    const handleClick = (movie) => {
        setModalOpen(true);
        setMovieSelected(movie);
    }

    //랜더링 이후 최초 한번만 작동
    useEffect(() => {
        fetchMovieData();
    }, [])

    //비동기 요청
    const fetchMovieData = async () => {
        //App.js에 있는 fetchUrl 속성의 value를 가져온다.
        const request = await axios.get(fetchUrl);        
        //console.log("fetchUrl :::: ", request);
        setMovies(request.data.results);
    }

  return (
    <section className='row'>
        <h2>{title}</h2>
        <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50} //각 객체당 간격
        slidesPerView={5} //한 슬라이드당 보여줄 객체수
        navigation
        loop={true} //끝에 갔을때 처음으로 돌아갈 수 있게 하는 옵션 여부
        pagination={{ clickable: true }} //페이징 버튼 표출유무
        scrollbar={{ draggable: true }} //슬라이드 스크롤바 표출 유무
        onSwiper={(swiper) => console.log(swiper)} //swiper 콜백처리 옵션
        onSlideChange={() => console.log('slide change')} //슬라이드시 필요한 함수를 넣을때 쓰는 기능
        breakpoints={{ //브라우저가 일정 크기에 도달할때 적용되는 시점을 잡는 옵션
            1378: {
                slidesPerView: 6,
                slidesPerGroup: 6, 
            },
            998: {
                slidesPerView: 5,
                slidesPerGroup: 5,
            },
            625: {
                slidesPerView: 4,
                slidesPerGroup: 4,
            },
            0: {
                slidesPerView: 3,
                slidesPerGroup: 3,
            }
        }}
        >
            <div id={id} className='row_posters'>
                {movies.map(movie => (
                    <SwiperSlide>
                    <img
                        key={movie.id}
                        className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                        src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                        alt={movie.name}
                        onClick={() => handleClick(movie)} /* 클릭시 상세정보 modal 띄위기 위한 이벤트 */
                    />
                    </SwiperSlide>                                        
                ))}
            </div>
        </Swiper>

        {
            //
            modalOpen && (<MovieModal {...movieSelected} setModalOpen={setModalOpen}/>)
        }
    </section>
  )
}