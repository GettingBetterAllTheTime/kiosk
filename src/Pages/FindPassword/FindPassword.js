import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Nav from "../../Components/Nav/Nav";
import Footer from "../../Components/Footer/Footer";
import './FindPassword.css';
import { useContext, useRef, useState } from "react";
import axios from "axios";
import { MyContext } from "../../App";


const FindPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [certNum, setCertNum] = useState("");
    const navigate = useNavigate();
    const {
        phoneInputValue,
        setPhoneInputValue,

    } = useContext(MyContext);

    const phoneInputRef = useRef();
    const certNumRef = useRef();
    const newPasswordInputRef = useRef();
    const confirmNewPasswordInputRef = useRef();

    const handleHomeClick = () => {
        navigate('/');
    }

    const test = () => {
        axios
            .post('/api/password', { newPassword })
            .then((response) => {
                // 성공적인 응답 처리
                navigate('/');
            })
            .catch((error) => {
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


    const handleChangeComplete = (e) => {
        e.preventDefault();
        if (phoneInputValue.length < 11) {
            phoneInputRef.current.focus();
        } else if (certNum.length < 6) {
            certNumRef.current.focus();
        } else if (newPassword.length < 4) {
            newPasswordInputRef.current.focus();
        } else if (confirmNewPassword.length < 4) {
            confirmNewPasswordInputRef.current.focus();
        } else {
            test();
            setPhoneInputValue("");
            setNewPassword("");
            setConfirmNewPassword("");
        }
    };

    return (
        <>
            <Header />
            <div className='FindPassword'>
                <Nav />
                <h3>비밀번호변경</h3>
                <div className='FindPassword_inputs'>
                    <div className='FindPassword_input'>
                        <input
                            placeholder="휴대폰 번호를 입력해주세요."
                            value={phoneInputValue}
                            ref={phoneInputRef}
                            onChange={(e) => setPhoneInputValue(e.target.value)}
                        />
                        <button>인증번호발송</button>
                    </div>
                    <div className='FindPassword_input'>
                        <input
                            value={certNum}
                            ref={certNumRef}
                            placeholder="인증번호 입력"
                            onChange={(e) => setCertNum(e.target.value)}
                        />
                        <button>확인</button>
                    </div>

                    <div className='FindPassword_input'>
                        <input
                            type="password"
                            placeholder="변경하실 비밀번호를 입력해주세요. (숫자4자리)"
                            value={newPassword}
                            ref={newPasswordInputRef}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />

                    </div>
                    <div className='FindPassword_input'>
                        <input
                            type="password"
                            placeholder="변경하실 비밀번호를 다시한번 입력해주세요. (숫자4자리)"
                            value={confirmNewPassword}
                            ref={confirmNewPasswordInputRef}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                        />
                    </div>
                </div>
                <div className='prevNextBtn'>
                    <button
                        onClick={handleHomeClick}>이전
                    </button>
                    <button
                        onClick={handleChangeComplete}>변경완료
                    </button>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default FindPassword;
