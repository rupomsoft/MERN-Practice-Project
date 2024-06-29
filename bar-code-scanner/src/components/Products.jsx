import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import productsData from "../utils/data";

const Products = () => {
  const [products] = useState(productsData);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Function to handle adding a product to the cart
  const addToCart = (product) => {
    // Check if the product is already in the cart
    const isAlreadyInCart = cart.some((item) => item.id === product.id);

    if (!isAlreadyInCart) {
      setCart([...cart, { ...product, quantity: 1 }]);
    } else {
      // If already in cart, update the quantity
      const updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    }
  };

  // Function to handle removing a product from the cart
  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
  };

  // Function to handle updating search term
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to handle auto-adding to cart when product is clicked
  const handleProductClick = (product) => {
    addToCart(product);
  };

  return (
    <Container>
      <Row className="my-4">
        <Col>
          <Form.Control
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={handleSearch} // Call handleSearch on input change
          />
        </Col>
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
                      onClick={() => handleProductClick(product)} // Call handleProductClick to add product to cart
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
                        onClick={() => removeFromCart(item.id)} // Call removeFromCart to remove product from cart
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
