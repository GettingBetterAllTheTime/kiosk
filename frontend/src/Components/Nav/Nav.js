import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Nav.css';

function Nav() {
    const [remainingTime, setRemainingTime] = useState(30);
    const navigate = useNavigate();
    const intervalRef = useRef();
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
        <div className="Nav">
            <h3 onClick={handleHomeClick}>
                <img src={process.env.PUBLIC_URL + "/img/tohome.png"} alt="처음으로" />
                처음으로
            </h3>
            <div>
                <img src={process.env.PUBLIC_URL + "/img/remainingTime.png"} alt="타이머" />
                {remainingTime}초
            </div>
        </div>
    )
}

export default Nav