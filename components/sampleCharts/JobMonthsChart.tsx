import React from 'react';
import { Bar } from 'react-chartjs-2';

const JobMonthsChart = ({ data }) => {
    const { chartData, stats } = React.useMemo(() => processData(data), [data]);

    function processData(data) {
        const filteredData = data.filter(item => {
            const date = new Date(item.JobStartDate);
            return date.getFullYear() === 2024;
        });

        const monthlyData = Array.from({ length: 12 }, () => ({ count: 0, totalDuration: 0, states: {} }));
        let totalDuration = 0;
        let jobCounts = 0;
        let maxDuration = 0;
        const stateCounts = {};

        filteredData.forEach(item => {
            const date = new Date(item.JobStartDate);
            const month = date.getMonth();  // Month as a zero-indexed value
            const duration = (new Date(item.JobEndDate) - date) / (1000 * 60 * 60 * 24);  // Duration in days
            maxDuration = Math.max(maxDuration, duration);
            totalDuration += duration;
            jobCounts++;

            monthlyData[month].count++;
            monthlyData[month].totalDuration += duration;

            const state = item.StateName;
            monthlyData[month].states[state] = (monthlyData[month].states[state] || 0) + 1;
            stateCounts[state] = (stateCounts[state] || 0) + 1;
        });

        const months = Array.from({ length: 12 }, (_, i) => `2024-${i + 1}`);
        const counts = monthlyData.map(month => month.count);
        const averageJobDuration = totalDuration / jobCounts;
        const averageJobsPerMonth = jobCounts / 12;

        const mostJobsState = Object.keys(stateCounts).length > 0 ?
            Object.keys(stateCounts).reduce((a, b) => stateCounts[a] > stateCounts[b] ? a : b) : 'N/A';

        return {
            chartData: {
                labels: months,
                datasets: [{
                    label: 'Number of Jobs per Month in 2024',
                    backgroundColor: '#4CAF50',
                    data: counts,
                }]
            },
            stats: {
                averageJobsPerMonth,
                averageJobDuration,
                maxDuration,
                mostJobsState
            }
        };
    }

    return (
        <div style={{ width: '100%', height: '400px' }}>
            <h2>Job Count by Month in 2024</h2>
            <Bar
                data={chartData}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }}
            />
            {stats && (
                <div style={{ marginTop: '20px' }}>
                    <p><strong>Average Jobs per Month:</strong> {stats.averageJobsPerMonth.toFixed(2)}</p>
                    <p><strong>Average Job Duration (days):</strong> {stats.averageJobDuration.toFixed(2)}</p>
                    <p><strong>Maximum Job Duration (days):</strong> {stats.maxDuration.toFixed(2)}</p>
                    <p><strong>State with Most Jobs:</strong> {stats.mostJobsState}</p>
                </div>
            )}
        </div>
    );
};

export default JobMonthsChart;
