import './KeyBoard.css';

const KeyBoard = ({ setPhoneInputValue, setPasswordInputValue, setShowKeyBoard, focusPoint }) => {
    const handleKeyDown = (e) => {
        if (focusPoint === 0) {
            setPhoneInputValue(prevValue => prevValue + e.target.value);
        } else if (focusPoint === 1) {
            setPasswordInputValue(prevValue => prevValue + e.target.value);
        }
    };

    const handleBackspace = () => {
        if (focusPoint === 0) {
            setPhoneInputValue(prevValue => prevValue.slice(0, -1));
        } else if (focusPoint === 1) {
            setPasswordInputValue(prevValue => prevValue.slice(0, -1));
        }
    };

    const resetKeyboard = () => {
        if (focusPoint === 0) {
            setPhoneInputValue('');
        } else if (focusPoint === 1) {
            setPasswordInputValue('');
        }
    };

    return (
        <div className='KeyBoard'>
            <div className='KeyBoard_number'>
                <button onClick={handleKeyDown} value="1">1</button>
                <button onClick={handleKeyDown} value="2">2</button>
                <button onClick={handleKeyDown} value="3">3</button>
                <button onClick={handleKeyDown} value="4">4</button>
                <button onClick={handleKeyDown} value="5">5</button>
                <button onClick={handleKeyDown} value="6">6</button>
                <button onClick={handleKeyDown} value="7">7</button>
                <button onClick={handleKeyDown} value="8">8</button>
                <button onClick={handleKeyDown} value="9">9</button>
                <button onClick={handleKeyDown} value="010">010</button>
                <button onClick={handleKeyDown} value="0">0</button>
                <button onClick={handleKeyDown} value="00">00</button>
            </div>
            <div className='KeyBoard_string'>
                <button onClick={handleBackspace}>BACK</button>
                <button onClick={resetKeyboard}>RESET</button>
                <button onClick={() => { setShowKeyBoard(false) }}>완료/닫기</button>
            </div>
        </div>
    )
}

export default KeyBoard;
