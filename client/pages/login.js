import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, Col, InputGroup } from "react-bootstrap";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { format } from "date-fns";


function Login() {
    const router = useRouter();
    const currentDate = new Date();
    const formattedDate = format(currentDate, "yyyy-MM-dd HH:mm:ss");
    const [emailNotFound, setEmailNotFound] = useState(false);
    const [incorrectPassword, setIncorrectPassword] = useState(false)
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
        setEmailNotFound(false)
        try {
            await axios
                .post("http://localhost:3001/api/signin/", user)
                .then((responce) => {
                    if (responce.data.message == "Successfully Authenticated") {
                        console.log(responce);
                        router.push("/");
                    }
                });
        } catch (err) {
            console.log(err.message);
            if(err.message == 'Request failed with status code 400') {
                console.log(400);
            }
            if(err.message == 'Request failed with status code 500'){
                console.log(500);
                setEmailNotFound(true)
            }
            if(err.message == 'Request failed with status code 401'){
                console.log(401);
                setIncorrectPassword(true)
            }
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
                    {emailNotFound && <p style={{color: "red"}}>No user exists</p> }
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
                    {incorrectPassword && <p style={{color: "red"}}>Incorrect Password</p> }
                </Form.Group>
                <Button
                    className="w-100 mt-3"
                    variant="primary"
                    type="submit"
                    onClick={handleClick}
                >
                    Login
                </Button>
            </Form>
        </div>
    );
}

export default Login;
