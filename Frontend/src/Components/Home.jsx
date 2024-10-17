import { useState } from "react";
import { Container, Row, Col, Carousel } from "react-bootstrap";

export default function Home() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const leftImages = [
    "/Images/imagen-1.avif",
    "/Images/imagen-2.avif",
    "/Images/imagen-3.avif",
  ];

  const rightImages = [
    "/Images/imagen-1.avif",
    "/Images/imagen-2.avif",
    "/Images/imagen-3.avif",
  ];

  return (
    <Container fluid className="p-0">
      <Row className="min-vh-100">
        <Col
          xs={12}
          md={2}
          className="carousel-col d-none d-md-flex align-items-center justify-content-center p-0"
        >
          <Carousel activeIndex={index} onSelect={handleSelect}>
            {leftImages.map((image, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={image}
                  alt={`Left slide ${index + 1}`}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>

        <Col
          xs={12}
          md={8}
          className="d-flex flex-column align-items-center justify-content-center text-col"
        >
          <h1 className="text-center my-5 home-title">Welcome to Home Page</h1>
          <p className="text-center home-content">
            Esperamos que disfrute su estadia...
          </p>
        </Col>

        <Col
          xs={12}
          md={2}
          className="carousel-col d-none d-md-flex align-items-center justify-content-center p-0"
        >
          <Carousel activeIndex={index} onSelect={handleSelect}>
            {rightImages.map((image, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={image}
                  alt={`Right slide ${index + 1}`}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>
    </Container>
  );
}