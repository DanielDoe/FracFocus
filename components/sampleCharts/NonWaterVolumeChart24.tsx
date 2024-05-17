import React from 'react';
import { Bar } from 'react-chartjs-2';

const NonWaterVolumeChart24 = ({ data }) => {
    const { chartData, stats } = React.useMemo(() => processData(data), [data]);

    function processData(data) {
        const monthlyData = {};
        const stateUsage = {};
        const operatorUsage = {};
        const wellUsage = {};

        data.forEach(item => {
            const date = new Date(item.JobStartDate);
            const year = date.getFullYear();
            const month = date.getMonth();

            if (year === 2024) {
                const volume = parseInt(item.TotalBaseNonWaterVolume || '0', 10);
                if (volume > 0) {
                    // Monthly aggregation
                    if (!monthlyData[month]) monthlyData[month] = 0;
                    monthlyData[month] += volume;

                    // State usage
                    const state = item.StateName;
                    stateUsage[state] = (stateUsage[state] || 0) + volume;

                    // Operator usage
                    const operator = item.OperatorName;
                    operatorUsage[operator] = (operatorUsage[operator] || 0) + volume;

                    // Well usage
                    const well = item.WellName;
                    wellUsage[well] = (wellUsage[well] || 0) + volume;
                }
            }
        });

        // Finding maximums
        const maxState = getMax(stateUsage);
        const maxOperator = getMax(operatorUsage);
        const maxWell = getMax(wellUsage);

        const months = Object.keys(monthlyData).sort();
        const volumes = months.map(m => monthlyData[m]);

        return {
            chartData: {
                labels: months.map(month => `2024-${parseInt(month) + 1}`),
                datasets: [{
                    label: 'Total Base Non-Water Volume per Month in 2024',
                    backgroundColor: '#FF7043',
                    data: volumes,
                }]
            },
            stats: {
                totalPerMonth: volumes.reduce((a, b) => a + b, 0) / volumes.length,
                maxState: maxState.key,
                maxOperator: maxOperator.key,
                maxWell: maxWell.key,
                wellLocation: maxState.key
            }
        };
    }

    function getMax(obj) {
        return Object.entries(obj).reduce((acc, curr) => curr[1] > acc.value ? { key: curr[0], value: curr[1] } : acc, { key: '', value: 0 });
    }

    return (
        <div style={{ width: '100%', height: '400px' }}>
            <h2>Non-Water Volume Usage by Month in 2024</h2>
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
                    <p><strong>Average Non-Water Volume per Month:</strong> {stats.totalPerMonth.toLocaleString()} gallons</p>
                    <p><strong>State with Most Usage:</strong> {stats.maxState}</p>
                    <p><strong>Operator with Most Usage:</strong> {stats.maxOperator}</p>
                    <p><strong>Most Used Well:</strong> {stats.maxWell} (Located in {stats.wellLocation})</p>
                </div>
            )}
        </div>
    );
};

export default NonWaterVolumeChart24;
