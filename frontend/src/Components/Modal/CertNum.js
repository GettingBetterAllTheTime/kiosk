import React from 'react';
import './CertNum.css';

function CertNum({ content, setSendNumModal, setConfirmModal }) {
    const handleClose = () => {
        if (setSendNumModal) {
            setSendNumModal(false);
        }
        if (setConfirmModal) {
            setConfirmModal(false);
        }
    };

    return (
        <div className='CertNum'>
            <div className='CertNum_innerbox'>
                <h4 className='CertNum_innerbox_header'>알림</h4>
                <div className='CertNum_innerbox_content'>
                    <p>{content}</p>
                    <button
                        className='CertNum_innerbox_content_btns_btn'
                        onClick={handleClose}>
                        닫기
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CertNum;