import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import axios from "axios";

function Users() {
    const [email, setEmail] = useState('')
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
                await axios.delete("http://localhost:3001/api/delete/" + id)
            });
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    const handleUnblock = async (idArr) => {
        try {
            idArr.map(async (id) => {
                await axios.post("http://localhost:3001/api/unblock/" + id);
            });
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    const handleBlock = async (idArr) => {
        try {           
            idArr.map(async (id) => {
                await axios.post("http://localhost:3001/api/block/" + id)
            });
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const res = await axios.get("http://localhost:3001/users")
                setUsers(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllUsers();
        const userLoging = async () => {
            try {
                const res = await axios.get("http://localhost:3001/getUser")
                console.log(res);
            } catch (err) {
                console.log(err);
            }
        };
        userLoging();
    }, []);

    return (
        <div className="p-5">
            <div className="shadow-sm">
                <div>
                    <p>Selected items: {selectedItems.toString()}</p> 
                    <p>You logged in as: {}</p>
                </div>
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
                                <input
                                    type="checkbox"
                                    name=""
                                    id=""
                                    onChange={handleCheckAll}
                                />
                            </th>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Registration time</th>
                            <th>Last login time</th>
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
                                <td>{user.createdAt}</td>
                                <td>{user.updatedAt}</td>
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
            </div>
        </div>
    );
}

export default Users;
