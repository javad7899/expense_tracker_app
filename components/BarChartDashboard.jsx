import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis } from "recharts";

const BarChartDashboard = ({ budgetList = [] }) => {
    return (
        <div className="border rounded-lg p-5 flex items-center justify-center flex-col">
            <h2 className="font-bold text-xl mb-4">Activity</h2>
            <BarChart 
                width={500} 
                height={300} 
                data={budgetList} 
                margin={{ top: 5, left: 5, bottom: 5, right: 5 }}
            >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="totalSpend" stackId="a" fill="#4845b2"/>
                <Bar dataKey="amount" stackId="a" fill="#c3c2ff" />
            </BarChart>
        </div>
    );
};

export default BarChartDashboard;
