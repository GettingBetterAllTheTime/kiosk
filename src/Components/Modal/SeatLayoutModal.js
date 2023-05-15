import { useEffect, useState, useContext } from "react";
import React from "react";
import styled from "styled-components";
import data from './data.json';
import './SeatLayoutModal.css';
import { MyContext } from "../../App";
import PropTypes from 'prop-types';

function SeatLayoutModal() {
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [seats, setSeats] = useState([]);
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

    return (
        <div className="SeatLayoutModal">
            <div className="SeatLayoutModal_header">실시간 좌석현황</div>
            <div className="SeatLayoutModal_content">
                {selectedSeats.map((seat, i) => (
                    <SeatsInfo
                        key={i}
                        idseat={seat.id}
                        nameSeat={seat.name}
                        isavailable={seat.isavailable}
                        isselected={seat.isselected}
                        setSelectedSeats={setSelectedSeats}
                        selectedSeats={selectedSeats}
                        ischaired={seat.ischaired}
                    />
                ))}
            </div>
            <div className="containerSub">
                <div className="subtitles">
                    <SeatsSub color={"#8DD7CF"} />
                    <p>선택됨</p>
                </div>
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
    nameSeat:PropTypes.string,
    isselected:PropTypes.bool,
    isavailable:PropTypes.bool,
    setSelectedSeats:PropTypes.func,
    selectedSeats:PropTypes.array,
    ischaired:PropTypes.bool
  }

function SeatsInfo({
    idseat,
    nameSeat,
    isselected,
    isavailable,
    setSelectedSeats,
    selectedSeats,
    ischaired,
}) {
    return (
        <Seats
            idseat={idseat}
            isavailable={isavailable.toString()}
            isselected={isselected.toString()}
            ischaired={ischaired.toString() }
            onClick={(e) => {
                changeColor(idseat, setSelectedSeats, selectedSeats);
            }}
        >
            {nameSeat}
        </Seats>
    );
}

function changeColor(id, setSelectedSeats, selectedSeats) {
    const newArray = selectedSeats.map((seat) => {
        if (id === seat.id && seat.isavailable) {
            seat.isselected = !seat.isselected;
        } else if (id === seat.id && !seat.isavailable) {
            alert("이미 이용중인 좌석입니다.");
        }
        return seat;
    });

    setSelectedSeats(newArray);
}

const Seats = styled.div`
background-color: ${(props) =>
        props.ischaired=="true" ?
            (props.isselected =="true"
                ? "#8DD7CF" // 연두색
                : (props.isavailable =="true"
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