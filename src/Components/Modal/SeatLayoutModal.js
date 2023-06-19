import { useEffect, useState, useContext } from "react";
import React from "react";
import styled from "styled-components";
import data from '../data.json';
import './SeatLayoutModal.css';
import { MyContext } from "../../App";
import PropTypes from 'prop-types';
import axios from "axios";


function SeatLayoutModal() {
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [seats, setSeats] = useState([]);
    const [loading, setLoading] = useState(true);
    const { modal, setModal } = useContext(MyContext);

    const closeHandler = () => {
        setModal(!modal);
    }

    useEffect(() => {
        setSelectedSeats(
            data.seats.map((seat) => ({ ...seat, isselected: false }))
        );
        console.log(data.seats);
        setSeats(data.seats);
    }, []);

    useEffect(() => {
        axios.get('/api/senddata')
            .then(response => {
                // 성공적으로 응답 받았을 때 실행할 작업
                // 예: 상태 업데이트
                console.log(response.data);
                setSeats(response.data.data);
                setLoading(false);
            })
            .catch(error => {
                // 에러 발생 시 실행할 작업
                // 예: 에러 처리
                setLoading(false);
            });
    }, []);

    return (
        <div className="SeatLayoutModal">
            <div className="SeatLayoutModal_header">실시간 좌석현황</div>

            <div className="SeatLayoutModal_content">
                {loading ? (
                    <div className="loading"><img src={process.env.PUBLIC_URL + "/img/loading.gif"} alt="로딩중" /></div>
                ) : (
                    selectedSeats.map((seat, i) => (
                        seat.name === seats[i].name ? (
                            <SeatsInfo
                                key={i}
                                idseat={seat.id}
                                nameSeat={seats[i].name}
                                isavailable={seats[i].isavailable}
                                setSelectedSeats={setSelectedSeats}
                                selectedSeats={selectedSeats}
                                ischaired={seats[i].ischaired}
                                setSelectedSeatNumber={false}
                            />
                        ) : (
                            <SeatsInfo
                                key={i}
                                idseat={seat.id}
                                isavailable={false}
                                setSelectedSeats={setSelectedSeats}
                                selectedSeats={selectedSeats}
                                ischaired={false}
                                setSelectedSeatNumber={false}
                            />
                        )
                    ))
                )}
            </div>

            <div className="containerSub">
                <div className="subtitles">
                    <SeatsSub color={"#fff"} />
                    <p>이용가능</p>
                </div>
                <div className="subtitles">
                    <SeatsSub color={"#FBE192"} />
                    <p>이용중</p>
                </div>
            </div>

            <button onClick={closeHandler}>닫기</button>
        </div>
    );
}

export default SeatLayoutModal;


SeatsInfo.propTypes = {
    idseat: PropTypes.number,
    nameSeat: PropTypes.string,
    isselected: PropTypes.bool,
    isavailable: PropTypes.bool,
    setSelectedSeats: PropTypes.func,
    selectedSeats: PropTypes.array,
    ischaired: PropTypes.bool
}
function SeatsInfo({
    idseat,
    nameSeat,
    isselected,
    isavailable,
    setSelectedSeats,
    selectedSeats,
    ischaired,
    setSelectSeatModal,
    setSelectedSeatNumber
}) {
    return (
        <Seats
            idseat={idseat}
            isavailable={isavailable.toString()}
            ischaired={ischaired.toString()}
        >
            {nameSeat}
        </Seats>
    );
}

const Seats = styled.div`
background-color: ${(props) =>
        props.ischaired == "true" ?
            (props.isselected == "true"
                ? "#8DD7CF" // 연두색
                : (props.isavailable == "true"
                    ? "#fff"
                    : "#FBE192"))
            : null};
  height: 26px;
  width: 26px;
  line-height: 26px;
`;

const SeatsSub = styled.div`
  background-color: ${(props) => props.color};
  border: 1px solid #808f9d;
  border-radius: 35px;
  height: 26px;
  width: 26px;
  margin-left: 25px;
`;