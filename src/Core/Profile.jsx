import { useEffect, useState } from 'react';

const Profile = () => {
    const [formData, setFormData] = useState({
        fullName: 'John Doe',
        email: 'johndoe@example.com',
    });

    const [isEditing, setIsEditing] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user"));
        if (userData) {
            setFormData({ fullName: userData.name, email: userData.email });
        }
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem("user", JSON.stringify({ name: formData.fullName, email: formData.email }));
        setIsEditing(false);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
    };

    return (
        <div className="max-w-xl mx-auto mt-10 bg-white p-8 shadow rounded-lg border border-gray-200">
            <h1 className="text-2xl font-semibold mb-6 text-gray-800">Profile</h1>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                        Full Name
                    </label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm text-gray-800 focus:outline-none ${isEditing
                            ? 'border-indigo-400 focus:ring-2 focus:ring-indigo-500'
                            : 'bg-gray-100 border-gray-300 cursor-not-allowed'
                            }`}
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm text-gray-800 focus:outline-none ${isEditing
                            ? 'border-indigo-400 focus:ring-2 focus:ring-indigo-500'
                            : 'bg-gray-100 border-gray-300 cursor-not-allowed'
                            }`}
                    />
                </div>

                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        onClick={() => setIsEditing(!isEditing)}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                        {isEditing ? 'Cancel' : 'Edit'}
                    </button>
                    {isEditing && (
                        <button
                            type="submit"
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                        >
                            Update
                        </button>
                    )}
                </div>

                {success && (
                    <p className="text-green-600 text-sm mt-3">Profile updated successfully!</p>
                )}
            </form>
        </div>
    );
};

export default Profile;
