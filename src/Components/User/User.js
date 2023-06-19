import './User.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Leave from '../Modal/Leave';

const User = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const handleSignupClick = () => {
        navigate('/signup');
    }

    const handleFindPasswordClick = () => {
        navigate('/findpassword');
    }

    const handleShowModal = () => {
        setShowModal(!showModal);
    }

    return (
        <>
            <div className="User">
                <button onClick={handleShowModal}>퇴실</button>
                <button onClick={handleSignupClick}>회원가입</button>
                <button onClick={handleFindPasswordClick}>비밀번호 찾기</button>
            </div>
            {showModal && <Leave handleShowModal={handleShowModal} />}
        </>
    )
}

export default User;
