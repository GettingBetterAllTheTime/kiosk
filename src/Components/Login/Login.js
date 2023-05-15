import React, { useState, useRef, useContext } from 'react';
import './Login.css';
import KeyBoard from '../KeyBoard/KeyBoard';
import OnLog from '../../Pages/OnLog/OnLog';
import { useNavigate } from 'react-router-dom';
import { MyContext } from "../../App";

function changeDate(data) {
    if (data < 10) {
        data = "0" + data;
    }
    return data;
}
const Login = () => {
    const [showKeyBoard, setShowKeyBoard] = useState(false);
    const [phoneInputValue, setPhoneInputValue] = useState('');
    const [passwordInputValue, setPasswordInputValue] = useState('');
    const [focusPoint, setFocusPoint] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { userInfo, setUserInfo } = useContext(MyContext);

    const phoneInputRef = useRef();
    const passwordInputRef = useRef();

    const navigate = useNavigate();

    const handlePhoneInputClick = () => {
        setShowKeyBoard(true);
        setFocusPoint(0);
    };

    const handlePasswordInputClick = () => {
        setShowKeyBoard(true);
        setFocusPoint(1);
    };

    const handlePhoneInputChange = (event) => {
        setPhoneInputValue(event.target.value);
    };

    const handlePasswordInputChange = (event) => {
        setPasswordInputValue(event.target.value);
    };

    const handleLoginClick = () => {
        if (phoneInputValue.length < 11) {
            phoneInputRef.current.focus();
        } else if (passwordInputValue.length < 4) {
            passwordInputRef.current.focus();
        } else {
            if (phoneInputValue == "01050512809" && passwordInputValue == "0000") {
                console.log(`핸드폰번호는 ${phoneInputValue} 비밀번호는 ${passwordInputValue} 입니다.`);
                setIsLoggedIn(true);

                userInfo.id = phoneInputValue;
                userInfo.username = "연수흠";
                userInfo.hp = phoneInputValue;
                //최근 기간권이용자 : 기간 사용 가능
                //최근 기간권이용자 : 기간 만료
                //최근 시간권이용자 : 시간 이용 가능
                //최근 시간권이용자 : 시간 만료
                //최초 사용자.

                // 기간권유저
                userInfo.userType.termType = "G";
                userInfo.userType.period = "20230501-20230630";
                //시간권유저
                // userInfo.userType.termType = "T";
                // userInfo.userType.period = "20230501-20230630";

                let currentDate = new Date();
                let year = currentDate.getFullYear();  // 년도
                let month = currentDate.getMonth() + 1;  // 월 (0부터 시작하므로 1을 더해줍니다.)
                let date = currentDate.getDate();  // 일
                let hours = currentDate.getHours();  // 시간
                let minutes = currentDate.getMinutes();  // 분
                let seconds = currentDate.getSeconds();  // 초

                // 날짜와 시간을 문자열로 변환하여 "-"와 ":"로 구분합니다.

                month = changeDate(month);
                date = changeDate(date);
                hours = changeDate(hours);
                minutes = changeDate(minutes);
                seconds = changeDate(seconds);

                let dateStr = `${year}-${month}-${date}`;
                let timsStr = `${year}-${month}-${date}-${hours}:${minutes}`;

                let result = dateStr.replace(/-|:/g, "");
                console.log(`${year}-${month}-${date} ${hours}:${minutes}:${seconds}`);
                console.log(result);

                if (userInfo.userType.termType == "G") {
                    if (userInfo.userType.period.split("-")[0] <= result && userInfo.userType.period.split("-")[1] >= result) {
                        userInfo.userValid = true;
                        console.log("G : 기간권 멤버입니다.");
                        //기간권이용 버튼 빼고 모두 비활성화
                    } else {
                        userInfo.userValid = false;
                        console.log("G : 기간이 만료되었습니다.");
                    }
                } else if (userInfo.userType.termType == "T") {
                    result = timsStr.replace(/-|:/g, "");
                    if ((userInfo.userType.period.split("-")[0] <= result && userInfo.userType.period.split("-")[1] >= result)) {
                        userInfo.userValid = true;
                        console.log("T : 시간권 멤버입니다.");
                        //시간권이용 버튼 빼고 모두 비활성화
                    }
                    else {
                        userInfo.userValid = false;
                        console.log("T : 시간이 만료되었습니다.");
                    }
                }
                setUserInfo(userInfo);

                navigate("/onLog");
            }
            else {
                alert("아이디 혹은 비밀번호가 틀립니다.")
            }
        };
    }
    return (
        <div className="Login">
            <div className="login_input">
                <input
                    type="text"
                    placeholder="휴대폰번호를 입력해주세요."
                    onClick={handlePhoneInputClick}
                    onChange={handlePhoneInputChange}
                    value={phoneInputValue}
                    ref={phoneInputRef}
                />
                <input
                    type="password"
                    placeholder="비밀번호를 입력해주세요."
                    onClick={handlePasswordInputClick}
                    onChange={handlePasswordInputChange}
                    value={passwordInputValue}
                    ref={passwordInputRef}
                />
            </div>
            <button className="login_btn" onClick={handleLoginClick}>
                로그인 Login
            </button>
            {showKeyBoard && <KeyBoard setPhoneInputValue={setPhoneInputValue} setPasswordInputValue={setPasswordInputValue} setShowKeyBoard={setShowKeyBoard} focusPoint={focusPoint} setFocus={setFocusPoint} />}
            {isLoggedIn && <OnLog />}
        </div>
    );
};

export default Login;