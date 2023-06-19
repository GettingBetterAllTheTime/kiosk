import React, { useState } from "react";
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Container from './Components/UI/Container';
import Main from "./Pages/Main/Main";
import SignUp from './Pages/SignUp/SignUp';
import FindPassword from './Pages/FindPassword/FindPassword';
import OnLog from './Pages/OnLog/OnLog';
import SelectSeat from "./Pages/SelectSeat/SelectSeat";
import EntranceResult from "./Pages/EntranceResult/EntranceResult";
import Join from "./Pages/SignUp/Join";
import BuyTime from "./Components/BuyTime/BuyTime";
import Leave from "./Components/Modal/Leave";
import Pay from "./Components/Pay/Pay";
import BuyPeriod from "./Components/BuyPeriod/BuyPeriod";
import MyInfo from "./Pages/MyInfo/MyInfo";
export const MyContext = React.createContext();

function App() {

  const [modal, setModal] = useState(false);
  const [leave, setLeave] = useState(false);
  const [showKeyBoard, setShowKeyBoard] = useState(false);
  const [phoneInputValue, setPhoneInputValue] = useState('');
  const [passwordInputValue, setPasswordInputValue] = useState('');
  const [focusPoint, setFocusPoint] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [confirmPasswordInputValue, setConfirmPasswordInputValue] = useState("");
  const [seats, setSeats] = useState([]);
  const [time, setTime] = useState("");
  const [period, setPeriod] = useState("");
  const [userType,setUserType] = useState("");

  const [userInfo, setUserInfo] = useState({
    id: "",
    pw: "",
    userName: "",
    birth: "",
    userValid: false,
  });

  const contextValue = {
    modal,
    setModal,
    input: "",
    setInput: () => { },
    userInfo,
    setUserInfo,
    userType,
    setUserType,
    showKeyBoard,
    setShowKeyBoard,
    phoneInputValue,
    setPhoneInputValue,
    passwordInputValue,
    setPasswordInputValue,
    focusPoint,
    setFocusPoint,
    isLoggedIn,
    setIsLoggedIn,
    confirmPasswordInputValue,
    setConfirmPasswordInputValue,
    seats,
    setSeats,
    time,
    setTime,
    period,
    setPeriod
  };

  return (
    <MyContext.Provider value={contextValue}>
      <Container className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/signUp/Join" element={<Join />} />
            <Route path="/findPassword" element={<FindPassword />} />
            {isLoggedIn ? (
              <>
                <Route path="/onLog" element={<OnLog />} />
                <Route path="/selectseat" element={<SelectSeat />} />
                <Route path="/entranceResult" element={<EntranceResult />} />
                <Route path="/buyTime" element={<BuyTime />} />
                <Route path="/buyPeriod" element={<BuyPeriod />} />
                <Route path="/pay" element={<Pay />} />
                <Route path="/MyInfo" element={<MyInfo />} />
              </>
            ) : null}
            {
              leave && <Leave
                handleShowModal={() => setLeave(false)}
                phoneInputValue={phoneInputValue}
                setIsLoggedIn={setIsLoggedIn}
              />
            }
          </Routes>
        </BrowserRouter>
      </Container>
    </MyContext.Provider>
  );
}

export default App;