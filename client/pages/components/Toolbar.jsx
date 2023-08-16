import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

function Toolbar() {
    <div className="p-3" style={{ background: "rgba(0,0,0,.1)" }}>
        <Button
            variant="warning"
            className="me-3"
            onClick={() => handleBlock(selectedItems)}
        >
            <strong>Block</strong>
        </Button>
        <Button variant="success" className="me-3">
            <img
                className="d-flex align-items-center"
                style={{
                    filter: "invert(100%)",
                    width: "23px",
                    height: "auto",
                }}
                src="/img/unlockIcon.png"
                alt=""
                onClick={() => handleUnblock(selectedItems)}
            />
        </Button>
        <Button variant="success" className="me-3">
            <img
                className="d-flex align-items-center"
                style={{
                    filter: "invert(100%)",
                    width: "23px",
                    height: "auto",
                }}
                src="/img/unlockIcon.png"
                alt=""
                onClick={() => handleUnblock(selectedItems)}
            />
        </Button>
    </div>;
}

export default Toolbar;
