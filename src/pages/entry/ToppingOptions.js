import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

const ToppingOptions = ({ name, imagePath, updateItemCount }) => {
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        alt={`${name} topping`}
        src={`http://localhost:3030/${imagePath}`}
      />
      <Form.Group controlId={`${name}-count`}>
        <Form.Check
          type="checkbox"
          label={name}
          onChange={(e) => {
            updateItemCount(name, e.target.checked ? 1 : 0);
          }}
        />
      </Form.Group>
    </Col>
  );
};

export default ToppingOptions;
