import React, { useState } from 'react'
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import axios from '../../api/axios'
import "./SearchPage.css"
import { useDebounce } from '../../hooks/useDebounce';

export default function SearchPage() {
  const navigate = useNavigate();

  //console.log('useLocation() : ', useLocation());

  const [searchResults, setSearchResults] = useState([]);

  const useQuery = () => {    
    return new URLSearchParams(useLocation().search);
  }

  let query = useQuery();
  //쿼리스트링에서 키로 value를 찾으려할때 씀.(?q=123123 에서 q)
  //실제 검색어를 추출
  //const searchTerm = query.get("q");
  //console.log(searchTerm);
  
  //커스텀 useDebounce hook으로 전환
  const debouncedSearchTerm = useDebounce(query.get("q"), 500);
  
  useEffect(() => {
    if(debouncedSearchTerm) {
      fetchSearchMovie(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm])

  const fetchSearchMovie = async (debouncedSearchTerm) => {
    try {
      const request = await axios.get(
        //얘는 영화 api url이니 신경 x
        `/search/multi?include_adult=false&query=${debouncedSearchTerm}`
      )
      //console.log(request);
      setSearchResults(request.data.results);
    } catch (error) {
      console.log("에러가 났다 에러!!!!!", error);
    }
  }


  const renderSearchResults = () => {
    {/** 해당 결과가 있을때의 return 화면 */}
    return searchResults.length > 0 ? (
      <section className='search-container'>
        {searchResults.map((movie) => {
          if(movie.backdrop_path !== null) {
              const movieImageUrl = "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
              return (
                <div className='movie' key={movie.id}>
                  {/** App.js에 route중 :movieId의 경로인 DetailPage로 이동함 */}
                  <div onClick={() => navigate(`/${movie.id}`)} className='movie_column-poster'>
                      <img
                        src={movieImageUrl} alt="movie image" className='movie_poster'
                      />
                  </div>
                </div>
              )
          }
        })}
      </section>
    ) : ( 
      <section className='no-results'>
          <div className='no-results_text'>
            <p>찾고자 하는 검색어 "{debouncedSearchTerm}"에 맞는 영화가 없습니다.</p>
          </div>
      </section>
    ); {/** 해당 결과가 없을때의 return 화면 */}   
    
  }

  return renderSearchResults();
}
