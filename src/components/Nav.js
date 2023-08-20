import React, { useEffect, useState } from 'react'
import './Nav.css'
import { useNavigate } from 'react-router-dom';

export default function Nav() {

    const[show, setShow] = useState(false);
    const[searchValue, setSearchValue] = useState("");
    //특정 경로로 보내기 위한 react router dom api
    const navigate = useNavigate();

    useEffect(() => {

        //console.log("addevent");
        window.addEventListener("scroll", () => {
            if(window.scrollY > 50) {
                setShow(true);
            } else {
                setShow(false);
            }
        })

        return () => {
            //console.log('remove event');
            window.removeEventListener("scroll", () => {});
        }

    }, []);


    const handleChange = (e) => {
        setSearchValue(e.target.value);
        //search 컴포넌트에서 해당 변수를 받아가야한다.
        navigate(`/search?q=${e.target.value}`)
    }

  return (
    //<nav className='nav'>
    <nav className={`nav ${show && 'nav_black'}`}>
        <img
            alt='Netflix Logo'
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/170px-Netflix_2015_logo.svg.png'
            className='nav_logo'
            onClick={() => window.location.reload}
        />

        {/** 검색 입력창 */}
        <input value={searchValue} onChange={handleChange} className='nav_input' type='text' placeholder='영화를 검색해주세요'/>

        <img
            alt='User Logged'
            src='https://occ-0-4796-988.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo.png?r=a41'
            className='nav_avatar'
        />
    </nav>
  )
}