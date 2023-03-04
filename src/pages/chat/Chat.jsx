import React, { useEffect, useState } from "react";
import "./Chat.css";
import io from "socket.io-client";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import axiosClient from "../../components/axios/axios";

const socket = io("https://asm3-webshopping.onrender.com", {
  transports: ["websocket"],
});

function Chat(props) {
  const [listChat, setListChat] = useState([]);
  const [selectRoom, setSelectRoom] = useState("");
  const [message, setMessage] = useState([]);
  const [load, setLoad] = useState(true);
  const [textMessage, setTextMessage] = useState("");

  //get list roomchat
  useEffect(() => {
    axiosClient
      .get(`/chat/roomOpen`)
      .then((res) => {
        // console.log(res.data);
        setListChat(res.data);
      })
      .catch((err) => console.log(err));
  }, [load]);

  //get message
  useEffect(() => {
    if (selectRoom !== "") {
      axiosClient
        .get(`/chat/room/${selectRoom}`)
        .then((res) => {
          if (res.data.isEnd) {
            setTextMessage("");
            setSelectRoom("");
            setMessage([]);
            return;
          }
          setMessage(res.data);
          // console.log(res.data.message);
        })
        .catch((err) => console.log(err));
      setLoad(false);
    }
  }, [selectRoom, load]);

  //Hàm này dùng để nhận socket từ server gửi lên
  useEffect(() => {
    //Nhận dữ liệu từ server gửi lên thông qua socket với key receive_message
    socket.on("receive_message", (data) => {
      //Sau đó nó sẽ setLoad gọi lại hàm useEffect lấy lại dữ liệu
      setLoad(true);
    });
  }, []);

  // Hàm này dùng để gửi tin nhắn cho khách hàng
  const handlerSend = async () => {
    if (!selectRoom || textMessage === "") {
      return;
    }

    const data = {
      message: textMessage,
      roomId: selectRoom,
      isAdmin: true,
    };

    if (textMessage.toLowerCase() === "/end") {
      localStorage.removeItem("roomId");
      setTextMessage("");
      setSelectRoom("");
      setMessage([]);
      setLoad(true);
    }

    //Sau đó nó emit dữ liệu lên server bằng socket với key send_message và value data
    socket.emit("send_message", data);

    //Tiếp theo nó sẽ postdata lên api đưa dữ liệu vào database
    axiosClient
      .put(`/chat/addMessage`, data)
      .then((res) => {
        // console.log(res.data);
        //Sau đó gọi hàm setLoad để useEffect lấy lại dữ liệu sau khi update
        setLoad(true);
        setTextMessage("");
      })
      .catch((err) => console.log(err));
  };

  //render
  return (
    <div
      id="main-wrapper"
      data-theme="light"
      data-layout="vertical"
      data-navbarbg="skin6"
      data-sidebartype="full"
      data-sidebar-position="fixed"
      data-header-position="fixed"
      data-boxed-layout="full"
    >
      <Header />
      <Sidebar />
      <div className="page-wrapper d-block">
        <div className="page-breadcrumb">
          <div className="row">
            <div className="col-7 align-self-center">
              <h4 className="page-title text-truncate text-dark font-weight-medium mb-1">
                Chat
              </h4>
              <div className="d-flex align-items-center">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb m-0 p-0">
                    <li
                      className="breadcrumb-item text-muted active"
                      aria-current="page"
                    >
                      Apps
                    </li>
                    <li
                      className="breadcrumb-item text-muted"
                      aria-current="page"
                    >
                      Chat
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="row no-gutters">
                  <div className="col-lg-3 col-xl-2 border-right">
                    <div
                      className="scrollable position-relative"
                      style={{ height: "calc(70vh - 90px)" }}
                    >
                      <ul className="mailbox list-style-none">
                        <li>
                          <div className="message-center">
                            {listChat &&
                              listChat.map((value) => (
                                <span
                                  key={value._id}
                                  onClick={() => setSelectRoom(value._id)}
                                  className="message-item d-flex align-items-center border-bottom px-3 py-2 active_user"
                                >
                                  <div className="user-img">
                                    {" "}
                                    <img
                                      src="https://img.icons8.com/color/36/000000/administrator-male.png"
                                      alt="user"
                                      className="img-fluid rounded-circle"
                                      width="40px"
                                    />{" "}
                                    <span className="profile-status away float-right"></span>
                                  </div>
                                  <div className="w-75 d-inline-block v-middle pl-2">
                                    <h6 className="message-title mb-0 mt-1">
                                      {value.userId.fullName}
                                    </h6>
                                    <span className="font-12 text-nowrap d-block text-muted text-truncate">
                                      Online
                                    </span>
                                  </div>
                                </span>
                              ))}
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-9  col-xl-10">
                    <div
                      className="chat-box scrollable position-relative"
                      style={{ height: "calc(70vh - 90px)" }}
                    >
                      <ul className="chat-list list-style-none px-3 pt-3">
                        {message &&
                          message.message?.map((value) =>
                            value.isAdmin ? (
                              <li
                                className="chat-item odd list-style-none mt-3"
                                key={value._id}
                              >
                                <div className="chat-content text-right d-inline-block pl-3">
                                  <div className="box msg p-2 d-inline-block mb-1">
                                    {value.message}
                                  </div>
                                  <br />
                                </div>
                              </li>
                            ) : (
                              <li
                                className="chat-item list-style-none mt-3"
                                key={value._id}
                              >
                                <div className="chat-img d-inline-block">
                                  <img
                                    src="https://img.icons8.com/color/36/000000/administrator-male.png"
                                    alt="user"
                                    className="rounded-circle"
                                    width="45"
                                  />
                                </div>
                                <div className="chat-content d-inline-block pl-3">
                                  <h6 className="font-weight-medium">
                                    {message.userId.fullName}
                                  </h6>
                                  <div className="msg p-2 d-inline-block mb-1">
                                    {value.message}
                                  </div>
                                </div>
                                <div className="chat-time d-block font-10 mt-1 mr-0 mb-3"></div>
                              </li>
                            )
                          )}
                      </ul>
                    </div>
                    <div className="card-body border-top">
                      <div className="row">
                        <div className="col-9">
                          <div className="input-field mt-0 mb-0">
                            <input
                              id="textarea1"
                              placeholder="Type and enter"
                              className="form-control border-0"
                              type="text"
                              onChange={(e) => setTextMessage(e.target.value)}
                              value={textMessage}
                              onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                  handlerSend();
                                }
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-3">
                          <span
                            className="btn-circle btn-lg btn-cyan float-right text-white"
                            onClick={handlerSend}
                          >
                            <i className="fas fa-paper-plane"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="footer text-center"></footer>
      </div>
    </div>
  );
}

export default Chat;
