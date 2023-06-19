import Banner from "../../Components/Banner/Banner";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import Seat from "../../Components/Seat/Seat";
import SeatLayoutModal from "../../Components/Modal/SeatLayoutModal";
import './OnLog.css';
import React, { useContext, useEffect, useState, useRef } from "react";
import { MyContext } from "../../App";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const OnLog = () => {
    const {
        modal,
        userInfo,
        isLoggedIn,
        setIsLoggedIn,
        setUserType,
    } = useContext(MyContext);
    // console.log(userInfo);

    useEffect(() => {
        if (isLoggedIn) {
            axios.get("/api/onlog")
                .then(response => {
                    // 성공적인 응답 처리
                    console.log(response);
                    console.log(response.data.user.userType); // 기간권
                    if (response.data.user.userType === "기간권") {
                        setUserType("기간권");
                    } else if (response.data.user.userType === "시간권") {
                        setUserType("시간권");
                    }
                    setIsLoggedIn(true);
                })
                .catch(error => {
                    // 에러 처리
                    if (error.response) {
                        // 서버 응답이 있는 경우
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if (error.request) {
                        // 요청이 전송되었으나 응답이 없는 경우
                        console.log(error.request);
                    } else {
                        // 요청을 설정하는 과정에서 에러가 발생한 경우
                        console.log('Error', error.message);
                    }
                    console.log(error.config);
                });
        }
    }, [isLoggedIn]);

    const [remainingTime, setRemainingTime] = useState(30);
    const navigate = useNavigate();

    const handleSelectSeat = () => {
        navigate('/selectseat')
    }
    const handleBuyTime = () => {
        navigate('/BuyTime')
    }

    const handleBuyPeriod = () => {
        navigate('/BuyPeriod')
    }

    const handleAddTime = () => {
        if (userInfo.userType === "기간권") {
            handleBuyPeriod();
        } else if (userInfo.userType === "시간권") {
            handleBuyTime();
        }
    }

    const handleLogoutClick = () => {
        console.log("로그아웃 클릭됨!");

        axios.get("/api/logout").then(response => {
            // 성공적인 응답 처리
            console.log(response);
            setIsLoggedIn(false);
            navigate("/", { replace: true });
        }).catch(error => {
            // 에러 처리
            if (error.response) {
                // 서버 응답이 있는 경우
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // 요청이 전송되었으나 응답이 없는 경우
                console.log(error.request);
            } else {
                // 요청을 설정하는 과정에서 에러가 발생한 경우
                console.log('Error', error.message);
            }
            console.log(error.config);
        });
    }


    const intervalRef = useRef();

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setRemainingTime(prevTime => prevTime - 1);
        }, 1000);
        return () => clearInterval(intervalRef.current);
    }, []);

    useEffect(() => {
        if (remainingTime === 0) {
            clearInterval(intervalRef.current);
            navigate('/');
        }
    }, [remainingTime, navigate]);

    if (remainingTime === 0) {
        return null;
    }

    const handleMyInfo = () => {
        navigate('/MyInfo')
    }

    return (
        <div className="OnLog">
            <Header />
            <Banner />
            <Seat />
            <div>
                <p className="welcome_msg">{userInfo.name}회원님 환영합니다. 원하시는 서비스를 선택해 주세요.</p>
                <div className="buyAndUse">

                    {/* 시간권이용 */}
                    <button
                        className="use_time"
                        disabled={userInfo.userType === "기간권" || userInfo.userType === ""}
                        onClick={handleSelectSeat}
                    >
                        <img
                            src={process.env.PUBLIC_URL + "/img/use_time.png"}
                            alt="시간권이용"
                        />
                        시간권이용
                    </button>

                    {/* 기간권이용 */}
                    <button
                        className="use_period"
                        disabled={userInfo.userType === "시간권" || userInfo.userType === ""}
                        onClick={handleSelectSeat}
                    >
                        <img
                            src={process.env.PUBLIC_URL + "/img/use_period.png"}
                            alt="기간권이용"
                        />
                        기간권이용
                    </button>

                    {/* 시간권구입 */}
                    <button
                        className="buy_time"
                        onClick={handleBuyTime}
                        disabled={userInfo.userValid == true}
                    >
                        <img
                            src={process.env.PUBLIC_URL + "/img/buy_time.png"}
                            alt="시간권구입"
                        />
                        시간권구입
                    </button>

                    {/* 기간권구입 */}
                    <button
                        className="buy_period"
                        onClick={handleBuyPeriod}
                        disabled={userInfo.userValid == true}
                    >
                        <img
                            src={process.env.PUBLIC_URL + "/img/buy_period.png"}
                            alt="기간권구입"
                        />
                        기간권구입
                    </button>

                </div>
            </div>
            <div className="User_ico">
                <button id="move" onClick={handleSelectSeat}>좌석이동</button>
                <button onClick={handleAddTime}>이용시간연장</button>
                <button onClick={handleMyInfo}>내정보</button>
            </div>
            <div className="logout">
                <button onClick={handleLogoutClick}>
                    <div className="logout-content">
                        <img src={process.env.PUBLIC_URL + '/img/logout.png'} alt="로그아웃"/>
                        {`로그아웃 (${userInfo.name})`}
                        <img src={process.env.PUBLIC_URL + '/img/remainingTime.png'} alt="남은시간"/>
                        {remainingTime}초
                    </div>
                </button>
            </div>
            <Footer />
            {modal === true ? <SeatLayoutModal /> : null}
        </div>
    )
}

export default OnLog;