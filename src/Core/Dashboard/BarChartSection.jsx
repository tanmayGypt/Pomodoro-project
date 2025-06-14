import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, Cell, Legend } from "recharts";


const BarChartSection = ({ data }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Session Satisfaction Levels</h2>
        <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart width={730} height={250} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Rating" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Frequency" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    </div>
);

export default BarChartSection;
