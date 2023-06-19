import React, {  useRef, useContext } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { MyContext } from "../../App";
import axios from 'axios';

const Login = () => {
    const {
        setUserInfo,
        setShowKeyBoard,
        phoneInputValue,
        setPhoneInputValue,
        passwordInputValue,
        setPasswordInputValue,
        setFocusPoint,
        setIsLoggedIn
    } = useContext(MyContext);

    const phoneInputRef = useRef();
    const passwordInputRef = useRef();
    const navigate = useNavigate();

    const handleInputClick = (e) => {
        setShowKeyBoard(true);
        if (e.target.name === "phone") {
            setFocusPoint(0);
        } else if (e.target.name === "password") {
            setFocusPoint(1);
        }
    }

    const handleInputChange = (e) => {
        if (e.target.name === "phone" ) {
            setPhoneInputValue(e.target.value);
        } else if (e.target.name === "password" ) {
            setPasswordInputValue(e.target.value);
        }
    };

    const handleLogin = () => {
        // if (phoneInputValue.length < 11 || passwordInputValue.length < 4) {
        //     phoneInputRef.current.focus();
        // } else {

        let loginInfo = {
            'phone': phoneInputValue,
            'password': passwordInputValue,
        }

        axios.post("/api/login", loginInfo)
            .then(response => {
                // 성공적인 응답 처리
                console.log(response.data.user); // 서버에서 전달한 사용자 정보
                console.log(response.data.data); // "로그인 완료됐습니다."
                if (response.data.data === "로그인 완료됐습니다.") {
                    setUserInfo(response.data.user); // user 객체에 MongoDB에서 가져온 사용자 정보가 들어있다고 가정
                    setIsLoggedIn(true);

                    // 몽고DB document 업데이트 요청 보내기
                    axios.post("/api/updateLoggedInStatus", { userId: response.data.user.id })
                        .then(updateResponse => {
                            console.log(updateResponse.data); // 업데이트 완료 메시지 출력
                            navigate("/onLog");

                        })
                        .catch(updateError => {
                            console.log(updateError); // 업데이트 실패 시 에러 처리
                        });
                } else {
                    console.log(response.data);
                }
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
        setPhoneInputValue("");
        setPasswordInputValue("");
        setShowKeyBoard(false);
        // };
    }



    return (
        <div className="Login">
            <div className="login_input">
                <input
                    type="text"
                    placeholder="휴대폰번호를 입력해주세요."
                    onClick={handleInputClick}
                    onChange={handleInputChange}
                    value={phoneInputValue}
                    ref={phoneInputRef}
                    name="phone"
                />
                <input
                    type="password"
                    placeholder="비밀번호를 입력해주세요."
                    onClick={handleInputClick}
                    onChange={handleInputChange}
                    value={passwordInputValue}
                    ref={passwordInputRef}
                    name="password"
                />
            </div>
            <button type="submit" className="login_btn" onClick={handleLogin}>
                로그인 Login
            </button>
            {/* {showKeyBoard &&
                <KeyBoard
                    setPhoneInputValue={setPhoneInputValue}
                    setPasswordInputValue={setPasswordInputValue}
                    setShowKeyBoard={setShowKeyBoard}
                    focusPoint={focusPoint} />
            } */}
        </div>
    );
};

export default Login;