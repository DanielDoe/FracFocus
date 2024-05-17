import React from 'react';
import { Bar } from 'react-chartjs-2';

const StackedWaterUsageChart = ({ data }) => {
    const { chartData, stats } = React.useMemo(() => processData(data), [data]);

    function processData(data) {
        const stateVolumes = {};
        const operatorWaterUsage = {};

        data.forEach(item => {
            const state = item.StateName;
            const operator = item.OperatorName;
            const waterVolume = parseInt(item.TotalBaseWaterVolume || '0', 10);
            const nonWaterVolume = parseInt(item.TotalBaseNonWaterVolume || '0', 10);

            if (!stateVolumes[state]) {
                stateVolumes[state] = { water: 0, nonWater: 0 };
            }
            stateVolumes[state].water += waterVolume;
            stateVolumes[state].nonWater += nonWaterVolume;

            operatorWaterUsage[operator] = (operatorWaterUsage[operator] || 0) + waterVolume;
        });

        const maxOperator = Object.entries(operatorWaterUsage).reduce((a, b) => a[1] > b[1] ? a : b, ['', 0]);

        const states = Object.keys(stateVolumes);
        const waterData = states.map(state => stateVolumes[state].water);
        const nonWaterData = states.map(state => stateVolumes[state].nonWater);

        return {
            chartData: {
                labels: states,
                datasets: [
                    {
                        label: 'Total Base Water Volume',
                        data: waterData,
                        backgroundColor: 'rgba(54, 162, 235, 0.6)'
                    },
                    {
                        label: 'Total Base Non-Water Volume',
                        data: nonWaterData,
                        backgroundColor: 'rgba(255, 99, 132, 0.6)'
                    }
                ]
            },
            stats: {
                operatorMostWater: maxOperator[0],
                operatorLocation: 'Unknown',  // Placeholder, as location data is not specified in the example
            }
        };
    }

    return (
        <div>
            <h2>State-wise Water and Non-Water Volume Usage</h2>
            <Bar
                data={chartData}
                options={{
                    responsive: true,
                    scales: {
                        x: {
                            stacked: true,
                        },
                        y: {
                            stacked: true
                        }
                    }
                }}
            />
            <div>
                <p><strong>Operator with Most Water Usage:</strong> {stats.operatorMostWater} located in {stats.operatorLocation}</p>
            </div>
        </div>
    );
};

export default StackedWaterUsageChart;
