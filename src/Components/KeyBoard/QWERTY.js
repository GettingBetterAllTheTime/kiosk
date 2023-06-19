import './QWERTY.css';

const QWERTY = ({ setShowQWERTYKeyBoard, focusPoint, setUserName }) => {
    const handleKeyDown = (e) => {
        if (focusPoint === 4) {
            setUserName(prevValue => prevValue + e.target.value);
        }
    };

    const handleBackspace = () => {
        if (focusPoint === 4) {
            setUserName(prevValue => prevValue.slice(0, -1));
        }
    };

    const handleSpaceBar = () => {
        if (focusPoint === 4) {
            setUserName(prevValue => prevValue + ' ');
        }
    }

    return (
        <div className='QWERTY'>
            <div className='QWERTY_firstline'>
                <div className='QWERTY_firstline_left'>
                    <button onClick={handleKeyDown} value="ㅂ">ㅂ</button>
                    <button onClick={handleKeyDown} value="ㅈ">ㅈ</button>
                    <button onClick={handleKeyDown} value="ㄷ">ㄷ</button>
                    <button onClick={handleKeyDown} value="ㄱ">ㄱ</button>
                    <button onClick={handleKeyDown} value="ㅅ">ㅅ</button>
                    <button onClick={handleKeyDown} value="ㅛ">ㅛ</button>
                    <button onClick={handleKeyDown} value="ㅕ">ㅕ</button>
                    <button onClick={handleKeyDown} value="ㅑ">ㅑ</button>
                    <button onClick={handleKeyDown} value="ㅐ">ㅐ</button>
                    <button onClick={handleKeyDown} value="ㅔ">ㅔ</button>
                </div>
                <div className='QWERTY_firstline_right'>
                    <button onClick={handleBackspace}>BACK</button>
                </div>
            </div>
            <div className='QWERTY_secondline'>
                <div className='QWERTY_secondline_left'>
                    <button onClick={handleKeyDown} value="ㅁ">ㅁ</button>
                    <button onClick={handleKeyDown} value="ㄴ">ㄴ</button>
                    <button onClick={handleKeyDown} value="ㅇ">ㅇ</button>
                    <button onClick={handleKeyDown} value="ㄹ">ㄹ</button>
                    <button onClick={handleKeyDown} value="ㅎ">ㅎ</button>
                    <button onClick={handleKeyDown} value="ㅗ">ㅗ</button>
                    <button onClick={handleKeyDown} value="ㅓ">ㅓ</button>
                    <button onClick={handleKeyDown} value="ㅏ">ㅏ</button>
                    <button onClick={handleKeyDown} value="ㅣ">ㅣ</button>
                </div>
                <div className='QWERTY_secondline_rightW'>
                    <button onClick={() => setShowQWERTYKeyBoard(false)}>완료/닫기</button>
                </div>
            </div>
            <div className='QWERTY_thirdline'>
                <div className='QWERTY_thirdline_left'>
                    <button onClick={handleKeyDown} value="ㅋ">ㅋ</button>
                    <button onClick={handleKeyDown} value="ㅌ">ㅌ</button>
                    <button onClick={handleKeyDown} value="ㅊ">ㅊ</button>
                    <button onClick={handleKeyDown} value="ㅍ">ㅍ</button>
                    <button onClick={handleKeyDown} value="ㅠ">ㅠ</button>
                    <button onClick={handleKeyDown} value="ㅜ">ㅜ</button>
                    <button onClick={handleKeyDown} value="ㅡ">ㅡ</button>
                </div>
                <div className='QWERTY_thirdline_right'><button>SHIFT</button></div>
            </div>
            <div className='QWERTY_fourthline'>
                <div className='QWERTY_fourthline_left'>
                    <button onClick={handleSpaceBar} value="SPACE">SPACE</button>
                </div>
                <div className='QWERTY_fourthline_right'>
                    <button>한/영</button>
                </div>
            </div>
        </div>
    );
}

export default QWERTY;