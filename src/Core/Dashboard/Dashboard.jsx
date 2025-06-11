import { useEffect, useState } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    LineChart, Line, Cell
} from 'recharts';

const Dashboard = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [healthData, setHealthData] = useState({
        totalSessions: 0,
        goodSessions: 0,
        bestWeek: ''
    });

    const [timeScoreData, setTimeScoreData] = useState([]);
    const [satisfactionData, setSatisfactionData] = useState([]);

    const getBarColor = (level) => {
        const colors = [
            '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16',
            '#22c55e', '#10b981', '#06b6d4', '#3b82f6', '#6366f1'
        ];
        return colors[level - 1];
    };

    useEffect(() => {
        const storedData = localStorage.getItem('sessionFeedbacks');
        console.log(storedData);
        if (!storedData) return;

        const parsedData = JSON.parse(storedData);
        setFeedbacks(parsedData);

        // Total sessions
        const total = parsedData.length;

        // Good sessions (rating >= 7)
        const good = parsedData.filter(f => f.rating >= 7).length;
        console.log(good);
        // Best day (grouped by date with max average rating)
        const dateMap = {};
        parsedData.forEach(({ date, rating }) => {
            if (!dateMap[date]) dateMap[date] = [];
            dateMap[date].push(rating);
        });

        let bestDay = '';
        let highestAvg = 0;
        Object.entries(dateMap).forEach(([date, ratings]) => {
            const avg = ratings.reduce((a, b) => a + b, 0) / ratings.length;
            if (avg > highestAvg) {
                highestAvg = avg;
                bestDay = date;
            }
        });

        setHealthData({
            totalSessions: total,
            goodSessions: good,
            bestWeek: bestDay
        });

        // Line Chart Data: session score by order
        setTimeScoreData(parsedData.map((session, index) => ({
            count: index + 1,
            score: session.rating
        })));

        // Bar Chart: distribution of ratings
        const counts = Array(10).fill(0);
        parsedData.forEach(session => {
            if (session.rating >= 1 && session.rating <= 10) {
                counts[session.rating - 1]++;
            }
        });

        const dist = counts.map((count, idx) => ({
            level: idx + 1,
            count
        }));

        setSatisfactionData(dist);

    }, []);

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-2 flex flex-col mt-2 mb-8">
                    🕒 Pomodoro Technique: Boost Your Focus with Time Blocks
                </h1>
                <p className="text-gray-600 text-center">
                    The Pomodoro Technique is a time management method designed to improve productivity and reduce mental fatigue. It breaks work into focused intervals—typically 25 minutes long—called Pomodoros, followed by short 5-minute breaks. After completing four Pomodoros, a longer break of 15–30 minutes helps you recharge. This technique encourages deep focus, reduces burnout, and helps you track how much real progress you're making.
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium mb-1">Total Sessions</h3>
                    <p className="text-3xl font-bold text-gray-800">{healthData.totalSessions}</p>
                    <p className="text-gray-500 text-sm mt-2">All completed therapy sessions</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium mb-1">Good Sessions</h3>
                    <p className="text-3xl font-bold text-green-600">{healthData.goodSessions}</p>
                    <p className="text-gray-500 text-sm mt-2">
                        {(healthData.goodSessions / Math.max(1, healthData.totalSessions) * 100).toFixed(0)}% positive sessions
                    </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium mb-1">Best Day</h3>
                    <p className="text-3xl font-bold text-indigo-600">{healthData.bestWeek}</p>
                    <p className="text-gray-500 text-sm mt-2">Highest satisfaction rate</p>
                </div>
            </div>

            {/* Session Score Line Chart */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Session Scores Over Time</h2>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={timeScoreData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="count" stroke="#6b7280" />
                            <YAxis stroke="#6b7280" domain={[0, 10]} />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="score"
                                stroke="#4f46e5"
                                strokeWidth={2}
                                dot={{ r: 4 }}
                                activeDot={{ r: 6 }}
                                name="Session Score"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Satisfaction Distribution Bar Chart */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mt-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Session Satisfaction Levels</h2>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={satisfactionData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="level" stroke="#6b7280" label={{ value: 'Satisfaction Level', position: 'insideBottom', offset: -5 }} />
                            <YAxis stroke="#6b7280" label={{ value: 'Session Count', angle: -90, position: 'insideLeft' }} />
                            <Tooltip />
                            <Bar
                                dataKey="count"
                                name="Sessions"
                                radius={[4, 4, 0, 0]}
                                fillOpacity={1}
                            >
                                {
                                    satisfactionData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={getBarColor(entry.level)} />
                                    ))
                                }
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
