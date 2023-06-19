import React, { useEffect, useRef, useState } from 'react'
import Header from '../Header/Header'
import { useNavigate } from 'react-router-dom';
import './BuyTime.css'
import Footer from '../Footer/Footer';

function BuyTime() {
    const [remainingTime, setRemainingTime] = useState(30000);
    const [selectedBtn, setSelectedBtn] = useState(false);
    const intervalRef = useRef();
    const navigate = useNavigate();

    const goNext = () => {
        if (selectedBtn) {
            const selectedValue = selectedBtn;
            navigate(`/pay?selectedValue=${selectedValue}`);
        } else {
            navigate('/');
        }
    };

    const handleHomeClick = () => {
        navigate('/');
    }

    const handlePrevClick = () => {
        navigate(-1);
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
            navigate('/', { replace: true });
        }
    }, [remainingTime, navigate]);
    if (remainingTime === 0) {
        goNext();
        return null;
    }

    const handleFocusButton = (selectedValue) => {
        setSelectedBtn(selectedValue);
    };

    return (
        <div className="BuyTime">
            <Header />
            <div className="BuyTime_nav">
                <h3 onClick={handleHomeClick}>
                    <img src={process.env.PUBLIC_URL + "/img/tohome.png"} alt="처음으로" />
                    처음으로
                </h3>
                <div>
                    <img src={process.env.PUBLIC_URL + "/img/remainingTime.png"} alt="타이머" />
                    {remainingTime}초
                </div>
            </div>
            <h3>시간권 구입</h3>
            <div className="BuyTime_ticket">
                <button
                    onClick={() => handleFocusButton('2시간 3,500원')}
                    className={selectedBtn === '2시간 3,500원' ? 'selected' : ''}
                >
                    <h4>시간권</h4>
                    <p>2시간&nbsp;&nbsp;&nbsp;3,500원</p>
                </button>
                <button
                    onClick={() => handleFocusButton('3시간 4,000원')}
                    className={selectedBtn === '3시간 4,000원' ? 'selected' : ''}
                >
                    <h4>시간권</h4>
                    <p>3시간&nbsp;&nbsp;&nbsp;4,000원</p>
                </button>
                <button
                    onClick={() => handleFocusButton('4시간 5,000원')}
                    className={selectedBtn === '4시간 5,000원' ? 'selected' : ''}
                >
                    <h4>시간권</h4>
                    <p>4시간&nbsp;&nbsp;&nbsp;5,000원</p>
                </button>
                <button
                    onClick={() => handleFocusButton('5시간 6,000원')}
                    className={selectedBtn === '5시간 6,000원' ? 'selected' : ''}
                >
                    <h4>시간권</h4>
                    <p>5시간&nbsp;&nbsp;&nbsp;6,000원</p>
                </button>
                <button
                    onClick={() => handleFocusButton('6시간 7,000원')}
                    className={selectedBtn === '6시간 7,000원' ? 'selected' : ''}
                >
                    <h4>시간권</h4>
                    <p>6시간&nbsp;&nbsp;&nbsp;7,000원</p>
                </button>
                <button
                    onClick={() => handleFocusButton('8시간 8,000원')}
                    className={selectedBtn === '8시간 8,000원' ? 'selected' : ''}
                >
                    <h4>시간권</h4>
                    <p>8시간&nbsp;&nbsp;&nbsp;8,000원</p>
                </button>
                <button
                    onClick={() => handleFocusButton('12시간 10,000원')}
                    className={selectedBtn === '12시간 10,000원' ? 'selected' : ''}
                >
                    <h4>시간권</h4>
                    <p>12시간&nbsp;&nbsp;&nbsp;10,000원</p>
                </button>
            </div>

            <div className="BuyTime_notice">
                <p>시간권 상품은 퇴실시 소멸되며 환불이 불가합니다.</p>
            </div>
            <div className="prevNextBtn">
                <button onClick={handlePrevClick}>이전</button>
                <button onClick={goNext} disabled={!selectedBtn}>다음</button>
            </div>
            <Footer />
        </div>

    )
}

export default BuyTime