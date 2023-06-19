import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Nav from "../../Components/Nav/Nav";
import Footer from "../../Components/Footer/Footer";
import './Join.css';
import { useContext, useRef, useState } from "react";
import { MyContext } from "../../App";
import axios from 'axios';
import CertNum from "../../Components/Modal/CertNum";

function Join() {
    const navigate = useNavigate();
    const [gender, setGender] = useState("");
    const [certNum, setCertNum] = useState("");
    const [userName, setUserName] = useState("");
    const [birthInput, setBirthInput] = useState("");
    const [sendNumModal, setSendNumModal] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);
    const {
        setFocusPoint,
        phoneInputValue,
        setPhoneInputValue,
        passwordInputValue,
        setPasswordInputValue,
        confirmPasswordInputValue,
        setConfirmPasswordInputValue,
    } = useContext(MyContext);
    const phoneInputRef = useRef();
    const certNumRef = useRef();
    const passwordInputRef = useRef();
    const confirmPasswordInputRef = useRef();
    const birthInputRef = useRef();
    const nameRef = useRef();

    const goPrevPage = () => {
        navigate('/', { replace: true });
    }

    const handleSendNumber = (e) => {
        e.preventDefault();
        setSendNumModal(true);
    };

    const handleConfirmModal = (e) => {
        e.preventDefault();
        setConfirmModal(true);
    }

    const handleInputClick = (e) => {
        if (e.target.name === "phone") {
            setFocusPoint(0);
        } else if (e.target.name === "certificationNumber") {
            setFocusPoint(1);
        } else if (e.target.name === "password") {
            setFocusPoint(2);
        } else if (e.target.name === "cofirmpassword") {
            setFocusPoint(3);
        } else if (e.target.name === "username") {
            setFocusPoint(4);
        } else if (e.target.name === "birth") {
            setFocusPoint(5);
        }
    };

    const handleInputChange = (e) => {
        if (e.target.name === "phone") {
            setPhoneInputValue(e.target.value);
        } else if (e.target.name === "certificationNumber") {
            setCertNum(e.target.value);
        } else if (e.target.name === "password") {
            setPasswordInputValue(e.target.value);
        } else if (e.target.name === "cofirmpassword") {
            setConfirmPasswordInputValue(e.target.value);
        } else if (e.target.name === "username") {
            setUserName(e.target.value);
        } else if (e.target.name === "birth") {
            setBirthInput(e.target.value);
        } else if (e.target.name === "gender") {
            setGender(e.target.value);
        }
    };

    const signUpComplete = () => {

        let form = {
            'phone': phoneInputValue,
            'password': passwordInputValue,
            'userName': userName,
            'birth': birthInput,
            'gender': gender,
            'isLoggedIn': false,
            'userValid': false,
            'userType': "",
            'price': "",
            'time': "",
            'period': "",
            'seatChoice': false,
            'seat': "",
            'isAvailable': true,
            'startTime': "",
            'endTime': "",
            'totalUseTime': "",
            'paymentDate': "",
            'paymentType': "",
        }

        axios.post("/api/join", form)
            .then(response => {
                // 성공적인 응답 처리
                console.log(response);
                navigate("/");
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
                alert('이미 등록된 사용자입니다.')
            });
    }

    const handleSignup = (e) => {
        e.preventDefault();
        if (phoneInputValue.length < 11) {
            phoneInputRef.current.focus();
        }
        // else if (certNum.length < 6) {
        //     certNumRef.current.focus();
        // }
        else if (passwordInputValue.length < 4) {
            passwordInputRef.current.focus();
        } else if (confirmPasswordInputValue.length < 4) {
            confirmPasswordInputRef.current.focus();
        } else if (userName.length < 2) {
            nameRef.current.focus();
        } else if (birthInput.length < 8) {
            birthInputRef.current.focus();
        } else {
            signUpComplete();
            setPhoneInputValue("");
            setPasswordInputValue("");
            setConfirmPasswordInputValue("");
        }
    }

    return (
        <form>
            <div className="Join">
                {sendNumModal && <CertNum content={<>
                    휴대폰번호로 인증번호가 전송되었습니다.<br />
                    확인 후 인증번호를 입력해주세요.
                </>} setSendNumModal={setSendNumModal} />}
                {confirmModal && <CertNum content={"인증처리되었습니다."} setConfirmModal={setConfirmModal} />}
                <Header />
                <Nav />
                <h3>회원가입</h3>
                <div className='Join_inputs'>
                    <div className='Join_input'>
                        <input
                            type="text"
                            placeholder="휴대폰번호를 입력해주세요."
                            onClick={handleInputClick}
                            onChange={handleInputChange}
                            value={phoneInputValue}
                            ref={phoneInputRef}
                            name="phone"
                        />
                        <button onClick={handleSendNumber}>인증번호발송</button>
                    </div>
                    <div className='Join_input'>
                        <input
                            type="text"
                            placeholder="인증번호 입력"
                            onClick={handleInputClick}
                            onChange={handleInputChange}
                            value={certNum}
                            ref={certNumRef}
                            name="certificationNumber"
                        />
                        <button onClick={handleConfirmModal}>확인</button>
                    </div>
                    <div className='Join_input pw'>
                        <input
                            type="password"
                            placeholder="비밀번호 입력 (숫자4자리)"
                            onClick={handleInputClick}
                            onChange={handleInputChange}
                            value={passwordInputValue}
                            ref={passwordInputRef}
                            name="password"
                        />
                        <input
                            type="password"
                            placeholder="비밀번호 확인"
                            onClick={handleInputClick}
                            onChange={handleInputChange}
                            value={confirmPasswordInputValue}
                            ref={confirmPasswordInputRef}
                            name="cofirmpassword"
                        />
                    </div>
                    <div className='Join_input'>
                        <input
                            type="text"
                            placeholder="이름을 입력해주세요."
                            onClick={handleInputClick}
                            onChange={handleInputChange}
                            value={userName}
                            ref={nameRef}
                            name="username"
                        />
                    </div>
                    <div className='Join_input'>
                        <input
                            type="text"
                            placeholder="생년월일을 입력해주세요 (EX:19950705)"
                            onClick={handleInputClick}
                            onChange={handleInputChange}
                            value={birthInput}
                            ref={birthInputRef}
                            name="birth"
                        />
                    </div>
                    <div className="gender_select">
                        <span>성별:</span>
                        <label className="radioLabel">
                            <input
                                type="radio"
                                name="gender"
                                value="male"
                                checked={gender === "male"}
                                onChange={handleInputChange}
                            />
                            <span className="radioText">남자</span>
                        </label>
                        <label className="radioLabel">
                            <input
                                type="radio"
                                name="gender"
                                value="female"
                                checked={gender === "female"}
                                onChange={handleInputChange}
                            />
                            <span className="radioText">여자</span>
                        </label>
                    </div>
                </div>
                <div className='prevNextBtn'>
                    <button
                        onClick={goPrevPage}>이전</button>
                    <button
                        type="submit"
                        disabled={passwordInputValue !== confirmPasswordInputValue}
                        onClick={handleSignup}>가입완료
                    </button>
                </div>

                <Footer />
            </div>
        </form>
    );
}

export default Join;