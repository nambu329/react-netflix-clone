import { Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Nav from './components/Nav';
import MainPage from './pages/MainPage';
import SearchPage from './pages/SearchPage';
import DetailPage from './pages/DetailPage';

//네비게이션, footer를 위한 설정
const Layout = () => {
  return(
    <div>
      <Nav/>

      <Outlet/>{/* 라우터에 연결되는 자식 컴포넌트들이 올 자리 */}

      <Footer/>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout/>}> {/** 중복라우팅 */}
          <Route index element={<MainPage/>}/>
          <Route path=':movieId' element={<DetailPage/>}/>
          <Route path='search' element={<SearchPage/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
