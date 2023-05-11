import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from "react-redux";
import svgs from "../../commons/svgs";
import axios from "axios";
import Badge from "react-bootstrap/esm/Badge";
import cookie from "../function/cookie";
import { addMessages, setMessages } from "../../state/message";

const Chat = ({ receiverId, userName }) => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const user = useSelector((state) => state.user);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    axios
      .post(
        `https://houseofdev-mga1.onrender.com/api/messages/chat/${receiverId}`,
        { token: cookie() },
        {
          withCredentials: true,
        }
      )
      .then((messages) => dispatch(setMessages(messages.data)));

    setShow(true);
  };

  const handleSubmit = (e) => {
    const data = { text: message, senderId: user.id };
    e.preventDefault();
    axios
      .post(
        `https://houseofdev-mga1.onrender.com/api/messages/${receiverId}`,
        { token: cookie(), data },
        {
          withCredentials: true,
        }
      )
      .then((message) => dispatch(addMessages(message.data)));
  };
  return (
    <>
      {user.admin ? (
        <button className="buton-citas-admin" onClick={handleShow}>
          CHAT {svgs.message}
        </button>
      ) : (
        <>
          <button className="button-notifications" onClick={handleShow}>
            NOTIFICACIONES
            <span id="icon-notifications">{svgs.notifications}</span>
          </button>
          {messages.length == 0 ? (
            ""
          ) : (
            <Badge id="badge-grid" bg="danger">
              {messages.length}
            </Badge>
          )}
        </>
      )}

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          {user.admin ? (
            <Modal.Title>{userName}</Modal.Title>
          ) : (
            <Modal.Title>{`Mensaje de: Administrador`}</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <div>
            <div>
              {messages.map((message) => (
                <div
                  key={message.id}
                  style={{ height: "50px", margin: "20px" }}
                >
                  <p>
                    {
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-chat-square-text"
                        viewBox="0 0 16 16"
                      >
                        <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                        <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
                      </svg>
                    }
                    {` ${message.text}`}
                    <span style={{ fontSize: "10px", marginLeft: "20px" }}>
                      {`${message.createdAt.slice(
                        12,
                        19
                      )} ${message.createdAt.slice(0, 10)}`}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>
          {user.admin ? (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="text">
                <Form.Control
                  type="text"
                  placeholder="Escribe un mensaje"
                  onChange={(e) => setMessage(e.target.value)}
                  style={{ display: "flex" }}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                style={{ display: "flex" }}
              >
                Enviar
              </Button>
            </Form>
          ) : (
            ""
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Chat;
