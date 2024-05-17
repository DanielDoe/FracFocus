import { CategoryScale, Chart as ChartJS, Filler, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import React from 'react';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

const MonthlyPercentHFJobChart2024 = ({ data }) => {
    const { chartData, stats } = React.useMemo(() => processData(data), [data]);

    function processData(data) {
        const monthlyData = {};
        const stateContributions = {};

        data.forEach(item => {
            const date = new Date(item.JobStartDate);
            const year = date.getFullYear();
            const month = date.getMonth() + 1; // JavaScript months are zero-indexed
            const percent = parseFloat(item.PercentHFJob || '0');
            const state = item.StateName;

            if (year === 2024) {
                const monthKey = `${year}-${month.toString().padStart(2, '0')}`;
                if (!monthlyData[monthKey]) {
                    monthlyData[monthKey] = [];
                }
                monthlyData[monthKey].push(percent);

                if (!stateContributions[state]) {
                    stateContributions[state] = [];
                }
                stateContributions[state].push(percent);
            }
        });

        const months = Object.keys(monthlyData).sort();
        const averages = months.map(month => {
            const data = monthlyData[month];
            return (data.reduce((sum, val) => sum + val, 0) / data.length).toFixed(2);
        });

        const stateAverages = Object.entries(stateContributions).map(([state, values]) => ({
            state,
            average: (values.reduce((sum, val) => sum + val, 0) / values.length).toFixed(2)
        })).sort((a, b) => b.average - a.average);

        const highestState = stateAverages[0] || { state: 'N/A', average: '0' };

        return {
            chartData: {
                labels: months,
                datasets: [{
                    label: 'Average Percent HF Job by Mass per Month in 2024',
                    data: averages,
                    fill: true,
                    backgroundColor: 'rgba(123, 239, 178, 0.2)',
                    borderColor: 'rgba(123, 239, 178, 1)',
                    tension: 0.4
                }]
            },
            stats: {
                highestContributingState: highestState.state,
                highestStateAverage: highestState.average
            }
        };
    }

    return (
        <div>
            <h2>Monthly Average Percent HF Job in 2024</h2>
            <Line data={chartData} options={{
                responsive: true,
                plugins: {
                    legend: { display: false },
                    tooltip: { mode: 'index', intersect: false },
                },
                scales: {
                    y: { beginAtZero: true, title: { display: true, text: 'Percent HF Job' } },
                    x: { title: { display: true, text: 'Month' } }
                }
            }} />
            <div style={{ marginTop: '20px' }}>
                <p><strong>Highest Contributing State:</strong> {stats.highestContributingState} with an average of {stats.highestStateAverage}%</p>
            </div>
        </div>
    );
};

export default MonthlyPercentHFJobChart2024;
