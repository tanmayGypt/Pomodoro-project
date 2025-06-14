const StatsCard = ({ title, value, color, subtitle }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
        <p className={`text-3xl font-bold ${color}`}>{value}</p>
        <p className="text-gray-500 text-sm mt-2">{subtitle}</p>
    </div>
);

export default StatsCard;
