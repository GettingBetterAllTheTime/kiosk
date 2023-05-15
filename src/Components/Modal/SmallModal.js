import React, { useRef } from 'react';
import './SmallModal.css';

const SmallModal = ({ handleShowModal }) => {
    const phoneNumber = useRef();

    const handleCheckout = () => {
        if (phoneNumber.current.value.length < 11) {
            phoneNumber.current.focus();
        } else {
            handleShowModal();
            console.log('퇴실처리되었습니다.');
        }
    }

    return (
        <div className='SmallModal'>
            <div className='SmallModal_innerbox'>
                <h4 className='SmallModal_innerbox_header'>퇴실처리</h4>
                <div className='SmallModal_innnerbox_content'>
                    <p>휴대폰 번호를 입력해주세요.</p>
                    <input ref={phoneNumber} type="text" placeholder="휴대폰 번호를 입력해주세요." />
                    <div className='SmallModal_innnerbox_content_btns'>
                        <button className='SmallModal_innnerbox_content_btns_btn' onClick={handleCheckout}>퇴실처리</button>
                        <button className='SmallModal_innnerbox_content_btns_btn' onClick={handleShowModal}>닫기</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SmallModal;
