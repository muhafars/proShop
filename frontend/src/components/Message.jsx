import { Alert } from "react-bootstrap";

const Message = ({ variant, children }) => {
  return <Alert variant={variant}>{children}</Alert>;
};

// so basically variant props is red, blue, black, white
// children is anything that will wrap into message
// and dont forget add default variant

Message.defaultProps = {
  variant: "info",
};

export default Message;
