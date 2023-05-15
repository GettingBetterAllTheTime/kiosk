import './SeatLayoutModal.css';

const SeatLayoutModal = ({ modal, setModal }) => {
    const seats = Array(144).fill(null);
    const closeHandler = () => {
        setModal(!modal);
    }

    return (
        <>
            <div className='SeatLayoutModal'>
                <h3>M스터디</h3>
                <div className="grid_template">
                    {seats.map((seat, index) => (
                        <div key={index} className={`grid grid${index + 1}`}>{index + 1}</div>
                    ))}
                </div>
                <button onClick={closeHandler}>닫기</button>
            </div>
        </>
    )
}

export default SeatLayoutModal;
