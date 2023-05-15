import Banner from "../../Components/Banner/Banner";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import Seat from "../../Components/Seat/Seat";
import SeatLayoutModal from "../../Components/Modal/SeatLayoutModal";
import './OnLog.css';
import { useContext } from "react";
import { MyContext } from "../../App";

const OnLog = ({ setIsLoggedIn }) => {
    console.log('Onlog has Mounted');
    const { modal, userInfo } = useContext(MyContext);

    return (
        <div className="OnLog">
            <Header />
            <Banner />
            <Seat />
            <div>
                <p className="welcome_msg">{userInfo.username}회원님 환영합니다. 원하시는 서비스를 선택해 주세요.</p>
                <div className="buyAndUse">
                    {!userInfo.userValid && userInfo.userType.termType === "G" && (
                        <>
                            <button className="use_time" disabled>
                                <img src={process.env.PUBLIC_URL + '/img/use_time.png'} />시간권이용
                            </button>
                            <button className="use_period" disabled>
                                <img src={process.env.PUBLIC_URL + '/img/use_period.png'} />기간권이용
                            </button>
                            <button className="buy_time">
                                <img src={process.env.PUBLIC_URL + '/img/buy_time.png'} />시간권구입
                            </button>
                            <button className="buy_period">
                                <img src={process.env.PUBLIC_URL + '/img/buy_period.png'} />기간권구입
                            </button>
                        </>
                    )}
                    {!userInfo.userValid && userInfo.userType.termType === "T" && (
                        <>
                            <button className="use_time" disabled>
                                <img src={process.env.PUBLIC_URL + '/img/use_time.png'} />시간권이용
                            </button>
                            <button className="use_period" disabled>
                                <img src={process.env.PUBLIC_URL + '/img/use_period.png'} />기간권이용
                            </button>
                            <button className="buy_time">
                                <img src={process.env.PUBLIC_URL + '/img/buy_time.png'} />시간권구입
                            </button>
                            <button className="buy_period">
                                <img src={process.env.PUBLIC_URL + '/img/buy_period.png'} />기간권구입
                            </button>
                        </>
                    )}
                    {userInfo.userValid && userInfo.userType.termType === "T" && (
                        <>
                            <button className="use_time">
                                <img src={process.env.PUBLIC_URL + '/img/use_time.png'} />시간권이용
                            </button>
                            <button className="use_period" disabled>
                                <img src={process.env.PUBLIC_URL + '/img/use_period.png'} />기간권이용
                            </button>
                            <button className="buy_time" disabled>
                                <img src={process.env.PUBLIC_URL + '/img/buy_time.png'} />시간권구입
                            </button>
                            <button className="buy_period" disabled>
                                <img src={process.env.PUBLIC_URL + '/img/buy_period.png'} />기간권구입
                            </button>
                        </>
                    )}
                    {userInfo.userValid && userInfo.userType.termType === "G" && (
                        <>
                            <button className="use_time" disabled>
                                <img src={process.env.PUBLIC_URL + '/img/use_time.png'} />시간권이용
                            </button>
                            <button className="use_period">
                                <img src={process.env.PUBLIC_URL + '/img/use_period.png'} />기간권이용
                            </button>
                            <button className="buy_time" disabled>
                                <img src={process.env.PUBLIC_URL + '/img/buy_time.png'} />시간권구입
                            </button>
                            <button className="buy_period" disabled>
                                <img src={process.env.PUBLIC_URL + '/img/buy_period.png'} />기간권구입
                            </button>
                        </>
                    )}
                </div>
            </div>
            <div className="User_ico">
                <button id="move">좌석이동</button>
                <button>이용시간연장</button>
                <button>내정보</button>
            </div>
            <div className='logout'>
                <button>로그아웃</button>
            </div>
            <Footer />
            {modal === true ? <SeatLayoutModal /> : null}
        </div>
    )
}

export default OnLog;