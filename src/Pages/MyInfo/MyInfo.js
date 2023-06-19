import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer'
import './MyInfo.css';
import axios from 'axios';
import Receipt from '../../Components/Modal/Receipt.js';
import Nav from '../../Components/Nav/Nav';

function MyInfo() {
    const [myInfoData, setMyInfoData] = useState(null);
    const [receiptModal, setReceiptModal] = useState(false);

    const handlePrintReceipt = () => {
        setReceiptModal(true);
    }

    const handleCloseReceipt = () => {
        setReceiptModal(false);
    };

    useEffect(() => {
        axios.get('/api/myinfo')
            .then(response => {
                setMyInfoData(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <div className='MyInfo'>
            {receiptModal && <Receipt onClose={handleCloseReceipt} />}
            <Header />
            <Nav />
            <div className='MyInfo_content'>
                {myInfoData ? (
                    <div className="onload">
                        <table>
                            <caption>개인정보</caption>
                            <tr>
                                <th>핸드폰 번호</th>
                                <td>{myInfoData.phoneNumber}</td>
                            </tr>
                            <tr>
                                <th>이름</th>
                                <td>{myInfoData.name}</td>
                            </tr>
                            <tr>
                                <th>생년월일</th>
                                <td>{myInfoData.birth}</td>
                            </tr>
                            <tr>
                                <th>성별</th>
                                <td>{myInfoData.gender}</td>
                            </tr>
                        </table>
                        <table>
                            <caption>좌석 이용현황</caption>
                            <thead>
                                <tr>
                                    <th>구분</th>
                                    <th>좌석번호</th>
                                    <th>기간</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{myInfoData.type}</td>
                                    <td>{myInfoData.seat}</td>
                                    <td>{myInfoData.startTime} ~ {myInfoData.endTime}</td>
                                </tr>
                            </tbody>
                        </table>
                        <table>
                            <caption>보유상품</caption>
                            <thead>
                                <tr>
                                    <th>상품명</th>
                                    <th>잔여시간</th>
                                    <th>잔여기간</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{myInfoData.type}</td>
                                    <td>{myInfoData.type === "시간권" ? myInfoData.endTime : null}</td>
                                    <td>{myInfoData.type === "기간권" ? myInfoData.endTime : null}</td>
                                </tr>
                            </tbody>
                        </table>
                        <table>
                            <caption>결제내역</caption>
                            <thead>
                                <tr>
                                    <th>상품명</th>
                                    <th>결제금액</th>
                                    <th>결제일</th>
                                    <th>결제정보</th>
                                    <th>영수증</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{myInfoData.type}</td>
                                    <td>{myInfoData.price}</td>
                                    <td>{myInfoData.paymentDate}</td>
                                    <td>{myInfoData.paymentType}</td>
                                    <td><button onClick={handlePrintReceipt}>출력</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className='loading'><img src={process.env.PUBLIC_URL + "/img/loading.gif"} alt="로딩중" /></div>
                )}
            </div>
            <Footer />
        </div>

    )
}

export default MyInfo