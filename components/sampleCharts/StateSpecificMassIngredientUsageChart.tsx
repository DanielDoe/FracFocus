import { CategoryScale, Chart as ChartJS, Filler, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import React from 'react';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

const StateSpecificMassIngredientUsageChart = ({ data }) => {
    const { chartData, stats } = React.useMemo(() => processData(data), [data]);

    function processData(data) {
        const stateYearlyMass = {};

        data.forEach(item => {
            const year = new Date(item.JobStartDate).getFullYear();
            const state = item.StateName;
            const mass = parseFloat(item.MassIngredient || '0');

            if (!stateYearlyMass[state]) {
                stateYearlyMass[state] = {};
            }
            if (!stateYearlyMass[state][year]) {
                stateYearlyMass[state][year] = 0;
            }
            stateYearlyMass[state][year] += mass;
        });

        // Determine the state with the highest total mass usage
        const totalMassByState = Object.entries(stateYearlyMass).map(([state, years]) => ({
            state,
            totalMass: Object.values(years).reduce((sum, current) => sum + current, 0)
        })).sort((a, b) => b.totalMass - a.totalMass);

        const highestState = totalMassByState[0].state;
        const highestStateData = stateYearlyMass[highestState];
        const years = Object.keys(highestStateData).sort();
        const masses = years.map(year => highestStateData[year]);

        const peakYear = years[masses.indexOf(Math.max(...masses))];
        const recentTrend = calculateTrend(masses.slice(-3)); // Trend over the last three years

        return {
            chartData: {
                labels: years,
                datasets: [{
                    label: `Mass Ingredient Usage in ${highestState} (lbs)`,
                    data: masses,
                    fill: false,
                    borderColor: 'rgba(123, 104, 238, 1)',
                    tension: 0.1
                }]
            },
            stats: {
                state: highestState,
                peakYear,
                recentTrend
            }
        };
    }

    function calculateTrend(masses) {
        if (masses.length < 2) return 'No data for trend analysis';
        const trend = masses[masses.length - 1] - masses[0];
        return trend > 0 ? 'Increasing' : (trend < 0 ? 'Decreasing' : 'Stable');
    }

    return (
        <div>
            <h2>Yearly Mass Ingredient Usage for the Highest Usage State</h2>
            <Line data={chartData} options={{
                responsive: true,
                plugins: {
                    legend: { display: false },
                    tooltip: { mode: 'index', intersect: false },
                },
                scales: {
                    y: { beginAtZero: true, title: { display: true, text: 'Total Mass (lbs)' } },
                    x: { title: { display: true, text: 'Year' } }
                }
            }} />
            <div style={{ marginTop: '20px' }}>
                <p><strong>State with Highest Total Usage:</strong> {stats.state}</p>
                <p><strong>Peak Year for Usage:</strong> {stats.peakYear}</p>
                <p><strong>Recent Trend:</strong> {stats.recentTrend}</p>
            </div>
        </div>
    );
};

export default StateSpecificMassIngredientUsageChart;
