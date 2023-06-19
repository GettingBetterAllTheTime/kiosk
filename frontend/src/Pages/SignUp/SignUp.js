import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';
import Header from '../../Components/Header/Header';
import Nav from '../../Components/Nav/Nav';
import Footer from '../../Components/Footer/Footer';

const SignUp = () => {
    const navigate = useNavigate();
    const [acceptAll, setAcceptAll] = useState(false);
    const [signUpMsg, setSignUpMsg] = useState(false);
    const [showTerms1, setShowTerms1] = useState(false);
    const [showTerms2, setShowTerms2] = useState(false);
    const [showTerms3, setShowTerms3] = useState(false);
    const handleHomeClick = () => {
        navigate('/');
    }

    useEffect(() => {
        const checkboxes = document.querySelectorAll('.SignUp_inputs input[type="checkbox"]');
        checkboxes.forEach((checkbox) => {
            checkbox.checked = acceptAll;
        });
    }, [acceptAll]);


    const handleNextClick = (e) => {
        e.preventDefault();
        const checkboxes = document.querySelectorAll('.SignUp_inputs input[required]');
        const areAllChecked = Array.from(checkboxes).every((checkbox) => checkbox.checked);
        if (areAllChecked) {
            navigate('/signup/join');
        } else {
            setSignUpMsg(true);
        }
    };

    const handleTerms1 = (e) => {
        e.preventDefault();
        setShowTerms1(true);
    };

    const handleTerms2 = (e) => {
        e.preventDefault();
        setShowTerms2(true);
    };

    const handleTerms3 = (e) => {
        e.preventDefault();
        setShowTerms3(true);
    };

    const AlertModal = () => {
        return (
            <div className='SignUp_msg'>
                <div className='SignUp_msg_innerbox'>
                    <h4 className='SignUp_msg_innerbox_header'>Message</h4>
                    <div className='SignUp_msg_innnerbox_content'>
                        <p>필수 항목에 모두 동의해 주셔야만<br />회원가입이 가능합니다.</p>
                        <div className='SignUp_msg_innnerbox_content_btns'>
                            <button className='SignUp_msg_innnerbox_content_btns_btn' onClick={() => { setSignUpMsg(false) }}>닫기</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const TermsModal1 = () => {
        return (<div className='Terms_msg'>
            <div className='Terms_msg_innerbox'>
                <h4 className='Terms_msg_innerbox_header'>서비스 이용약관</h4>
                <div className='Terms_msg_innnerbox_content'>
                    <h3>1. 이용자의 권리와 의무</h3>
                    <ul>
                        <li>스터디 카페 내 시설 및 장비를 적절히 사용하고 관리해야 합니다.</li>
                        <li>다른 이용자들에게 피해를 주거나 방해하지 않아야 합니다.</li>
                        <li>정당한 이용 목적으로만 스터디 카페를 이용해야 합니다.</li>
                    </ul>
                    <h3>2. 예약 및 이용료 결제</h3>
                    <ul>
                        <li>스터디 카페의 이용 시간을 예약해야 할 수 있으며, 일정한 이용료를 지불해야 할 수 있습니다.</li>
                        <li>예약 취소 또는 변경 시에는 일정한 기간 내에 사전 통지를 해야 할 수 있습니다.</li>
                    </ul>
                    <h3>3. 개인정보 보호</h3>
                    <p>이용자의 개인정보는 스터디 카페의 개인정보 처리 방침에 따라 수집, 사용, 보호됩니다.</p>
                    <h3>4. 시설 및 장비의 손상 및 분실</h3>
                    <p>스터디 카페의 시설이나 장비를 손상하거나 분실한 경우, 그에 따른 책임과 보상에 대한 내용이 명시될 수 있습니다.</p>
                    <h3>5. 책임과 면책</h3>
                    <p>스터디 카페는 이용자의 부주의로 인한 사고나 손해에 대해서는 일정한 범위 내에서 책임을 지지 않을 수 있습니다.</p>
                    <h3>6. 약관의 변경과 해지</h3>
                    <ul>
                        <li>스터디 카페는 필요에 따라 이용약관을 변경할 수 있으며, 변경된 약관은 이용자에게 공지됩니다.</li>
                        <li>이용자는 약관에 동의하지 않을 경우 서비스 이용을 중단하고 계약을 해지할 수 있습니다.</li>
                    </ul>
                    <div className='Terms_msg_innnerbox_content_btns'>
                        <button className='Terms_msg_innnerbox_content_btns_btn' onClick={() => { setShowTerms1(false) }}>닫기</button>
                    </div>
                </div>
            </div>
        </div>);
    };

    const TermsModal2 = () => {
        return (<div className='Terms_msg'>
            <div className='Terms_msg_innerbox'>
                <h4 className='Terms_msg_innerbox_header'>개인정보 취급 방침</h4>
                <div className='Terms_msg_innnerbox_content'>
                    <h3>1. 수집하는 개인정보의 종류 및 목적</h3>
                    <p>수집하는 개인정보의 종류와 목적을 명시합니다. 예를 들어, 이름, 연락처, 이메일 주소 등의 개인정보를 수집하는 이유를 설명할 수 있습니다.</p>

                    <h3>2. 개인정보의 이용</h3>
                    <p>수집한 개인정보를 어떻게 이용하는지 설명합니다. 예를 들어, 스터디 카페 이용을 위한 예약 및 서비스 제공, 고객 지원, 마케팅 활동 등에 사용할 수 있습니다.</p>

                    <h3>3. 개인정보의 제공 및 공유</h3>
                    <p>수집한 개인정보를 제3자와 공유하는 경우 그 목적과 범위를 설명합니다. 예를 들어, 서비스 제공 파트너와의 정보 공유, 법적 요구에 따른 공개 등이 있을 수 있습니다.</p>

                    <h3>4. 개인정보의 보관 기간</h3>
                    <p>개인정보를 얼마나 오래 보관하는지 설명합니다. 관련 법규나 내부 정책에 따라 보관 기간이 결정될 수 있습니다.</p>

                    <h3>5. 개인정보의 보호 조치</h3>
                    <p>개인정보를 보호하기 위해 어떠한 기술적, 물리적, 관리적 조치를 취하는지 설명합니다. 예를 들어, 암호화, 접근 제한, 보안 시스템 등의 조치를 이용할 수 있습니다.</p>

                    <h3>6. 개인정보 주체의 권리와 선택권</h3>
                    <p>개인정보 주체(이용자)가 자신의 개인정보에 대한 권리와 선택권을 행사할 수 있는 방법을 안내합니다. 예를 들어, 개인정보 열람, 수정, 삭제 등의 요청을 받는 절차를 설명할 수 있습니다.</p>

                    <h3>7. 개인정보 관련 책임과 접근자의 권한</h3>
                    <p>개인정보 관련 책임자나 담당자를 지정하고, 개인정보에 접근할 수 있는 권한에 대해 설명합니다. 또한, 스터디 카페가 개인정보 보호를 위해 어떠한 조치를 취하는지 안내할 수 있습니다.</p>

                    <h3>8. 개인정보의 안전성 확보</h3>
                    <p>개인정보의 안전성을 확보하기 위해 취하는 보안 조치를 설명합니다. 예를 들어, 개인정보의 암호화, 네트워크 보안의 강화, 정기적인 보안 점검 등이 있을 수 있습니다.</p>

                    <h3>9. 개인정보 처리의 위탁</h3>
                    <p>개인정보 처리를 외부 업체에 위탁하는 경우 그 내용과 안전성 확보를 위한 조치를 설명합니다. 개인정보 보호를 위해 위탁 업체와의 계약 체결 및 필요한 절차를 수행하는 것이 중요합니다.</p>

                    <h3>10. 개인정보 보호 관련 법령</h3>
                    <p>스터디 카페가 준수해야 할 개인정보 보호 관련 법령을 안내합니다. 예를 들어, 개인정보 보호법, 정보통신망 이용촉진 및 정보보호 등에 관한 법률 등이 있을 수 있습니다.</p>

                    <h3>11. 개인정보 취급 방침의 변경</h3>
                    <p>개인정보 취급 방침을 변경할 경우 그 내용을 공지하는 방법을 안내합니다. 또한, 변경된 개인정보 취급 방침이 적용되는 시기를 명시할 수 있습니다.</p>
                    <div className='Terms_msg_innnerbox_content_btns'>
                        <button className='Terms_msg_innnerbox_content_btns_btn' onClick={() => { setShowTerms2(false) }}>닫기</button>
                    </div>
                </div>
            </div>
        </div>);
    };

    const TermsModal3 = () => {
        return (<div className='Terms_msg'>
            <div className='Terms_msg_innerbox'>
                <h4 className='Terms_msg_innerbox_header'>마케팅정보 수집 및 이용</h4>
                <div className='Terms_msg_innnerbox_content'>
                    <h3>1. 수집하는 마케팅 정보의 종류 및 목적</h3>
                    <p>수집하는 마케팅 정보의 종류와 그 목적을 명시합니다. 예를 들어, 이메일 주소, 연락처, 성별, 연령대 등의 정보를 수집하는 이유를 설명할 수 있습니다.</p>

                    <h3>2. 마케팅 정보의 이용</h3>
                    <p>수집한 마케팅 정보를 어떻게 활용하는지 설명합니다. 예를 들어, 이메일 뉴스레터 발송, 프로모션 정보 제공, 이벤트 알림 등에 활용할 수 있습니다.</p>

                    <h3>3. 마케팅 정보의 제공 및 공유</h3>
                    <p>수집한 마케팅 정보를 제3자와 공유하는 경우 그 목적과 범위를 설명합니다. 예를 들어, 마케팅 파트너와의 정보 공유, 제휴 협력 업체와의 협력 등이 있을 수 있습니다.</p>

                    <h3>4. 마케팅 정보의 보관 기간</h3>
                    <p>마케팅 정보를 얼마나 오래 보관하는지 설명합니다. 관련 법규나 내부 정책에 따라 보관 기간이 결정될 수 있습니다.</p>

                    <h3>5. 마케팅 정보의 보호 조치</h3>
                    <p>마케팅 정보를 보호하기 위해 어떠한 기술적, 물리적, 관리적 조치를 취하는지 설명합니다. 예를 들어, 암호화, 접근 제한, 보안 시스템 등의 조치를 이용할 수 있습니다.</p>

                    <h3>6. 마케팅 정보 수신 동의 및 철회</h3>
                    <p>마케팅 정보를 수신하는 동의 여부를 묻고, 동의한 이용자가 언제든지 수신 동의를 철회할 수 있는 절차를 안내합니다.</p>

                    <h3>7. 마케팅 정보 관련 책임과 문의처</h3>
                    <p>이용자가 자신의 개인정보에 대한 권리와 선택권을 행사할 수 있는 방법을 안내합니다. 예를 들어, 개인정보 열람, 수정, 삭제 등의 요청을 받는 절차를 설명할 수 있습니다.</p>

                    <h3>8. 개인정보의 안전성 확보</h3>
                    <p>마케팅 정보 관련 책임자를 명시하고, 이용자가 마케팅 정보와 관련하여 문의나 불만을 제기할 수 있는 연락처를 안내합니다. 예를 들어, 고객센터 전화번호, 이메일 주소, 온라인 문의 양식 등을 제공할 수 있습니다.</p>
                    <div className='Terms_msg_innnerbox_content_btns'>
                        <button className='Terms_msg_innnerbox_content_btns_btn' onClick={() => { setShowTerms3(false) }}>닫기</button>
                    </div>
                </div>
            </div>
        </div>);
    };

    return (
        <>
            {signUpMsg && <AlertModal />}
            {showTerms1 && <TermsModal1 />}
            {showTerms2 && <TermsModal2 />}
            {showTerms3 && <TermsModal3 />}

            <Header />
            <form>
                <div className='SignUp'>
                    <Nav />
                    <h3>이용약관동의</h3>
                    <div className='SignUp_inputs'>
                        <div className='SignUp_input'>
                            <input type='checkbox' id="ch1" required />
                            <label htmlFor="ch1">(필수) 서비스 이용약관</label>
                            <button onClick={handleTerms1}>자세히보기</button>
                        </div>
                        <div className='SignUp_input'>
                            <input type='checkbox' id="ch2" required />
                            <label htmlFor="ch2">(필수) 개인정보 취급방침</label>
                            <button onClick={handleTerms2}>자세히보기</button>
                        </div>
                        <div className='SignUp_input'>
                            <input type='checkbox' id="ch3" />
                            <label htmlFor="ch3">(선택) 마케팅 정보 수집 및 이용</label>
                            <button onClick={handleTerms3}>자세히보기</button>
                        </div>
                        <div className='SignUp_input'>
                            <input type='checkbox' id='acceptAll' checked={acceptAll} onChange={(e) => setAcceptAll(e.target.checked)} />
                            <label htmlFor="acceptAll">전체동의(서비스이용, 개인정보취급방침, 마케팅 정보 수집 및 이용)</label>
                        </div>
                    </div>
                    <div className='prevNextBtn'>
                        <button onClick={handleHomeClick}>이전</button>
                        <button onClick={handleNextClick} type="submit">다음</button>
                    </div>
                </div>
                <Footer />
            </form>
        </>
    )
}

export default SignUp;