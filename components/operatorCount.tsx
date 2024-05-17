import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const OperatorChart = ({ data }) => {
    // Aggregate the count of occurrences for each operator
    const operatorCounts = data.reduce((acc, item) => {
        const operator = item.OperatorName;
        if (operator) { // Ensure that the operator name is not empty
            acc[operator] = (acc[operator] || 0) + 1;
        }
        return acc;
    }, {});

    // To sort the operators by the number of occurrences
    const sortedOperators = Object.keys(operatorCounts).sort((a, b) => operatorCounts[b] - operatorCounts[a]);

    const chartData = {
        labels: sortedOperators,
        datasets: [{
            label: 'Number of Submissions per Operator',
            data: sortedOperators.map(operator => operatorCounts[operator]),
            backgroundColor: 'rgba(153, 102, 255, 0.6)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1
        }]
    };

    const options = {
        indexAxis: 'y', // Makes it a horizontal bar chart
        scales: {
            x: {
                beginAtZero: true
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
            }
        }
    };
    return (
        <div>
            <h2>Number of Submissions per Operator</h2>
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default OperatorChart;
