import './Seat.css';
import { MyContext } from '../../App';
import { useContext } from 'react';

const Seat = () => {
    const { modal, setModal } = useContext(MyContext);

    const modalHandler = () => {
        setModal(!modal);
    };

    return (
        <>
            <div className="seat">
                <button type="button" onClick={modalHandler}>
                    <img src={process.env.PUBLIC_URL + '/img/seatLayout.png'} alt='실시간 좌석현황' />
                    실시간 좌석현황 보기
                </button>
            </div>
        </>
    )
}

export default Seat;