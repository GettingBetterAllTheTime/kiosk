import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';

const SignUp = () => {
    const [remainingTime, setRemainingTime] = useState(30);
    const intervalRef = useRef();
    const navigate = useNavigate();
    const [acceptAll, setAcceptAll] = useState(false);

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

    useEffect(() => {
        const checkboxes = document.querySelectorAll('.SignUp_inputs input[type="checkbox"]');
        checkboxes.forEach((checkbox) => {
            checkbox.checked = acceptAll;
        });
    }, [acceptAll]);

    if (remainingTime === 0) {
        return null;
    }

    return (
        <>
            <Header />
            <div className='SignUp'>
                <div className='SignUp_nav'>
                    <h3 onClick={handleHomeClick}><img src={process.env.PUBLIC_URL + '/img/tohome.png'} />처음으로</h3>
                    <div><img src={process.env.PUBLIC_URL + '/img/remainingTime.png'} />{remainingTime}</div>
                </div>
                <h3>이용약관동의</h3>
                <div className='SignUp_inputs'>
                    <div className='SignUp_input'>
                        <input type='checkbox' id="ch1" required />
                        <label htmlFor="ch1">(필수) 서비스 이용약관</label>
                        <button>자세히보기</button>
                    </div>
                    <div className='SignUp_input'>
                        <input type='checkbox' id="ch2" required />
                        <label htmlFor="ch2">(필수) 개인정보 취급방침</label>
                        <button>자세히보기</button>
                    </div>
                    <div className='SignUp_input'>
                        <input type='checkbox' id="ch3" />
                        <label htmlFor="ch3">(선택) 마케팅 정보 수집 및 이용</label>
                        <button>자세히보기</button>
                    </div>
                    <div className='SignUp_input'>
                        <input type='checkbox' id='acceptAll' checked={acceptAll} onChange={(e) => setAcceptAll(e.target.checked)} />
                        <label htmlFor="acceptAll">전체동의(서비스이용, 개인정보취급방침, 마케팅 정보 수집 및 이용)</label>
                    </div>
                </div>
                <div className='prevNextBtn'>
                    <button onClick={handleHomeClick}>이전</button>
                    <button>다음</button>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default SignUp;
