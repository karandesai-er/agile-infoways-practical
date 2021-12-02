import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";

function WinnerPopup({ show, onClose }) {
    return (
        <Modal show={show} onHide={onClose} centered={true}>
            <Modal.Header closeButton>
                <Modal.Title>Winner</Modal.Title>
            </Modal.Header>
            <Modal.Body>You won game…!!!</Modal.Body>
        </Modal>
    );
}

WinnerPopup.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
};

WinnerPopup.defaultProps = {
    onClose: () => {},
};

export default WinnerPopup;
