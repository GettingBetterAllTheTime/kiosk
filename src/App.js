import React, { useState } from "react";
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Container from './Components/UI/Container';
import Main from "./Pages/Main/Main";
import SignUp from './Pages/SignUp/SignUp';
import FindPassword from './Pages/FindPassword/FindPassword';
import OnLog from './Pages/OnLog/OnLog';
export const MyContext = React.createContext();

function App() {

  const [modal, setModal] = useState(false);
  const [userInfo, setUserInfo] = useState({
    id: "",
    username: "",
    hp: "",
    userType: { termType: "", period: "" },
    userValid: false,
  });
  // 0은 아이디인풋에 포커스된 상태, 1은 비밀번호인풋에 포커스된 상태
  // const [focus, setFocus] = useState(0);

  const contextValue = {
    modal,
    setModal,
    input: "",
    setInput: () => { },
    //userType : "G"(기간권),"T"(시간권)
    userInfo,
    setUserInfo,
  };

  return (
    <MyContext.Provider value={contextValue}>
      <Container className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/findPassword" element={<FindPassword />} />
            <Route path="/onLog" element={<OnLog />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </MyContext.Provider>
  );
}

export default App;