import React, { useState } from "react";
import CardList from './CardList';
import logo from './pipedrive.svg'
import "./App.css";

const App = () => {

    const [show, setShow] = useState(false);

    const openModalHandler = () => setShow(true)

    const closeModalHandler = () => setShow(false)

    return (
        <div className="app">
            <header className="appHeader">
            <img src={logo} alt="" className="logo"/>
            </header>
            <div id="InfoCard" className={show ? 'show' : 'hide'}></div>
            { show ? <div onClick={closeModalHandler} className="backgroundCover">
            </div> : null}
                <h1 className="mainTitle">People's List</h1>
            <div className="peoplesList">
                <CardList show={show} close={closeModalHandler} open={openModalHandler} />
            </div>
        </div>
    );

}
export default App;