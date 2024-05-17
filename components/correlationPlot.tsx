import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { Scatter } from 'react-chartjs-2';

// Register necessary components and plugins for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CorrelationStatePlot = ({ data }) => {
    // Aggregating data for the number of wells per state
    const wellsData = data.reduce((acc, item) => {
        if (acc[item.StateName]) {
            acc[item.StateName] += parseInt(item.WellsCount, 10);
        } else {
            acc[item.StateName] = parseInt(item.WellsCount, 10);
        }
        return acc;
    }, {});

    const chartData = {
        labels: Object.keys(wellsData),
        datasets: [{
            label: 'Number of Wells per State',
            data: Object.values(wellsData),
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    };

    const stateOptions = {
        indexAxis: 'y',
        scales: {
            x: {
                beginAtZero: true, // Ensures that the scale starts from zero
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

    // Assuming 'PercentHighAdditive' and 'PercentHFJob' are correctly formatted as numbers
    const scatterData = {
        datasets: [{
            label: 'Correlation between Percent High Additive and Percent HF Job',
            data: data.map(item => ({
                x: parseFloat(item.PercentHighAdditive),
                y: parseFloat(item.PercentHFJob)
            })),
            backgroundColor: 'rgba(255, 99, 132, 0.5)'
        }]
    };

    const corOptions = {
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                title: {
                    display: true,
                    text: 'Percent High Additive'
                }
            },
            y: {
                type: 'linear',
                title: {
                    display: true,
                    text: 'Percent HF Job'
                }
            }
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `Percent High Additive: ${context.raw.x}, Percent HF Job: ${context.raw.y}`;
                    }
                }
            }
        }
    };

    return (
        <div>
            <h2>Correlation Percent High Additive and Percent HF Job</h2>
            <Scatter options={corOptions} data={scatterData} />
        </div>
    );
};

export default CorrelationStatePlot;
