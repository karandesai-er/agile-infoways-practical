import { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import PropTypes from "prop-types";

function SeekNumber({ onSubmit }) {
    const [totalButtons, setTotalButtons] = useState(0);

    function handleTotalButtonsChange(event) {
        setTotalButtons(event.currentTarget.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        onSubmit(parseInt(totalButtons));
    }

    return (
        <Container>
            <Row className="vh-100 align-items-center justify-content-center">
                <Col lg={4} md={6}>
                    <Form
                        onSubmit={handleSubmit}
                        className="d-flex justify-content-between mx-3"
                    >
                        <Form.Group className="w-100">
                            <Form.Control
                                type="number"
                                value={totalButtons}
                                onChange={handleTotalButtonsChange}
                            />
                        </Form.Group>
                        <div className="px-2">
                            <button className="btn btn-success">Submit</button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

SeekNumber.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default SeekNumber;
