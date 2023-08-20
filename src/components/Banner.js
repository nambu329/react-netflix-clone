import axios from '../api/axios';
import React, { useState, useEffect } from 'react'
import requests from '../api/requests';
import './Banner.css'
import { styled } from 'styled-components';

export default function Banner() {

    //안에 배열을 담을 예정이므로 초기화를 빈 배열로 함.
    const [movie, setMovie] = useState([]);

    //초기값을 false로 함
    const [isClicked, setIsClicked] = useState(false);

    //최초 랜더링시에 동작. onload와 같은 역할
    useEffect(() => {
        fetchData();
    }, []);

    //비동기 요청을 위한 async, 완료가 되고나서 오도록 await를 추가
    //await을 빼면 기다리지 않고 가져오기 때문에 pending상태가 됨.
    const fetchData = async () => {
        //현재 상영중인 영화 정보 가져오기
        const request = await axios.get(requests.fetchNowPlaying);
        //console.log(request);

        //여러 영화중 랜덤한 영화를 하나 선택(ID)
        const movieId = request.data.results[Math.floor(Math.random() * request.data.results.length)].id;
        //console.log("movieId ::: " + movieId);

        //특정 영화의 상세정보 가져오기
        //const results = await axios.get(`movie/${movieId}`, {params: {append_to_response: "videos"}})
        const {data : movieDetail} = await axios.get(`movie/${movieId}`, {params: {append_to_response: "videos"}})
        //console.log("results ::: " + results);
        //console.log("movieDetail ::: " + movieDetail);
        setMovie(movieDetail);
    }
    
    const truncate = (str, n) => {
        //? : ?앞의 변수(str)가 있다면 length를 처리함.
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    //console.log(movie);
    if(!isClicked) {
        return (
            <header
                className="banner"
                style={{
                    backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
                    backgroundPosition: "top center",
                    backgroundSize: "cover",
                }}
            >
                <div className="banner__contents">
                    <h1 className="banner__title">
                        {movie.title || movie.name || movie.original_name}
                    </h1>
        
                <div className="banner__buttons">
                    <button className="banner__button play" onClick={() => setIsClicked(true)}>Play</button>
                    <button className="banner__button info">More Information</button>
                </div>
        
                    <h1 className="banner__description">
                        {truncate(movie.overview, 100)}
                    </h1>
                </div>
                <div className="banner--fadeBottom" />
            </header>
          )
    } else {
        return (
            <Container>
                <HomeContainer>
                    <Iframe
                        src={`https://www.youtube.com/embed/${movie.videos.results[0].key}
                        ?controls=0&autoplay=&loop=1&mute&playlist=${movie.videos.results[0].key}`}
                        width="640"
                        height="360"
                        framborder="0"
                        allow="autoplay; fullscreen"
                    ></Iframe>
                </HomeContainer>
            </Container>
        )
    }
}

//styled component
//컴포넌트는 대문자로 시작
const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100vh;
`

const HomeContainer = styled.div`
    width: 100%;
    height: 100%;
`

const Iframe = styled.iframe`
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.65;
    border: none;

    &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
`