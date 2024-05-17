import React from 'react';
import { Line } from 'react-chartjs-2';

const StatePercentHFJobChart = ({ data }) => {
    const { chartData, stats } = React.useMemo(() => processData(data), [data]);

    function processData(data) {
        const yearlyStats = {};
        data.forEach(item => {
            const year = new Date(item.JobStartDate).getFullYear();
            if (!yearlyStats[year]) {
                yearlyStats[year] = {
                    totalPercent: 0,
                    count: 0
                };
            }
            yearlyStats[year].totalPercent += parseFloat(item.PercentHFJob || '0');
            yearlyStats[year].count += 1;
        });

        const labels = Object.keys(yearlyStats).sort();
        const averages = labels.map(year => {
            const data = yearlyStats[year];
            return (data.totalPercent / data.count).toFixed(2);
        });

        return {
            chartData: {
                labels,
                datasets: [{
                    label: 'Average Percent HF Job by Mass per Year',
                    data: averages,
                    fill: true,
                    backgroundColor: 'rgba(75,192,192,0.2)',
                    borderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: 'rgba(75,192,192,1)',
                    tension: 0.4
                }]
            },
            stats: {
                maxAverage: Math.max(...averages),
                minAverage: Math.min(...averages),
                latestAverage: averages[averages.length - 1],
                yearsRecorded: labels.length
            }
        };
    }

    return (
        <div>
            <h2>Yearly Average Percent HF Job by Mass</h2>
            <Line data={chartData} options={{
                responsive: true,
                plugins: {
                    legend: { display: false },
                    tooltip: { mode: 'index', intersect: false },
                },
                scales: {
                    y: { beginAtZero: true }
                }
            }} />
            <div style={{ marginTop: '20px' }}>
                <p><strong>Maximum Average Percent HF Job:</strong> {stats.maxAverage}%</p>
                <p><strong>Minimum Average Percent HF Job:</strong> {stats.minAverage}%</p>
                <p><strong>Most Recent Year Average Percent HF Job:</strong> {stats.latestAverage}%</p>
                <p><strong>Total Years Recorded:</strong> {stats.yearsRecorded}</p>
            </div>
        </div>
    );
};

export default StatePercentHFJobChart;
