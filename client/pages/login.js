import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, Col, InputGroup } from "react-bootstrap";
import { useState } from "react";
import { useRouter } from "next/router";
import { format } from "date-fns";
import axios from "./api/axios";
import config from "./config/axiosConfig";

function Login() {
    const router = useRouter();
    const currentDate = new Date();
    const formattedDate = format(currentDate, "yyyy-MM-dd HH:mm:ss");
    const [allInputs, setAllInputs] = useState(false);
    const [emailNotFound, setEmailNotFound] = useState(false);
    const [incorrectPassword, setIncorrectPassword] = useState(false);
    const [user, setUser] = useState({
        email: "",
        password: "",
        updatedAt: formattedDate,
    });

    const handleChange = (event) => {
        setUser((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    const handleClick = async (event) => {
        event.preventDefault();
        setEmailNotFound(false);
        if(user.email.length >= 1 && user.password.length >= 1){
            setAllInputs(false)
            try {
                await axios.post("/api/signin/", user, config).then((responce) => {
                    if (responce.status === 200) {
                        console.log(responce);
                        router.push("/");
                    }
                });
            } catch (err) {
                console.log(err);
                console.log(err.response.status);
                if (err.response.status === 500) {
                    setEmailNotFound(true);
                }
                if (err.response.status == 401) {
                    // setIncorrectPassword(true);
                    setEmailNotFound(true);
                }
            }
        }else{
            setAllInputs(true)
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
                    <h2 className="mb-4">Login</h2>
                    <Form.Group
                        className="mb-3 w-100"
                        as={Col}
                        md="4"
                        controlId="validationCustom01"
                    >
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            required
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={handleChange}
                        />
                        {emailNotFound && (
                            <p style={{ color: "red" }}>Email not found</p>
                        )}
                    </Form.Group>
                    <Form.Group
                        className="mb-3 w-100"
                        as={Col}
                        md="4"
                        controlId="validationCustom02"
                    >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            placeholder="Your password"
                            name="password"
                            onChange={handleChange}
                        />
                        {incorrectPassword && (
                            <p style={{ color: "red" }}>Incorrect Password</p>
                        )}
                    </Form.Group>
                    {allInputs && <p style={{ color: "red" }}>All inputs are required</p>}
                    <Button
                        className="w-100 mt-3"
                        variant="primary"
                        type="submit"
                        onClick={handleClick}
                    >
                        Login
                    </Button>
                </Form>
                <div className="d-flex justify-content-center mb-4">
                    <p>
                        Don't have an account?{" "}
                        <a href="/register">Signup now</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
