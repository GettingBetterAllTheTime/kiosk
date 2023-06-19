import React, { useContext, useEffect, useState } from 'react'
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer'
import { useLocation, useNavigate } from 'react-router-dom'
import './EntranceResult.css';
import axios from 'axios';
import { MyContext } from '../../App';
import Nav from '../../Components/Nav/Nav';

function EntranceResult() {
    const { userType, setUserType } = useContext(MyContext);
    const navigate = useNavigate();
    const location = useLocation();
    const selectedSeatNumber = location.state.selectedSeatNumber;
    // const userType = location.state.userType;
    // const setUserType = location.state.setUserType;
    const startTime = location.state.startTime;
    const time = location.state.time;
    const period = location.state.period;

    console.log(`selectedSeatNumber:${selectedSeatNumber}, userType:${userType}, setUserType:${setUserType}, startTime:${startTime}, time:${time}, period:${period}`);

    const [currentDate] = useState(new Date(startTime));
    const { setIsLoggedIn } = useContext(MyContext);

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

    useEffect(() => {
        // EntranceResult가 마운트된 후, 이용시간을 서버로 전송하고 몽고DB에 저장
        const hours = Number(time.replace('시간', ''));
        var formattedEndDateTime;
        const startDateTime = new Date();
        const formattedStartDateTime = formatDateTime(startDateTime);
        if (time) {
            const endDateTime = new Date(currentDate.getTime() + hours * 60 * 60 * 1000);
            formattedEndDateTime = formatDateTime(endDateTime);
        } else {
            const periods = Number(period.replace('주', ''));
            const endDatePeriod = new Date(currentDate.getTime() + periods * 7 * 24 * 60 * 60 * 1000);
            formattedEndDateTime = formatDateTime(endDatePeriod);
        }

        axios.post("/api/saveEntranceResult", {
            startTime: formattedStartDateTime,
            endTime: formattedEndDateTime
        })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const formatDateTime = (dateTime) => {
        const year = dateTime.getFullYear();
        const month = String(dateTime.getMonth() + 1).padStart(2, '0');
        const day = String(dateTime.getDate()).padStart(2, '0');
        const hours = String(dateTime.getHours()).padStart(2, '0');
        const minutes = String(dateTime.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    };

    const formatDateTimeRange = (startDateTime, endDateTime) => {
        const formattedStart = formatDateTime(startDateTime);
        const formattedEnd = formatDateTime(endDateTime);
        return `${formattedStart} ~ ${formattedEnd}`;
    };

    const formatCurrentDateTimeRange = () => {

        const startDateTime = currentDate;
        let endDateTime;
        console.log(time, period, endDateTime);
        if (time) { // 시간권인 경우
            const hours = Number(time.replace('시간', ''));
            endDateTime = new Date(currentDate.getTime() + hours * 60 * 60 * 1000);
        } else if (period) { // 기간권인 경우
            const periods = Number(period.replace('주', ''));
            endDateTime = new Date(currentDate.getTime() + periods * 7 * 24 * 60 * 60 * 1000);
        } else {
            return ""; // time과 period가 모두 없을 경우 빈 문자열 반환
        }

        return formatDateTimeRange(startDateTime, endDateTime);
    };


    return (
        <div className='EntranceResult'>
            <Header />
            <Nav/>
            <h3 className='EntranceResult_h3'>입실결과</h3>
            <div className='EntranceResult_content'>
                <p>{`이용구분 : ${userType == '기간권' ? '기간권' : '시간권'}`}</p>
                <p>{`좌석번호 : ${selectedSeatNumber}`}</p>
                <p>{`이용시간 : ${formatCurrentDateTimeRange()}`}</p>
            </div>
            <p className='EntranceResult_msg'>정상처리 되었습니다.</p>
            <div className='EntranceResult_btn'>
                <button onClick={handleLogoutClick}>로그아웃</button>
            </div>
            <Footer />
        </div>
    )
}

export default EntranceResult