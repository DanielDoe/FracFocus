import { Card, Col, Row } from 'antd';
import { BarElement, CategoryScale, Chart as ChartJS, Filler, Legend, LineElement, LinearScale, PointElement, Title, Tooltip } from 'chart.js';
import { format, isValid, parse } from 'date-fns';
import { Bar, Line } from 'react-chartjs-2';

// Register necessary components and plugins for Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler  // Registering the Filler plugin
);

const MyCharts = ({ data }) => {
    // Helper function to aggregate data by period
    // console.log("Received data from Home", data);
    const aggregateData = (data, periodFormatter, valueKey) => {
        return data.reduce((acc, curr) => {
            const date = parse(curr.JobStartDate, "MM/dd/yyyy hh:mm:ss a", new Date()); // Adjusted date format
            if (isValid(date)) {
                const period = format(date, periodFormatter);
                acc[period] = (acc[period] || 0) + parseFloat(curr[valueKey] || 0);
            }
            return acc;
        }, {});
    };

    // Process data for monthly water usage
    const monthlyWaterData = {
        labels: Object.keys(aggregateData(data, 'yyyy-MM', 'TotalBaseWaterVolume')),
        datasets: [{
            label: 'Monthly Total Base Water Volume Usage',
            data: Object.values(aggregateData(data, 'yyyy-MM', 'TotalBaseWaterVolume')),
            borderColor: 'blue',
            backgroundColor: 'rgba(135, 206, 235, 0.2)',
            fill: true,
        }]
    };

    // Process data for yearly water usage
    const yearlyWaterData = {
        labels: Object.keys(aggregateData(data, 'yyyy', 'TotalBaseWaterVolume')),
        datasets: [{
            label: 'Yearly Total Base Water Volume Usage',
            data: Object.values(aggregateData(data, 'yyyy', 'TotalBaseWaterVolume')),
            backgroundColor: 'rgba(255, 99, 132, 0.5)'
        }]
    };

    return (
        <div>
            <Card>
                <Row>
                    <Col span={12} style={{ padding: "1rem" }}>
                        <h2>Yearly Water Usage</h2>
                        <Bar data={yearlyWaterData} />
                    </Col>
                    <Col span={12} style={{ padding: "1rem" }}>
                        <h2>Monthly Water Usage</h2>
                        <Line data={monthlyWaterData} />
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default MyCharts;
