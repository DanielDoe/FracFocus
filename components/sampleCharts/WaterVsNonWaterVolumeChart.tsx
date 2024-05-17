import { Chart as ChartJS, Legend, LinearScale, PointElement, Tooltip } from 'chart.js';
import React from 'react';
import { Scatter } from 'react-chartjs-2';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

const WaterVsNonWaterVolumeChart = ({ data }) => {
    const { chartData, stats } = React.useMemo(() => processData(data), [data]);

    function processData(data) {
        const monthlyAverages = {};

        data.forEach(item => {
            const date = new Date(item.JobStartDate);
            const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
            const waterVolume = parseFloat(item.TotalBaseWaterVolume || '0');
            const nonWaterVolume = parseFloat(item.TotalBaseNonWaterVolume || '0');

            if (!monthlyAverages[monthKey]) {
                monthlyAverages[monthKey] = { sumWater: 0, sumNonWater: 0, count: 0 };
            }
            monthlyAverages[monthKey].sumWater += waterVolume;
            monthlyAverages[monthKey].sumNonWater += nonWaterVolume;
            monthlyAverages[monthKey].count += 1;
        });

        const processedData = Object.keys(monthlyAverages).map(key => {
            const avgWater = monthlyAverages[key].sumWater / monthlyAverages[key].count;
            const avgNonWater = monthlyAverages[key].sumNonWater / monthlyAverages[key].count;
            return {
                x: avgWater,
                y: avgNonWater
            };
        });

        return {
            chartData: {
                datasets: [{
                    label: 'Monthly Average Water vs. Non-Water Volume',
                    data: processedData,
                    backgroundColor: 'rgba(153, 102, 255, 0.5)',
                    pointRadius: 5
                }]
            }
        };
    }

    return (
        <div>
            <h2>Monthly Averages of Water vs. Non-Water Volume</h2>
            <Scatter data={chartData} options={{
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Average Water Volume (gallons)'
                        },
                        beginAtZero: true
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Average Non-Water Volume (gallons)'
                        },
                        beginAtZero: true
                    }
                },
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        mode: 'point',
                        intersect: false
                    }
                }
            }} />
        </div>
    );
};

export default WaterVsNonWaterVolumeChart;
