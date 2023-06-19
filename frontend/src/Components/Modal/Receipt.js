import React from 'react';
import './Receipt.css';

function Receipt({ onClose }) {
    return (
        <div className='Receipt'>
            <div className='Receipt_innerbox'>
                <h4 className='Receipt_innerbox_header'>알림</h4>
                <div className='Receipt_innnerbox_content'>
                    <p>영수증이 출력되었습니다.</p>
                    <button
                        className='Receipt_innnerbox_content_btns_btn'
                        onClick={onClose}
                    >닫기
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Receipt;