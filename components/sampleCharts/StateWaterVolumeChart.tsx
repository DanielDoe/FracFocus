import React from 'react';
import { Bar } from 'react-chartjs-2';

const StateWaterVolumeChart = ({ data }) => {
    const { chartData, stats } = React.useMemo(() => processData(data), [data]);

    function processData(data) {
        const stateData = {};
        data.forEach(item => {
            const state = item.StateName;
            const volume = parseInt(item.TotalBaseWaterVolume || '0', 10);

            if (!stateData[state]) {
                stateData[state] = {
                    totalVolume: 0,
                    jobCount: 0,
                    wells: new Set()
                };
            }
            stateData[state].totalVolume += volume;
            stateData[state].jobCount += 1;
            stateData[state].wells.add(item.WellName);
        });

        const sortedStates = Object.entries(stateData)
            .sort((a, b) => b[1].totalVolume - a[1].totalVolume)
            .slice(0, 5);

        return {
            chartData: {
                labels: sortedStates.map(s => s[0]),
                datasets: [{
                    label: 'Total Base Water Volume',
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                    data: sortedStates.map(s => s[1].totalVolume),
                }]
            },
            stats: sortedStates.map(s => ({
                state: s[0],
                totalWaterUsed: s[1].totalVolume.toLocaleString(),
                totalJobs: s[1].jobCount,
                totalWells: s[1].wells.size
            }))
        };
    }

    return (
        <div>
            <h2>Top 5 States by Water Usage</h2>
            <Bar
                data={chartData}
                options={{
                    indexAxis: 'y',
                    elements: {
                        bar: { borderWidth: 2 },
                    },
                    responsive: true,
                    plugins: {
                        legend: { display: false },
                        tooltip: { mode: 'index', intersect: false },
                    },
                    scales: {
                        x: { beginAtZero: true },
                    },
                }}
            />
            <div style={{ marginTop: '20px' }}>
                {stats.map(stat => (
                    <p key={stat.state}>
                        <strong>{stat.state}:</strong> {stat.totalWaterUsed} gallons,
                        {stat.totalJobs} jobs, {stat.totalWells} wells.
                    </p>
                ))}
            </div>
        </div>
    );
};

export default StateWaterVolumeChart;
