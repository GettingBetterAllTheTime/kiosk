import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header'
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import './BuyPeriod.css'

function BuyPeriod() {
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
        <div className="BuyPeriod">
            <Header />
            <Nav />
            <h3>기간권 구입</h3>
            <div className="BuyPeriod_ticket">
                <button
                    onClick={() => handleFocusButton('1주 40,000원')}
                    className={selectedBtn === '1주 40,000원' ? 'selected' : ''}
                >
                    <h4>기간권</h4>
                    <p>1주&nbsp;&nbsp;&nbsp;40,000원</p>
                </button>
                <button
                    onClick={() => handleFocusButton('2주 70,000원')}
                    className={selectedBtn === '2주 70,000원' ? 'selected' : ''}
                >
                    <h4>기간권</h4>
                    <p>2주&nbsp;&nbsp;&nbsp;70,000원</p>
                </button>
                <button
                    onClick={() => handleFocusButton('4주 130,000원')}
                    className={selectedBtn === '4주 130,000원' ? 'selected' : ''}
                >
                    <h4>기간권</h4>
                    <p>4주&nbsp;&nbsp;&nbsp;130,000원</p>
                </button>
                <button
                    onClick={() => handleFocusButton('8주 250,000원')}
                    className={selectedBtn === '8주 250,000원' ? 'selected' : ''}
                >
                    <h4>기간권</h4>
                    <p>8주&nbsp;&nbsp;&nbsp;250,000원</p>
                </button>

            </div>

            <div className="BuyPeriod_notice">
                <p>기간권 상품은 퇴실시 소멸되며 환불이 불가합니다.</p>
            </div>
            <div className="prevNextBtn">
                <button onClick={handlePrevClick}>이전</button>
                <button onClick={goNext} disabled={!selectedBtn}>다음</button>
            </div>
            <Footer />
        </div>

    )
}

export default BuyPeriod