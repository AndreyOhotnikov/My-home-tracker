import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import Button from "@mui/material/Button";
import { signup_UserReducer } from "../../store/actionCreators/userAC";
import { types } from "../../store/types/userTypes";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import { IconButton } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

const Signup = () => {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");
  const [idHome, setIdHome] = useState(0);
  const [predsedatel, setPredsedatel] = useState(true);
  const [photoIsChairman, setPhotiIsChairman] = useState([]);

  const dispatche = useDispatch();
  const navigate = useNavigate();
  const logUp = async (e) => {
    e.preventDefault();
    const isValid =
      /[A-Za-z]\w+/.test(name) &&
      /^[A-Z0-9a-z._%+-]+@[A-Z0-9a-z.-]+\.[A-Za-z]{2,}$/.test(email);
    if (idHome && isValid) {
      dispatche({
        type: types.SIGN_UP_USER_SAGA,
        user: { name, email, pass, idHome, isChairman: !predsedatel },
      });
      navigate("/GlobalNews");
    } else if (isValid) {
      dispatche(
        signup_UserReducer({
          name,
          email,
          pass,
          isChairman: !predsedatel,
          photoIsChairman: [...photoIsChairman],
        }),
      );
      navigate("/locationHome");
    } else if (!/^[A-Za-z]\w+$/.test(name)) alert("введи нормально логин");
    else if (!/^[A-Z0-9a-z._%+-]+@[A-Z0-9a-z.-]+\.[A-Za-z]{2,}$/.test(email))
      alert("введи нормально email");
  };

  return (
    <form id="signupForm" method="POST" action="" style={{ marginTop: "70px" }}>
      <div>
        <h2 id="formTitle">Регистрация</h2>
        <TextField
          id="username"
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Enter name"
          name="name"
          required
          pattern="[A-Za-z]\w+"
          title="Латинские буквы, цифры и _"
        />
        <TextField
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          type="text"
          placeholder="Enter e-mail"
          name="email"
          required
          pattern="^[A-Z0-9a-z._%+-]+@[A-Z0-9a-z.-]+\.[A-Za-z]{2,}$"
        />
        <TextField
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="Enter Password"
          name="password"
          required
        />
        <div className="post_content">
          <span>Войти как председатель</span>
          <Form.Check.Input
            type="checkbox"
            id={`check-api-checkbox`}
            name="checkbox"
            value="checkbox"
            onChange={() => setPredsedatel(!predsedatel)}
          />
        </div>
        {predsedatel ? (
          <TextField
            style={{ width: "300px" }}
            onChange={(e) => setIdHome(e.target.value)}
            type="number"
            placeholder={"Введите id своего дома"}
          />
        ) : (
          <label htmlFor="icon-button-file">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera />
            </IconButton>
            <Box component="span">Выберите фото</Box>
            <input
              onChange={(e) => setPhotiIsChairman(e.target.files)}
              style={{ display: "none" }}
              accept="image/*"
              id="icon-button-file"
              type="file"
              multiple
            />
          </label>
        )}
        <Button onClick={(e) => logUp(e)} variant="outlined">
          Регистрация
        </Button>
      </div>
    </form>
  );
};

export default Signup;
