import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
const CheckOutSteps = ({ ph1, ph2, ph3, ph4 }) => {
  return (
    <Nav>
      <Nav.Item>
        {ph1 ? (
          <LinkContainer to="/login">
            <Nav.Link>Sign In</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Sign In</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {ph2 ? (
          <LinkContainer to="/shipping">
            <Nav.Link>Shipping</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Shipping</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {ph3 ? (
          <LinkContainer to="/payment">
            <Nav.Link>Payment</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Payment</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {ph4 ? (
          <LinkContainer to="/placeorder">
            <Nav.Link>Place</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Place</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckOutSteps;
