import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from '../../api/axios'

export default function DetailPage() {
  //const movieId로 {}로 감싸주지 않으면 얘는 객체 취급이라 에러남
  //{}로 감싸줘야 변수처리됨.
  const movieId = useParams();
  console.log('movieId :: ', movieId);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    async function fetchData() {
      //해당 영화 아이디로 영화 정보를 가져오는 api
      const request = await axios.get(
        `/movie/${movieId}`
      );
      console.log('request :: ', request);
      setMovie(request.data);
    }
    fetchData();
    //movieId가 변경될때마다 재호출
  }, [movieId])


  if(!movie) return <div>...영화정보가 없습니다</div>;

  return (
    <section>
      <img className='modal_poster-img'
      src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}//임시로 이미지만 넣음
      alt="poster"
      />
    </section>
  )
}
