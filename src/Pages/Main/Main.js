import React, { useContext } from "react";
import "./Main.css";
import Header from '../../Components/Header/Header';
import Banner from "../../Components/Banner/Banner";
import Seat from "../../Components/Seat/Seat";
import Login from "../../Components/Login/Login";
import Notice from "../../Components/Notice/Notice";
import Footer from "../../Components/Footer/Footer";
import User from "../../Components/User/User";
import SeatLayoutModal from "../../Components/Modal/SeatLayoutModal";
import { MyContext } from "../../App";

const Main = () => {
    const { modal } = useContext(MyContext);

    return (
        <div className="Main">
            {modal === true ? <SeatLayoutModal /> : null}
            <Header />
            <Banner />
            <Seat />
            <Login />
            <User />
            <Notice />
            <Footer />
        </div>
    );
}
export default Main;