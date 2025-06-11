import { useState } from 'react';
import Brand from './Brand';
import Toast from '../Common/Toast';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) {
      setToast({ message: 'Please fill in all fields.', type: 'error' });
      return;
    }

    try {
      localStorage.setItem('user', JSON.stringify(formData));
      setToast({ message: 'Welcome! Details saved successfully.', type: 'success' });

      navigate("/");
      setFormData({ name: '', email: '' });
    } catch {
      setToast({ message: 'Failed to save. Please try again.', type: 'error' });
    }
  };

  const closeToast = () => setToast(null);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <Brand />
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-6">Welcome! Tell us about you</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            Submit
          </button>
        </form>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={closeToast}
        />
      )}
    </div>
  );
};

export default Welcome;
