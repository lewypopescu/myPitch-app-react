import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import HomePage from "../pages/HomePage/HomePage";
import LiveGamePage from "../pages/LiveGamePage/LiveGamePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import Header from "../components/Header/Header";
import GlobalStyle from "../styles/GlobalStyle";
import { setUsername } from "../store/userSlice";

const App = () => {
  const user = useSelector((state) => state.user.username);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogin = (username) => {
    dispatch(setUsername(username));
    navigate("/home");
  };

  return (
    <>
      <GlobalStyle />
      <Header />
      <Routes>
        {!user ? (
          <Route path="/" element={<LoginPage setUser={handleLogin} />} />
        ) : (
          <>
            <Route path="/home" element={<HomePage />} />
            <Route path="/game/:gameId" element={<LiveGamePage />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;
