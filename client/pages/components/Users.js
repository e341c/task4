import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import axios from "../api/axios";
import config from "../config/axiosConfig";

function Users() {
    const [auth, setAuth] = useState(false)
    const [userAuth, setUserAuth] = useState([])
    const [users, setUsers] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

    function handleCheckbox(e) {
        let isSelected = e.target.checked;
        let value = e.target.value;

        if (isSelected) {
            setSelectedItems([...selectedItems, value]);
        } else {
            setSelectedItems((prevData) => {
                return prevData.filter((id) => {
                    return id !== value;
                });
            });
        }
    }

    function handleCheckAll() {
        if (users.length === selectedItems.length) {
            setSelectedItems([]);
        } else {
            const usersIds = users.map((user) => {
                return user._id;
            });

            setSelectedItems(usersIds);
        }
    }

    const handleDelete = async (idArr) => {
        try {
            idArr.map(async (id) => {
                await axios.delete("/users/delete/" + id, config)
            });
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    const handleUnblock = async (idArr) => {
        
        try {
            idArr.map(async (id) => {
                await axios.post("/users/unblock/" + id, config).then(response => {
                    console.log(response);
                })
            });
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    const handleBlock = async (idArr) => {
        try {           
            idArr.map(async (id) => {
                await axios.post("/users/block/" + id, config)
            });
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const res = await axios.get("/users", config)
                setUsers(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        const userLogin = async () => {
            try {
                const res = await axios.get("/getuser", config)
                setUserAuth(res.data)
                setAuth(res.data.status)
            } catch (err) {
                console.log(err);
            }
        };
        userLogin();
        fetchAllUsers();
    }, []);

    return (
        <div className="p-5">
            {auth && <div className="shadow-sm">
                <div className="p-3" style={{ background: "rgba(0,0,0,.1)" }}>
                    <div className="d-flex justify-content-between">
                        <p>Selected items: {selectedItems.toString()}</p> 
                        <p>You logged in as: {userAuth.email}</p>
                    </div>
                    <Button
                        variant="warning"
                        className="me-3"
                        onClick={() => handleBlock(selectedItems)}
                    >
                        <strong style={{color: "rgba(1,1,1,0.7)"}}>Block</strong>
                    </Button>
                    <Button variant="success" className="me-3">
                        <img
                            className="d-flex align-items-center"
                            style={{
                                filter: "invert(100%)",
                                width: "23px",
                                height: "auto",
                            }}
                            src="/unlockIcon.png"
                            alt=""
                            onClick={() => handleUnblock(selectedItems)}
                        />
                    </Button>
                    <Button variant="danger" className="me-3">
                        <img
                            className="d-flex align-items-center"
                            style={{
                                filter: "invert(100%)",
                                width: "23px",
                                height: "auto",
                            }}
                            src="/deleteIcon.png"
                            alt=""
                            onClick={() => handleDelete(selectedItems)}
                        />
                    </Button>
                </div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>
                                <input type="checkbox" onChange={handleCheckAll}/>
                            </th>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Registration time UTC</th>
                            <th>Last login time UTC</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <th>
                                    <input
                                        type="checkbox"
                                        checked={selectedItems.includes(
                                            user._id
                                        )}
                                        value={user._id}
                                        onChange={handleCheckbox}
                                        name=""
                                        id=""
                                    />
                                </th>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.createdAt.replace(/\.\d+/, "")}</td>
                                <td>{user.updatedAt.replace(/\.\d+/, "")}</td>
                                <td>
                                    {user.status ? (
                                        <p>Active</p>
                                    ) : (
                                        <p>Blocked</p>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>}
            {!auth && <div className="d-flex justify-content-center">
                <h2>To see table of users you need to <a href="/login">login</a> or <a href="/register">register</a></h2>
            </div> }
        </div>
    );
}

export default Users;
