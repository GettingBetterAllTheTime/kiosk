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
                    <img src={process.env.PUBLIC_URL + '/img/seatLayout.png'} />
                    좌석배치 보기
                </button>
            </div>
        </>
    )
}

export default Seat;