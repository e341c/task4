import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import { format } from "date-fns";
import { useRouter } from "next/router";
import axios from "../api/axios";
import config from "../config/axiosConfig";

function Register() {
    const router = useRouter();
    const currentDate = new Date();
    const formattedDate = format(currentDate, "yyyy-MM-dd HH:mm:ss");
    const [shortName, setShortName] = useState(false);
    const [shortPassword, setShortPassword] = useState(false);
    const [passwordMath, serPasswordMatch] = useState(false);
    const [incorrectEmail, setIncorrectEmail] = useState(false);
    const [existsEmail, setExistsEmail] = useState(false);
    const [allInputs, setAllInputs] = useState(false);
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
            if (user.name.length >= 1) {
                setShortName(false);
                if (user.password.length >= 1) {
                    setShortPassword(false);
                    if (user.email.indexOf("@") !== -1) {
                        setIncorrectEmail(false);
                        if (user.password === user.passwordMatch) {
                            serPasswordMatch(false);
                            await axios
                                .post("/api/signup", user, config)
                                .then((responce) => {
                                    console.log(
                                        "Axios responce",
                                        responce.status
                                    );
                                    if (responce.status === 201) {
                                        router.push("/login");
                                    }
                                });
                            setAllInputs(false);
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
                setAllInputs(true);
            }
        } catch (err) {
            if (err.status == 409) {
                setExistsEmail(true);
            } else {
                setExistsEmail(false);
            }
        }
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "100vh", background: "rgba(0,0,0,.1)" }}
        >
            <div
                style={{
                    width: "600px",
                    marginTop: "-3rem",
                    background: "#fff",
                    borderRadius: "10px",
                }}
            >
                <Form className="p-5 d-flex flex-column align-items-center">
                    <h2 className="mb-4">Register</h2>
                    <Form.Group
                        className="mb-3 w-100"
                        controlId="formBasicEmail"
                    >
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
                    <Form.Group
                        className="mb-3 w-100"
                        controlId="formBasicEmail"
                    >
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
                            <p style={{ color: "red" }}>
                                Password is too short
                            </p>
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
                            <p style={{ color: "red" }}>
                                Passwords do not match
                            </p>
                        )}
                    </Form.Group>
                    {allInputs && <p style={{ color: "red" }}>All inputs are required</p>}
                    <Button
                        className="w-100 mt-3"
                        variant="primary"
                        onClick={handleClick}
                    >
                        Register
                    </Button>
                </Form>
                <div className="d-flex justify-content-center mb-4">
                    <p>
                        Already have an account?{" "}
                        <a href="/login">Login now</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;
