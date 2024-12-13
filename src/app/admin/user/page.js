"use client";
import React from "react";

export default function page() {
    const [data, setData] = React.useState([]);
    const [modalOpen, setModalOpen] = React.useState(false);
    const [formData, setFormData] = React.useState({
        id: "",
        name: "",
        email: "",
        password: "",
        role: "",
    });

    React.useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const response = await fetch("/api/users");
        if (response.ok) {
            const jsonData = await response.json();
            setData(jsonData);
        } else {
            console.error("Failed to fetch data");
        }
    }

    const handleSubmit = async () => {
        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error("Failed to create user");
            }
            const newUser = await response.json();
            setData([...data, newUser]);
            setFormData({
                id: "",
                name: "",
                email: "",
                password: "",
                role: "",
            });
            setModalOpen(false);
        } catch (error) {
            console.error("Gabisa nambah user bang...", error);
        }
    };

    const handleDelete = async (userId) => {
        try {
            const response = await fetch(`/api/users/${userId}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Failed to delete user");
            }
            setData(data.filter((user) => user.id !== userId));
        } catch (error) {
            console.error("Gagal menghapus user bang...", error);
        }
    };

    const handleEdit = (user) => {
        setFormData(user);
        setModalOpen(true);
    };

    return (
        <div className="p-2 lg:p-8 flex flex-col space-y-6">
            <h1 className="text-2xl font-bold">Users</h1>
            <div className="flex justify-end">
                <button
                    className="py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded-md"
                    onClick={() => setModalOpen(true)}
                >
                    Add
                </button>
            </div>
            {data.length > 0 ? (
                <table className="mt-4">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="py-2 px-3">ID</th>
                            <th className="text-left py-2 px-3">Name</th>
                            <th className="text-left py-2 px-3">Email</th>
                            <th className="text-left py-2 px-3">Role</th>
                            <th className="py-2 px-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((user) => (
                            <tr
                                key={user.id}
                                className="capitalize odd:bg-inherite even:bg-black/10"
                            >
                                <td className="py-2 px-3 text-center">
                                    {user.id}
                                </td>
                                <td className="py-2 px-3">{user.name}</td>
                                <td className="py-2 px-3 lowercase">
                                    {user.email}
                                </td>
                                <td className="py-2 px-3">{user.role}</td>
                                <td className="py-2 px-3 flex justify-center space-x-3">
                                    <button
                                        className="py-1 px-2 bg-blue-500 text-white rounded-md"
                                        onClick={() => handleEdit(user)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="py-1 px-2 bg-red-500 text-white rounded-md"
                                        onClick={() => handleDelete(user.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-center">Wait...</p>
            )}

            {/* Modal form */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                    <div className="p-6 rounded-md w-1/2 border backdrop-blur-sm">
                        <h2 className="text-lg font-semibold mb-4">
                            {formData.id ? "Edit User" : "Add User"}
                        </h2>
                        <form
                            onSubmit={handleSubmit}
                            className="w-full inset-4 lg:w-4/5 mx-auto"
                        >
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            name: e.target.value,
                                        })
                                    }
                                    className="w-full border rounded px-3 py-2 bg-black/30"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            email: e.target.value,
                                        })
                                    }
                                    className="w-full border rounded px-3 py-2 bg-black/30"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            password: e.target.value,
                                        })
                                    }
                                    className="w-full border rounded px-3 py-2 bg-black/30"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">
                                    Role
                                </label>
                                <select
                                    value={formData.role}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            role: e.target.value,
                                        })
                                    }
                                    className="w-full border rounded px-3 py-2 bg-black/30"
                                    required
                                >
                                    <option></option>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                            </div>
                            <div className="flex space-x-4 justify-end">
                                <button
                                    onClick={() => setModalOpen(false)}
                                    className="text-gray-100 hover:text-gray-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="py-2 px-4 bg-blue-500 text-white rounded-md"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
