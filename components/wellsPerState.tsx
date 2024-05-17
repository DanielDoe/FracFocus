import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const WellsPerStateChart = ({ data }) => {
    // Aggregate the count of wells per state
    const stateCounts = data.reduce((acc, item) => {
        if (item.StateName) {
            acc[item.StateName] = (acc[item.StateName] || 0) + 1;
        }
        return acc;
    }, {});

    // Sort states by the number of wells
    const sortedStates = Object.keys(stateCounts).sort((a, b) => stateCounts[b] - stateCounts[a]);

    const chartData = {
        labels: sortedStates,
        datasets: [{
            label: 'Number of Wells per State',
            data: sortedStates.map(state => stateCounts[state]),
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    };

    const options = {
        indexAxis: 'y',  // Makes it a horizontal bar chart
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
            },
            title: {
                display: true,
                text: 'Number of Wells per State'
            }
        }
    };

    return <Bar data={chartData} options={options} />;
};

export default WellsPerStateChart;
