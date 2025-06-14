import { useState } from 'react';
import Brand from './Brand';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Welcome = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  function submitHandler(e) {
    e.preventDefault();
    if (!name || !email) {
      toast.error('Please fill out both fields.');
      return;
    }

    try {
      const formData = { name, email };
      localStorage.setItem('user', JSON.stringify(formData));
      toast.success('Saved successfully!');
      setName('');
      setEmail('');
      navigate('/');
    } catch {
      toast.error('Failed to save. Please try again.');
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <Brand />
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-6">Welcome! Tell us about you</h2>

        <form onSubmit={submitHandler}>
          <div className="mb-5">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"

            />
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"

            />
          </div>

          <button
            onSubmit={submitHandler}
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md"
          >
            Submit
          </button>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Welcome;
