import { Chart as ChartJS, Legend, LinearScale, PointElement, Tooltip } from 'chart.js';
import React from 'react';
import { Scatter } from 'react-chartjs-2';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

const PercentHFJobVsMassIngredientChart = ({ data }) => {
    const { chartData, stats } = React.useMemo(() => processData(data), [data]);

    function processData(data) {
        const monthlyAverages = {};

        data.forEach(item => {
            const date = new Date(item.JobStartDate);
            const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
            const percentHF = parseFloat(item.PercentHFJob || '0');
            const massIngredient = parseFloat(item.MassIngredient || '0');

            if (!monthlyAverages[monthKey]) {
                monthlyAverages[monthKey] = { sumPercent: 0, sumMass: 0, count: 0 };
            }
            monthlyAverages[monthKey].sumPercent += percentHF;
            monthlyAverages[monthKey].sumMass += massIngredient;
            monthlyAverages[monthKey].count += 1;
        });

        const processedData = Object.keys(monthlyAverages).map(key => {
            const avgPercent = monthlyAverages[key].sumPercent / monthlyAverages[key].count;
            const avgMass = monthlyAverages[key].sumMass / monthlyAverages[key].count;
            return {
                x: avgPercent,
                y: avgMass
            };
        });

        return {
            chartData: {
                datasets: [{
                    label: 'Monthly Average Percent HF Job vs. Mass Ingredient',
                    data: processedData,
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    pointRadius: 5
                }]
            }
        };
    }

    return (
        <div>
            <h2>Monthly Averages of Percent HF Job vs. Mass of Ingredients</h2>
            <Scatter data={chartData} options={{
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Average Percent HF Job (%)'
                        },
                        beginAtZero: true
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Average Mass of Ingredient (lbs)'
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

export default PercentHFJobVsMassIngredientChart;
