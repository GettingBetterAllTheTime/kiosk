import React, { useRef, useState } from 'react';
import Header from '../Header/Header';
import Nav from '../Nav/Nav.js';
import Footer from '../Footer/Footer';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Pay.css';

function Pay() {
    const location = useLocation();
    const selectedValue = new URLSearchParams(location.search).get('selectedValue');
    const navigate = useNavigate();
    const [paymentState, setPaymentState] = useState(0);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    const [paymentType, setPaymentType] = useState(0);

    const handlePrevClick = () => {
        if (paymentState == 0) {
            navigate('/BuyTime');
        } else if (paymentState == 1 || paymentState == 2) {
            navigate('/Pay');
        }
    }

    const handleSelected = () => {
        const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
        setSelectedPaymentMethod(paymentMethod);
        console.log(paymentMethod);
        if (paymentMethod === 'credit_card') {
            setPaymentType(1);
        } else if (paymentMethod === 'account_transfer') {
            setPaymentType(2);
        } else if (paymentMethod !== 'account_transfer') {
            setPaymentType(0);
        } else {
            setPaymentType(0);
        }
    }

    const handleNextClick = () => {
        const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
        setSelectedPaymentMethod(paymentMethod);
        console.log(paymentType);
        setPaymentState(paymentType);
        const currentTime = new Date();

        if (selectedValue) { // 8시간 8,000원
            axios.post('/api/pay', { selectedValue, paymentType, currentTime })
                // selectedValue, paymentState를 요청의 본문 데이터로 전달합니다.
                .then(response => {
                    // 요청이 성공적으로 처리되면 호출되는 콜백 함수
                })
                .catch(error => {
                    // 요청이 실패한 경우 호출되는 콜백 함수
                    console.log("에러발생")
                });
        }
    };

    // Pay 컴포넌트 최초 렌더링시 보여줄 컴포넌트
    const PaymentSection = () => {
        {
            return (
                <div className='Pay_method'>
                    {/* 카드결제 */}
                    <div className='credit_card'>
                        <label>
                            <div className='credit_card_img'>
                                <img
                                    src={process.env.PUBLIC_URL + "/img/creditcard.png"}
                                    alt="카드결제"
                                />
                            </div>
                            <div className='credit_card_text'>
                                <input
                                    type='radio'
                                    name='payment'
                                    value='credit_card'
                                    checked={selectedPaymentMethod === 'credit_card'}
                                    // onChange={() => setSelectedPaymentMethod('credit_card')}
                                    onChange={handleSelected}
                                />
                                <p>카드결제(삼성페이,애플페이 가능)</p>
                            </div>
                        </label>
                    </div>

                    {/* 계좌이체 */}
                    <div className='account_transfer'>
                        <label>
                            <div className='account_transfer_img'>
                                <img
                                    src={process.env.PUBLIC_URL + "/img/account_transfer.png"}
                                    alt="계좌이체"
                                />
                            </div>
                            <div className='account_transfer_text'>
                                <input
                                    type='radio'
                                    name='payment'
                                    value='account_transfer'
                                    checked={selectedPaymentMethod === 'account_transfer'}
                                    // onChange={() => setSelectedPaymentMethod('account_transfer')}
                                    onChange={handleSelected}
                                />
                                <p>계좌이체</p>
                            </div>
                        </label>
                    </div>
                </div>
            );
        }
    };

    // 카드결제 선택 후 다음 버튼 눌렀을 때 보여줄 컴포넌트
    const Card = () => {
        return (
            <div className='Card'>
                <img src={process.env.PUBLIC_URL + "/img/insert_card.png"} alt="카드를 투입해주세요" />
                <p>신용카드 IC칩 방향을 위로해서 넣어주세요.</p>
                <p>삼성페이 결제시 앱실행후 스마트폰을 카드리더기쪽에 대주세요.</p>
            </div>
        )
    }

    // 계좌이체 선택 후 다음 버튼 눌렀을 때 보여줄 컴포넌트
    const Account = () => {
        return (
            <div className='Account'>
                <p>계좌번호 : 1234567890 </p>
                <p>은행 : 00은행 </p>
                <p>예금주 : 홍길동 </p>
            </div>
        )
    }

    return (
        <div className='Pay'>
            <Header />
            <Nav />
            <h3>결제방법선택</h3>

            <div className='Pay_list'>
                <div className=''>구입상품</div>
                <div>
                    {selectedValue && `${selectedValue.split(' ')[0]} `}
                    <span>{selectedValue && selectedValue.split(' ')[1]}</span>
                </div>
            </div>
            <div className='Pay_total'>
                <h4>총결제금액</h4>
                <p>{selectedValue && selectedValue.split(' ')[1]}</p>
            </div>

            {
                paymentState == 0 ? <PaymentSection /> : null
            }

            {
                paymentState == 1 ? <Card /> : null
            }

            {
                paymentState == 2 ? <Account /> : null
            }

            {
                paymentState !== 1 && paymentState !== 2 && (
                    <div className='prevNextBtn'>
                        <button onClick={handlePrevClick}>이전</button>
                        <button onClick={handleNextClick} disabled={!selectedPaymentMethod}>다음</button>
                    </div>
                )
            }
            <Footer />
        </div>
    );
}

export default Pay;