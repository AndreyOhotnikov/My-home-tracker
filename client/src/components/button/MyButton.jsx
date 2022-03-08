import React from "react";
import { Button } from "react-bootstrap";

const MyButton = ({children , ...props}) => {

  return <Button {...props}  variant="warning">{children}</Button>
}
export default MyButton;
