import React, { useState } from "react";
import Button from "@mui/material/Button";

const ws = new WebSocket("ws://localhost:3010");

const InputMessage = () => {
  //const initState = { value: "" };
  const [value, setValue] = useState("");

  const onChangeHandler = (event) => {
    const { value } = event.target;
    console.log(event.target.value);
    setValue(value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    //const text = { ...value };
    const text = value;
    console.log(text);
    ws.send(JSON.stringify(text));
    setValue("");
  };
  

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <input
          value={value}
          onChange={onChangeHandler}
          placeholder="&#128172;  Пообщайтесь со своими соседями"
          style={{
            width: "90%",
            height: "20px",
            borderRadius: "7px",
            textAlign: "left",
            padding: "5px",
            marginBottom: "3px",
          }}
        ></input>
        <div>
          <Button
          type="submit"
            variant="outlined"
            size="small"
            color="secondary"
            sx={{ borderRadius: 3, position: "absolute", left: "55%" }}
          >
            Отправить
          </Button>
        </div>
      </form>
    </div>
  );
};

export default InputMessage;
