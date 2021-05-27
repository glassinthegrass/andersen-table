import io from "socket.io-client";
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
// import MemberContext from '../../context/MemberContext';
// import axios from "axios";

const Confirm = (props) => {

  const Msg = () => (
    <div onClick={() => handleLogin(email, password)}>
    <h1>{`Welcome ${name}, click to login`}</h1>
    </div>
  )

  const notify = () => {
    toast.info(Msg, {
      position: "top-right",
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    }

    )
  }
  const [socket, setSocket] = useState(null);
  const [joined, setJoined] = useState(false);
  const [member, setMember] = useState("");

  const history = useHistory();
  const { email, password, name } = props.history.location?.state;
  const location = {
    pathname: "/",
    state: {
      member: member,
    },
  };

  const handleSocketConnect = useCallback(() => {
    if (!socket) {
      const skt = io();
      setSocket(skt);
    }
  }, [socket]);

  const handleSocketDisconnect = useCallback(() => {
    if (socket) {
      socket.close();
      setSocket(null);
    }
  }, [socket]);

  const joinRoom = useCallback(() => {
    if (!joined && socket) {
      setJoined(true);
      socket.emit("join room", `${email}`);
    }
  }, [joined, socket, email]);

  const leaveRoom = useCallback(() => {
    if (joined && socket) {
      setJoined(false);
      socket.emit("leave room", `${email}`);
    }
  }, [socket, joined, email]);

  useEffect(() => {
    joinRoom();
    return () => {
      leaveRoom();
    };
  }, [joinRoom, leaveRoom]);

  useEffect(() => {
    handleSocketConnect();
    return () => {
      handleSocketDisconnect();
    };
  }, [handleSocketConnect, handleSocketDisconnect]);

  const handleIncomingInfo = useCallback((newMember) => {
    setMember(newMember);
  }, []);

  const setupSubscriptions = useCallback(() => {
    if (socket) {
      socket.on("new member info", handleIncomingInfo);
      socket.on("existing member info", handleIncomingInfo);
    }
  }, [handleIncomingInfo, socket]);

  const unsubscribe = useCallback(() => {
    if (socket) {
      socket.removeEventListener("new member info", handleIncomingInfo);
      socket.removeEventListener("existing member info", handleIncomingInfo);
    }
  }, [handleIncomingInfo, socket]);

  useEffect(() => {
    setupSubscriptions();
    return () => {
      unsubscribe();
    };
  }, [setupSubscriptions, unsubscribe]);

  const handleSubmit = (email, password, name) => {
    socket.emit("register", email, { email, password, name });
    notify()
  };

  const handleLogin = (email, password) => {
    socket.emit("login", email, { email, password });
  };

  useEffect(() => {
    !member.isLoggedIn ? <></> : history.push(location);
  });
  return (
    <>
      <div>
        <button onClick={() => history.go(-3)}> {`<`} </button>
      </div>
      <h1>
        Name:<span>{name}</span>
      </h1>
      <h1>
        Email: <span>{email}</span>
      </h1>
      <h1>
        Password: <span>{password}</span>
      </h1>
      <button onClick={() => handleSubmit(email, password, name)}>
        Submit?
      </button>
      {!member ? (
        <></>
      ) : (
        <>
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover>
          </ToastContainer>
        </>
      )}
    </>
  );
};

export default Confirm;
