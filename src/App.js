import React, { useState } from "react";
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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

  const contextValue = {
    modal,
    setModal,
    input: "",
    setInput: () => { },
    //userType : "G"(기간권),"T"(시간권)
    userInfo,
    setUserInfo
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