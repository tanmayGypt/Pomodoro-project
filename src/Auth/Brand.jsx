import { FiClock } from 'react-icons/fi';

const Brand = () => {
    return (
        <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 flex items-center justify-center bg-gray-100 rounded-full mb-4">
                <FiClock className="text-indigo-600" size={48} />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">FocusFlow</h1>
        </div>
    );
};

export default Brand;
