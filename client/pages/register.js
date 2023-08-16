import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import { format } from "date-fns";
import { useRouter } from "next/router";
import axios from "axios";

function Register() {
    const router = useRouter();
    const currentDate = new Date();
    const formattedDate = format(currentDate, "yyyy-MM-dd HH:mm:ss");
    const [shortName, setShortName] = useState(false);
    const [shortPassword, setShortPassword] = useState(false);
    const [passwordMath, serPasswordMatch] = useState(false);
    const [incorrectEmail, setIncorrectEmail] = useState(false);
    const [existsEmail, setExistsEmail] = useState(false);
    const [err, setErr] = useState(false);
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        passwordMatch: "",
        createdAt: formattedDate,
        updatedAt: formattedDate,
        status: true,
    });

    const handleChange = (event) => {
        setUser((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    const handleClick = async (event) => {
        event.preventDefault();
        try {
            if (user.name.length > 2) {
                setShortName(false);
                if (user.password.length >= 1) {
                    setShortPassword(false);
                    if (user.email.indexOf("@") !== -1) {
                        setIncorrectEmail(false);
                        if (user.password == user.passwordMatch) {
                            serPasswordMatch(false);
                            await axios
                                .post("http://localhost:3001/api/signup", user)
                                .then((responce) => {
                                    console.log("Axios responce", responce);
                                    if (
                                        responce.data.message == "User successfully created"
                                    ) {
                                        router.push("/login");
                                    } else if (
                                        responce.data.message ==
                                        "User already exists"
                                    ) {
                                        setExistsEmail(true);
                                    }
                                });
                            setErr(false);
                        } else {
                            serPasswordMatch(true);
                        }
                    } else {
                        setIncorrectEmail(true);
                    }
                } else if (user.password.length == 0) {
                    setShortPassword(true);
                }
            } else {
                setShortName(true);
                setErr(true);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "100vh", background: "rgba(0,0,0,.1)" }}
        >
            <Form
                className="p-5 d-flex flex-column align-items-center"
                style={{
                    width: "600px",
                    marginTop: "-3rem",
                    background: "#fff",
                    borderRadius: "10px",
                }}
            >
                <h2 className="mb-4">Register</h2>
                <Form.Group className="mb-3 w-100" controlId="formBasicEmail">
                    <Form.Label>Your name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your name"
                        onChange={handleChange}
                        name="name"
                    />
                    {shortName && (
                        <p style={{ color: "red" }}>Name is too short</p>
                    )}
                </Form.Group>
                <Form.Group className="mb-3 w-100" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        onChange={handleChange}
                        name="email"
                    />
                    {incorrectEmail && (
                        <p style={{ color: "red" }}>Incorrect Email</p>
                    )}
                    {existsEmail && (
                        <p style={{ color: "red" }}>
                            User with that Email already exists
                        </p>
                    )}
                </Form.Group>
                <Form.Group
                    className="mb-3 w-100"
                    controlId="formBasicPassword"
                >
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter your password"
                        onChange={handleChange}
                        name="password"
                    />
                    {shortPassword && (
                        <p style={{ color: "red" }}>Password is too short</p>
                    )}
                </Form.Group>
                <Form.Group
                    className="mb-3 w-100"
                    controlId="formBasicPassword"
                >
                    <Form.Label>Repeat your password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Repeat your password"
                        onChange={handleChange}
                        name="passwordMatch"
                    />

                    {passwordMath && (
                        <p style={{ color: "red" }}>Passwords do not match</p>
                    )}
                </Form.Group>
                {err && <p style={{ color: "red" }}>Fill in the fields</p>}
                <Button
                    className="w-100 mt-3"
                    variant="primary"
                    onClick={handleClick}
                >
                    Register
                </Button>
            </Form>
        </div>
    );
}

export default Register;
