import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import useScanDetection from "use-scan-detection";
import productsData from "../utils/data";

const Products = () => {
  const [products] = useState(productsData);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const addToCart = (barcode) => {
    const product = productsData.find(
      (productItem) =>
        productItem.barcode.toLowerCase().toString() ===
        barcode.toLowerCase().toString()
    );

    if (!product) {
      window.alert("No Barcode Product Found");
      return;
    }

    const isAlreadyInCart = cart.some((item) => item.barcode === barcode);

    if (!isAlreadyInCart) {
      setCart([...cart, { ...product, quantity: 1 }]);
    } else {
      const updatedCart = cart.map((item) =>
        item.barcode === barcode
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updatedCart);
    }
  };

  const removeFromCart = (barcode) => {
    const updatedCart = cart.filter((item) => item.barcode !== barcode);
    setCart(updatedCart);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProductClick = (barcode) => {
    addToCart(barcode);
  };

  const barcodeHandler = async (barcode) => {
    addToCart(barcode);
  };

  /**
   * searching barcode
   */
  useScanDetection({
    onComplete: (barcode) => {
      barcodeHandler(barcode);
    },
    minLength: 13,
  });

  return (
    <Container>
      <Row className="my-4">
        <Col>
          <Form.Control
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </Col>
        <input type="text" autoFocus hidden />
      </Row>

      <Row>
        <Col md={6}>
          <h2 className="my-4">Product List</h2>
          <Row>
            {filteredProducts.map((product) => (
              <Col md={6} key={product.id} className="mb-4">
                <Card>
                  <Card.Img variant="top" src={product.image} />
                  <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>Price: ${product.price}</Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => handleProductClick(product.barcode)}
                    >
                      Add to Cart
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>

        <Col md={6}>
          <h2 className="my-4">Cart</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <Row>
              {cart.map((item, index) => (
                <Col md={6} key={index} className="mb-4">
                  <Card className="h-100">
                    <Card.Img variant="top" src={item.image} />
                    <Card.Body>
                      <Card.Title>{item.title}</Card.Title>
                      <Card.Text>Price: ${item.price}</Card.Text>
                      <Card.Text>Quantity: {item.quantity}</Card.Text>
                      <Button
                        variant="danger"
                        onClick={() => removeFromCart(item.barcode)}
                      >
                        Remove
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Products;
