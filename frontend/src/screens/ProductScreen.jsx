import { Link, useParams, useNavigate } from "react-router-dom";
import { Form, Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
// import axios from "axios";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";
import { addToCart } from "../slices/cartSlice";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProductScreen = () => {
  /**   const [product, setProduct] = useState({});
  const { id: productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${productId}`);
      setProduct(data);
    };
    fetchProduct();
  }, [productId]);  */

  const { id: productId } = useParams();
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);
  // console.log([...Array(product.countInStock).keys()]);
  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };
  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.message || error.error} </Message>
      ) : (
        <Row>
          <Col md={5}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={4}>
            <ListGroup>
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating value={product.rating} text={`${product.numReviews} Reviews`} />
              </ListGroup.Item>
              <ListGroup.Item>Price: {product.price}</ListGroup.Item>
              <ListGroup.Item>
                <h5>Description:</h5>
                {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <h5>Price:</h5>
                    </Col>
                    <Col>
                      <strong>$ {product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <h5>Status:</h5>
                    </Col>
                    <Col>
                      <strong>{product.countInStock > 0 ? "In Stock" : "Out of Stock"}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                {/* set qty  */}
                {product.countInStock >= 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <h5>Qty:</h5>
                      </Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={e => setQty(Number(e.target.value))}
                        >
                          {[...Array(product.countInStock).keys()].map(x => (
                            <option key={x + 1} value={x + 1} disabled={product.countInStock <= 0}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button
                    className="button-block"
                    type="button"
                    disabled={product.countInStock === 0}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
