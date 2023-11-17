import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from "./AdminLayout";
import '../css/accountlist.css'; // Import CSS file

const AccountList = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [roleId, setRoleId] = useState('');
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        fetchUsers();
        fetchRoles();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('/api/users');
            setUsers(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchRoles = async () => {
        try {
            const response = await axios.get('/api/roles'); 
            setRoles(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const selectUser = (user) => {
        setSelectedUser(user);
        setUsername(user.username);
        setPassword(user.password);
        setRoleId(user.roleid);
    };

    const clearForm = () => {
        setSelectedUser(null);
        setUsername('');
        setPassword('');
        setRoleId('');
    };

    const saveUser = async () => {
        try {
            if (selectedUser) {
                await axios.put(`/api/users/${selectedUser.id}`, {
                    username,
                    password,
                    roleid: roleId,
                });
            } else {
                await axios.post('/api/users', {
                    username,
                    password,
                    roleid: roleId,
                });
            }
            fetchUsers();
            clearForm();
        } catch (error) {
            console.error(error);
        }
    };

    const deleteUser = async (id) => {
        try {
            await axios.delete(`/api/users/${id}`);
            fetchUsers();
            clearForm();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <AdminLayout></AdminLayout>
            <div className="account-list">
                <div>
                    <h2>{selectedUser ? 'Edit User' : 'Create User'}</h2>
                    <form onSubmit={saveUser}>
                        <label>UserName:</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <label>Password:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <label>Role:</label>
                        <select value={roleId} onChange={(e) => setRoleId(e.target.value)}>
                            <option value="">Select Role</option>
                            {roles.map((role) => (
                                <option key={role.id} value={role.id}>
                                    {role.name}
                                </option>
                            ))}
                        </select>
                        <button type="submit">Save</button>
                        <button type="button" onClick={clearForm}>Cancel</button>
                    </form>
                </div>
                <h1>Account List</h1>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Password</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.username}</td>
                                    <td>{user.password}</td>
                                    <td>{user.roleid}</td>
                                    <td>
                                        <button onClick={() => selectUser(user)}>Edit</button>
                                        <button onClick={() => deleteUser(user.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default AccountList;