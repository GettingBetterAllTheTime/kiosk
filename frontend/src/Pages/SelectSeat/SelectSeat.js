import React, { useContext, useEffect, useState } from 'react';
import Header from '../../Components/Header/Header';
import Nav from '../../Components/Nav/Nav';
import Footer from '../../Components/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import PropTypes from 'prop-types';
import data from '../../Components/data.json';
import './SelectSeat.css';
import axios from 'axios';
import { MyContext } from '../../App';


function SelectSeat() {
    const [selectedSeats, setSelectedSeats] = useState([]);

    const [selectSeatModal, setSelectSeatModal] = useState(false);
    const [selectedSeatNumber, setSelectedSeatNumber] = useState("");
    const [time, setTime] = useState('');
    const [period, setPeriod] = useState('');

    const { seats, setSeats, userType, setUserType } = useContext(MyContext);

    console.log(userType, setUserType);

    const navigate = useNavigate();

    useEffect(() => {
        setSelectedSeats(
            data.seats.map((seat) => ({ ...seat, isselected: false }))
        );
        setSeats(data.seats);
    }, []);

    useEffect(() => {
        axios.get('/api/senddata')
            .then(response => {
                // 성공적으로 응답 받았을 때 실행할 작업
                // 예: 상태 업데이트
                console.log(response.data);
                setSeats(response.data.data);
            })
            .catch(error => {
                // 에러 발생 시 실행할 작업
                // 예: 에러 처리
            });
    }, []);

    useEffect(() => {
        axios.get('/api/getTime')
            .then(response => {
                const time = response.data.time;
                console.log(response);
                setTime(time);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        axios
            .get('/api/getPeriod')
            .then((response) => {
                const period = response.data.period;
                setPeriod(period);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleEnter = () => {
        console.log("입실버튼 클릭")
        axios.post('/api/enter', { selectedSeatNumber })
            .then(response => {
                console.log(response.data);
                const startTime = response.data.startTime;
                navigate('/EntranceResult', { state: { selectedSeatNumber, startTime, time, period } });
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <div className='SelectSeat'>
            {selectSeatModal &&
                <div className='SelectSeatModal'>
                    <div className='SelectSeatModal_innerbox'>
                        <h4 className='SelectSeatModal_innerbox_header'>좌석선택</h4>
                        <div className='SelectSeatModal_innnerbox_content'>
                            <h3>좌석번호: {selectedSeatNumber}</h3>
                            <p>선택하신 좌석번호로 입실 하시겠습니까?</p>
                            <div className='SelectSeatModal_innnerbox_content_btns'>
                                <button
                                    className='SelectSeatModal_innnerbox_content_btns_btn'
                                    onClick={handleEnter}>입실
                                </button>
                                <button
                                    className='SelectSeatModal_innnerbox_content_btns_btn'
                                    onClick={() => setSelectSeatModal(!selectSeatModal)}>닫기
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <Header />
            <Nav />
            <div className="SelectSeat_content">
                {/* {
                    selectedSeats.forEach((seat, i) => (
                        console.log(seat.name == seats[i].name)
                    ))
                } */}
                {selectedSeats.map((seat, i) => (
                    seat.name == seats[i].name ?
                        <SeatsInfo
                            key={i}
                            idseat={seat.id}
                            nameSeat={seats[i].name}
                            isavailable={seats[i].isavailable}
                            setSelectedSeats={setSelectedSeats}
                            selectedSeats={selectedSeats}
                            ischaired={seats[i].ischaired}
                            setSelectSeatModal={setSelectSeatModal}
                            setSelectedSeatNumber={setSelectedSeatNumber}

                        /> :
                        <SeatsInfo
                            key={i}
                            idseat={seat.id}
                            isavailable={false}
                            setSelectedSeats={setSelectedSeats}
                            selectedSeats={selectedSeats}
                            ischaired={false}
                            setSelectSeatModal={setSelectSeatModal}
                            setSelectedSeatNumber={setSelectedSeatNumber}
                        />
                ))}
            </div>

            <div className="SelectSeat_containerSub">
                {/* <div className="subtitles">
                    <SeatsSub color={"#8DD7CF"} />
                    <p>선택됨</p>
                </div> */}
                <div className="subtitles">
                    <SeatsSub color={"#fff"} />
                    <p>이용가능</p>
                </div>
                <div className="subtitles">
                    <SeatsSub color={"#FBE192"} />
                    <p>이용중</p>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default SelectSeat;

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
    const handleClick = (e) => {
        // console.log(`ischaired값은 ${e.target.getAttribute("ischaired")}입니다.`)
        console.log("클릭됨");
        const isSeatAvailable = e.target.getAttribute("isavailable") === "true";
        const isChaired = e.target.getAttribute("ischaired") === "true";

        if (isSeatAvailable) {
            console.log(`선택하신 좌석번호는 ${e.target.innerHTML}번 입니다`);
            changeColor(idseat, setSelectedSeats, selectedSeats, setSelectedSeatNumber);
            setSelectSeatModal(true);
        }
        if (!isChaired) {
            setSelectSeatModal(false);
        }
    };

    return (
        <Seats
            idseat={idseat}
            isavailable={isavailable.toString()}
            ischaired={ischaired.toString()}
            onClick={handleClick}
        >
            {nameSeat}
        </Seats>
    );
}

function changeColor(id, setSelectedSeats, selectedSeats, setSelectedSeatNumber) {
    const newArray = selectedSeats.map((seat) => {
        if (id === seat.id && seat.isavailable) {
            seat.isselected = !seat.isselected;
            setSelectedSeatNumber(seat.name);
        } else if (id === seat.id && !seat.isavailable) {
            // alert("이미 이용중인 좌석입니다.");
        }
        return seat;
    });

    setSelectedSeats(newArray);
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