import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis, YAxis,
} from 'recharts';

const Graph = ({ visitsByMonth }) => {
    const chartData = Object.entries(visitsByMonth || {}).map(([key, value]) => {
        const [year, month] = key.split("-");
        const date = new Date(year, month);
        const monthName = date.toLocaleString('default', { month: 'short' });
        return {
            month: `${monthName} ${year}`,
            visits: value,
        };
    });

    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="visits" fill="#4CAF50" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Graph;
