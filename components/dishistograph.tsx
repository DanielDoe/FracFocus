import { Card, Col, Row } from 'antd';
import { Bar } from 'react-chartjs-2';

// Importing necessary components and plugins from Chart.js
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip
} from 'chart.js';

// Register necessary components and plugins for Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const DisHistoGraphs = ({ data }) => {
    // Helper function to calculate histogram data

    const options = {
        scales: {
            x: {
                ticks: {
                    // Callback to format tick labels
                    callback: function (value, index, ticks) {
                        return Number(value).toExponential();
                    }
                }
            },
            y: {
                ticks: {
                    // Ensure the y-axis ticks are also appropriately formatted if needed
                    precision: 0 // This removes any decimal places
                }
            }
        },
        plugins: {
            legend: {
                display: true
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `Count: ${tooltipItem.raw}`;
                    }
                }
            }
        }
    };


    const calculateHistogramData = (data, key, bins) => {
        const values = data.map(item => parseFloat(item[key])).filter(item => !isNaN(item));
        const max = Math.max(...values);
        const min = Math.min(...values);
        const binSize = (max - min) / bins;
        let histogramData = new Array(bins).fill(0);

        values.forEach(value => {
            const index = Math.min(bins - 1, Math.floor((value - min) / binSize));
            histogramData[index]++;
        });

        return {
            labels: Array.from({ length: bins }, (_, i) => `${(min + i * binSize).toFixed(1)} to ${(min + (i + 1) * binSize).toFixed(1)}`),
            datasets: [{
                label: `Distribution of ${key}`,
                data: histogramData,
                backgroundColor: 'rgba(75, 192, 192, 0.5)'
            }]
        };
    };

    // Process data for histograms
    const histogramWaterVolume = calculateHistogramData(data, 'TotalBaseWaterVolume', 50);
    const histogramNonWaterVolume = calculateHistogramData(data, 'TotalBaseNonWaterVolume', 50);

    return (
        <div>
            <Card>
                <Row>
                    <Col span={12} style={{ padding: "1rem" }}>
                        <h2>Distribution of Total Base Water Volume</h2>
                        <Bar data={histogramWaterVolume} options={options} />
                    </Col>
                    <Col span={12} style={{ padding: "1rem" }}>
                        <h2>Distribution of Total Base Non-Water Volume</h2>
                        <Bar data={histogramNonWaterVolume} options={options} />
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default DisHistoGraphs;
