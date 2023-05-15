import { useNavigate } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import './FindPassword.css';
import { useEffect, useRef, useState } from "react";

const FindPassword = () => {
    const [remainingTime, setRemainingTime] = useState(30);
    const intervalRef = useRef();
    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate('/');
    }

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

    return (
        <>
            <Header />
            <div className='FindPassword'>
                <div className='FindPassword_nav'>
                    <h3 onClick={handleHomeClick}><img src={process.env.PUBLIC_URL + '/img/tohome.png'} />처음으로</h3>
                    <div><img src={process.env.PUBLIC_URL + '/img/remainingTime.png'} />{remainingTime}</div>
                </div>
                <h3>비밀번호변경</h3>
                <div className='FindPassword_inputs'>
                    <div className='FindPassword_input'>
                        <input
                            placeholder="휴대폰 번호를 입력해주세요." />
                        <button>인증번호발송</button>
                    </div>
                    <div className='FindPassword_input'>
                        <input
                            placeholder="인증번호 입력" />
                        <button>확인</button>
                    </div>
                    <div className='FindPassword_input'>
                        <input
                            type="password"
                            placeholder="변경하실 비밀번호를 입력해주세요. (숫자4자리)" />
                    </div>
                    <div className='FindPassword_input'>
                        <input
                            type="password"
                            placeholder="변경하실 비밀번호를 다시한번 입력해주세요. (숫자4자리)" />
                    </div>
                </div>
                <p>입력창을 터치하시면 키보드가 나타납니다.<br />키보드 완료버튼을 클릭하시면 키보드가 사라집니다.</p>
                <div className='prevNextBtn'>
                    <button
                        onClick={handleHomeClick}>이전</button>
                    <button>변경완료</button>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default FindPassword;
