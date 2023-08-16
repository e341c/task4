import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import axios from "axios";
import { format, parseISO } from "date-fns";

function Users() {
    
    return (
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
                    <tr key={user.id}>
                        <th>
                            <input
                                type="checkbox"
                                checked={selectedItems.includes(user.id)}
                                value={user.id}
                                onChange={handleCheckbox}
                                name=""
                                id=""
                            />
                        </th>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{converTime(user.createdAt)}</td>
                        <td>{converTime(user.updatedAt)}</td>
                        <td>{user.status ? <p>Active</p> : <p>Blocked</p>}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default Users;