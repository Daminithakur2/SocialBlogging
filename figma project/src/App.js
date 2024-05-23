import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import Loginpage from './component/Loginpage';
import Signup from './component/signup';
import Newblog from './component/newblog';
import { useEffect, useState } from 'react';
import Header from './component/header';
import Footer from './component/footer';
import Main from './component/main';
import Updatenew from './component/Updatenew';
// import Profile from './component/profile';
import Forgetpassword from './component/Forgetpassword';
import Setpassword from './component/setpassword';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Fullpage from './component/Fullpage';
import { Provider } from 'react-redux';
import { store } from './Redux/store';
import { Counter } from './component/redux';
import Memo from './memo';
import Home from './Home';
import Userprofile from './component/Userprofile';
import Editprofile from './component/Editprofile';
import Heardernew from './component/heardernew';
import LowerHeader from './component/LowerHeader';
import Lowernew from './component/lowernew';
import Page3 from './component/Page3';
import Allblog from './component/Allblog';
import About from './component/About';



function App1() {
  const location = useLocation()
  const naviagte = useNavigate()
  const [hideNavBar, setHideNavBar] = useState(false)

  const token = localStorage.getItem("token")
  useEffect(() => {
    if (location.pathname === '/' ||
      location.pathname === "/signup" ||
      location.pathname === "/profile" ||
      location.pathname === "/forget" ||
      location.pathname.startsWith("/setpassword") ||
      location.pathname === "/editprofile" ||
      location.pathname === "/hearder" ||
      location.pathname === "/userprofile") {
      setHideNavBar(true)
    } else { setHideNavBar(false) }
  }, [location])
  useEffect(() => {
    if (token) {
      naviagte('/figmas')
    }
  }, [token])
  return (
    <>


      {!hideNavBar && <>
        <Heardernew />
        <Lowernew />
      </>}
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Loginpage></Loginpage>}></Route>
        <Route path='/figmas' element={<Main></Main>}></Route>
        <Route path='/signup' element={<Signup></Signup>}></Route>
        <Route path='/newblog' element={<Newblog></Newblog>}></Route>
        <Route path='/Updatenew/:id' element={<Updatenew></Updatenew>}></Route>
        <Route path='/forget' element={<Forgetpassword></Forgetpassword>}></Route>
        <Route path='/setpassword/:email' element={<Setpassword></Setpassword>}></Route>
        <Route path='/fullpage/:id' element={<Fullpage></Fullpage>}></Route>
        <Route path='/memo' element={<Memo></Memo>}></Route>
        <Route path='/Home' element={<Home></Home>}></Route>
        <Route path='/userprofile' element={<Userprofile></Userprofile>}></Route>
        <Route path='/editprofile' element={<Editprofile></Editprofile>}></Route>
        <Route path='/allblog' element={<Allblog></Allblog>}></Route>
        <Route path='/about' element={<About></About>}></Route>









      </Routes>
      {!hideNavBar && <Footer />}

    </>
  )
}

function App() {
  return (
    // <div className="App">
    <div style={{ height: '100%' }}>
      <Provider store={store}>
        <BrowserRouter>
          <App1></App1>
        </BrowserRouter>
      </Provider>

    </div>
  );
}

export default App;
