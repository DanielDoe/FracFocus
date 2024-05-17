import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const WaterUsageByOperatorChart = ({ data }) => {
    // Aggregate the total volume of water used per operator
    const waterUsageByOperator = data.reduce((acc, item) => {
        const operator = item.OperatorName;
        const volume = parseFloat(item.TotalBaseWaterVolume);
        if (operator && !isNaN(volume)) { // Check for valid operator name and volume
            acc[operator] = (acc[operator] || 0) + volume;
        }
        return acc;
    }, {});

    // Sort operators by the total volume of water used
    const sortedOperators = Object.keys(waterUsageByOperator).sort((a, b) => waterUsageByOperator[b] - waterUsageByOperator[a]);

    const chartData = {
        labels: sortedOperators,
        datasets: [{
            label: 'Total Base Water Volume Used (gallons)',
            data: sortedOperators.map(operator => waterUsageByOperator[operator]),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    };

    const options = {
        indexAxis: 'y', // Makes it a horizontal bar chart
        scales: {
            x: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Total Base Water Volume (gallons)'
                }
            }
        },
        elements: {
            bar: {
                borderWidth: 2,
            }
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Total Base Water Volume Used by Each Operator'
            }
        }
    };

    return <Bar data={chartData} options={options} />;
};

export default WaterUsageByOperatorChart;
