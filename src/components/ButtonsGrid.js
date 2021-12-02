import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import cx from "classnames";
import WinnerPopup from "./WinnerPopup";

const INTERVAL_DURATION = 1000;

function ButtonsGrid({ totalButtons, onWinnerPopupClose }) {
    const [shuffledButtonIndexes, setShuffledButtonIndexes] = useState([]);
    const [redButtonIndexes, setRedButtonIndexes] = useState([]);
    const [blueButtonIndexes, setBlueButtonIndexes] = useState([]);
    const [isWinner, setIsWinner] = useState(false);

    function handleColorChange() {
        const colorChangeInterval = setInterval(() => {
            if (shuffledButtonIndexes.length) {
                const updatedRedButtonIndexes = [
                    ...redButtonIndexes,
                    shuffledButtonIndexes.pop(),
                ];
                setRedButtonIndexes(updatedRedButtonIndexes);

                clearInterval(colorChangeInterval);
            } else {
                clearInterval(colorChangeInterval);
            }
        }, INTERVAL_DURATION);
    }

    function getButtonColor(buttonIndex) {
        if (blueButtonIndexes.includes(buttonIndex)) {
            return "btn-primary";
        } else if (redButtonIndexes.includes(buttonIndex)) {
            return "btn-danger";
        }
        return "bg-white";
    }

    function handleRedButtonClick(buttonIndex) {
        if (redButtonIndexes.includes(buttonIndex)) {
            const updatedBlueButtonIndexes = [
                ...blueButtonIndexes,
                buttonIndex,
            ];
            setBlueButtonIndexes(updatedBlueButtonIndexes);
        }
    }

    useEffect(() => {
        const shuffledIndexesArray = Array.from(
            { length: totalButtons },
            (_, buttonIndex) => buttonIndex
        ).sort(() => Math.random - 0.5);
        setShuffledButtonIndexes(shuffledIndexesArray);
    }, [totalButtons]);

    useEffect(() => {
        handleColorChange();
    }, [shuffledButtonIndexes]); // eslint-disable-line

    useEffect(() => {
        handleColorChange();
    }, [redButtonIndexes]); // eslint-disable-line

    useEffect(() => {
        if (blueButtonIndexes.length === totalButtons) {
            setIsWinner(true);
        }
    }, [blueButtonIndexes]); // eslint-disable-line

    function handleWinnerPopupClose() {
        setIsWinner(false);
        onWinnerPopupClose(0);
    }

    return (
        <Container>
            <WinnerPopup show={isWinner} onClose={handleWinnerPopupClose} />
            <Row>
                {Array.from({ length: totalButtons }, (_, buttonIndex) => (
                    <Col
                        lg={3}
                        md={4}
                        cols={6}
                        key={`button-wrapper-${buttonIndex}`}
                        className="d-flex justify-content-center my-3"
                    >
                        <button
                            className={cx("btn", getButtonColor(buttonIndex))}
                            disabled={!redButtonIndexes.includes(buttonIndex)}
                            onClick={() => handleRedButtonClick(buttonIndex)}
                        >
                            Button {buttonIndex + 1}
                        </button>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

ButtonsGrid.propTypes = {
    totalButtons: PropTypes.number.isRequired,
    onWinnerPopupClose: PropTypes.func.isRequired
};

export default ButtonsGrid;
