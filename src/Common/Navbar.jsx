import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiHome, FiClock, FiActivity, FiUser, FiLogOut } from 'react-icons/fi';
import { Transition } from '@headlessui/react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const hiddenRoutes = ['/welcome'];
    const isHiddenRoute = hiddenRoutes.includes(location.pathname);
    if (isHiddenRoute) return null;

    const navItems = [
        { path: '/', name: 'Dashboard', icon: <FiHome className="mr-2" /> },
        { path: '/pomodoro', name: 'Pomodoro', icon: <FiClock className="mr-2" /> },
        { path: '/session-history', name: 'History', icon: <FiActivity className="mr-2" /> },
        { path: '/profile', name: 'Profile', icon: <FiUser className="mr-2" /> },
    ];

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/welcome');
    };

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <FiClock className="h-8 w-8 text-indigo-600" />
                        <span className="ml-2 text-xl font-semibold text-gray-900">FocusFlow</span>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${location.pathname === item.path
                                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                                    : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300'
                                    }`}
                            >
                                {item.icon}
                                {item.name}
                            </Link>
                        ))}
                        <button
                            onClick={handleLogout}
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:text-red-800"
                        >
                            <FiLogOut className="mr-2" />
                            Logout
                        </button>
                    </div>

                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
                        >
                            {isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            <Transition
                show={isOpen}
                enter="transition ease-out duration-100 transform"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-75 transform"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <div className="md:hidden bg-white shadow-lg">
                    <div className="pt-2 pb-3 space-y-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsOpen(false)}
                                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${location.pathname === item.path
                                    ? 'bg-indigo-50 border-indigo-600 text-indigo-600'
                                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
                                    }`}
                            >
                                <div className="flex items-center">
                                    {item.icon}
                                    {item.name}
                                </div>
                            </Link>
                        ))}
                        <button
                            onClick={() => {
                                setIsOpen(false);
                                handleLogout();
                            }}
                            className="w-full text-left pl-3 pr-4 py-2 border-l-4 text-base font-medium text-red-600 hover:text-red-800"
                        >
                            <div className="flex items-center">
                                <FiLogOut className="mr-2" />
                                Logout
                            </div>
                        </button>
                    </div>
                </div>
            </Transition>
        </nav>
    );
};

export default Navbar;
