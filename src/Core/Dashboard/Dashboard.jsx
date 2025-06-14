import { useEffect, useState } from 'react';
import StatsCard from './StatsCard';
import LineChartSection from './LineChartSection';
import BarChartSection from './BarChartSection';

const Dashboard = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [healthData, setHealthData] = useState({ totalSessions: 0, goodSessions: 0, bestWeek: '' });
    const [timeScoreData, setTimeScoreData] = useState([]);
    const [satisfactionData, setSatisfactionData] = useState([]);

    useEffect(() => {
        const storedData = localStorage.getItem('sessionFeedbacks');
        if (!storedData) return;
        const parsedData = JSON.parse(storedData);

        setFeedbacks(parsedData);
        const total = parsedData.length;
        const good = parsedData.filter(f => f.rating >= 7).length;

        const barChartData = Array(10).fill(0);
        let bestDay = '';
        let highestAvg = 0;
        console.log(parsedData);


        let timeData = [];
        parsedData.forEach((element, i) => {
            if (element.rating >= highestAvg) {
                bestDay = element.date;
            }
            timeData.push({ count: i + 1, score: element.rating });
            if (element.rating >= 1 && element.rating <= 10) {
                barChartData[element.rating - 1]++;
            }
        });

        setHealthData({ totalSessions: total, goodSessions: good, bestWeek: bestDay ? bestDay : "No Best Day" });


        const mybarData = barChartData.map((frequency, index) => ({
            Rating: index + 1,
            Frequency: frequency,
        }));

        console.log(mybarData)

        setTimeScoreData(timeData);
        setSatisfactionData(mybarData);
    }, []);

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">🕒 Pomodoro Technique</h1>
                <p className="text-gray-600">
                    A focus-boosting method using time blocks: 25 minutes of work followed by 5-minute breaks.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatsCard title="Total Sessions" value={healthData.totalSessions} color="text-gray-800" subtitle="All completed sessions" />
                <StatsCard title="Good Sessions" value={healthData.goodSessions} color="text-green-600" subtitle={`${(healthData.goodSessions / Math.max(1, healthData.totalSessions) * 100).toFixed(0)}% positive`} />
                <StatsCard title="Best Day" value={healthData.bestWeek} color="text-indigo-600" subtitle="Highest satisfaction rate" />
            </div>

            <LineChartSection data={timeScoreData} />
            <BarChartSection data={satisfactionData} />
        </div>
    );
};

export default Dashboard;
