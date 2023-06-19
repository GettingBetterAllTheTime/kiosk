import React, { useContext, useRef } from 'react';
import './Leave.css';
import axios from 'axios';
import { MyContext } from "../../App";

const Leave = ({ handleShowModal }) => {
    const phoneNumber = useRef();
    const password = useRef();
    const {
        setIsLoggedIn
    } = useContext(MyContext);

    const handleCheckout = () => {
        if (phoneNumber.current.value.length < 11 || password.current.value.length < 4) {
            if (phoneNumber.current.value.length < 11) {
                phoneNumber.current.focus();
            } else {
                password.current.focus();
            }
        } else {
            const userData = {
                phoneInputValue: phoneNumber.current.value,
                password: password.current.value,
            };

            axios.post("/api/leave", { userData })
                .then(response => {
                    // 성공적인 응답 처리
                    setIsLoggedIn(false);
                    handleShowModal();
                    console.log('퇴실처리되었습니다.');
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
    }

    return (
        <div className='Leave'>
            <div className='Leave_innerbox'>
                <h4 className='Leave_innerbox_header'>퇴실처리</h4>
                <div className='Leave_innnerbox_content'>
                    <p>휴대폰 번호를 입력해주세요.</p>
                    <input
                        ref={phoneNumber}
                        type="text"
                        placeholder="휴대폰 번호를 입력해주세요."
                    />
                    <p>비밀번호를 입력해주세요.</p>
                    <input
                        ref={password}
                        type="password"
                        placeholder="비밀번호를 입력해주세요."
                    />
                    <div className='Leave_innnerbox_content_btns'>
                        <button
                            className='Leave_innnerbox_content_btns_btn'
                            onClick={handleCheckout}>퇴실처리
                        </button>
                        <button
                            className='Leave_innnerbox_content_btns_btn'
                            onClick={handleShowModal}>닫기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Leave;