import { useState } from "react";
import ButtonsGrid from "./components/ButtonsGrid";
import SeekNumber from "./components/SeekNumber";

function App() {
    const [totalButtons, setTotalButtons] = useState(0);
    return (
        <div className="d-flex flex-column min-vh-100">
            <header className="d-flex align-items-center justify-content-center border-bottom ">
                <h1 className="h5">Agile Infoways Pvt. Ltd.</h1>
            </header>
            <main className="pt-2 bg-dark">
                {!totalButtons && (
                    <SeekNumber
                        onSubmit={setTotalButtons}
                    />
                )}
                {totalButtons && (
                    <ButtonsGrid
                        totalButtons={totalButtons}
                        onWinnerPopupClose={setTotalButtons}
                    />
                )}
            </main>
        </div>
    );
}

export default App;
