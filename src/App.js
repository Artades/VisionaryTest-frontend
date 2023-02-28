import './App.css';
import React from 'react';
import {Route, Routes} from "react-router-dom";
import Login from '../src/pages/Login'
import Register from '../src/pages/Register'
import {useDispatch} from "react-redux";
import {fetchAuthMe} from "./redux/slices/auth";
import {useEffect} from "react";
import Home from "./pages/Home";
import CreateImage from "./pages/CreateImage";
import FullImage from "./pages/FullImage";
import MyImages from "./pages/MyImages";
import Settings from "./pages/Settings";


function App() {
    const dispatch = useDispatch();
    // const isAuth = useSelector(selectIsAuth);
    useEffect(() => {
        dispatch(fetchAuthMe());
    }, [dispatch])
    useEffect(() => {
        document.addEventListener('contextmenu', handleContextMenu);
        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
        };
    }, []);

    const handleContextMenu = event => {
        event.preventDefault();
    };
  return (
    <div className="app">
<Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/register" element={<Register/>} />
    <Route path="/home"  element={<Home/>} />
    <Route path="/create-image" element={<CreateImage/>}/>
    <Route path="/home/:id" element={<FullImage/>}/>
    <Route path="/my-images" element={<MyImages/>}/>
    <Route path="/settings" element={<Settings/>}/>
    {/*<Route element={<NotFound/>}></Route>*/}

</Routes>
    </div>
  );
}

export default App;
