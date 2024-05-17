import { CategoryScale, Chart as ChartJS, Filler, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import React from 'react';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

const MassIngredientUsageChart = ({ data }) => {
    const { chartData, stats } = React.useMemo(() => processData(data), [data]);

    function processData(data) {
        const yearlyMass = {};

        data.forEach(item => {
            const year = new Date(item.JobStartDate).getFullYear();
            const mass = parseFloat(item.MassIngredient || '0');

            if (!yearlyMass[year]) {
                yearlyMass[year] = 0;
            }
            yearlyMass[year] += mass;
        });

        const years = Object.keys(yearlyMass).sort();
        const masses = years.map(year => yearlyMass[year]);

        const totalMass = masses.reduce((sum, mass) => sum + mass, 0);
        const maxYear = years[masses.indexOf(Math.max(...masses))];
        const averageIncrease = calculateAverageIncrease(masses);

        return {
            chartData: {
                labels: years,
                datasets: [{
                    label: 'Total Mass of Ingredients Used (lbs)',
                    data: masses,
                    fill: false,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    tension: 0.1
                }]
            },
            stats: {
                totalMass: totalMass.toLocaleString(),
                maxYear,
                averageIncrease: averageIncrease.toFixed(2)
            }
        };
    }

    function calculateAverageIncrease(masses) {
        let increaseSum = 0;
        let count = 0;

        for (let i = 1; i < masses.length; i++) {
            increaseSum += (masses[i] - masses[i - 1]);
            count++;
        }

        return increaseSum / count;
    }

    return (
        <div>
            <h2>Annual Mass of Ingredients Used in Hydraulic Fracturing</h2>
            <Line data={chartData} options={{
                responsive: true,
                plugins: {
                    legend: { display: false },
                    tooltip: { mode: 'index', intersect: false },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: { display: true, text: 'Total Mass (lbs)' }
                    },
                    x: { title: { display: true, text: 'Year' } }
                }
            }} />
            <div style={{ marginTop: '20px' }}>
                <p><strong>Total Mass Used Over the Years:</strong> {stats.totalMass} lbs</p>
                <p><strong>Year with Maximum Usage:</strong> {stats.maxYear}</p>
                <p><strong>Average Annual Increase in Usage:</strong> {stats.averageIncrease} lbs</p>
            </div>
        </div>
    );
};

export default MassIngredientUsageChart;
