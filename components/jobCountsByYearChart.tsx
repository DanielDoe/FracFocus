import { Chart as ChartJS, registerables } from 'chart.js';
import { format, isValid, parse } from 'date-fns';
import { Bar } from 'react-chartjs-2';

ChartJS.register(...registerables);

const JobCountsByYearChart = ({ data }) => {
    const processData = (data) => {
        const jobCountsByYear = {};
        data.forEach(item => {
            try {
                // Trying to manually adjust the date format if necessary
                let dateString = item.JobStartDate.replace(/(\d+)\/(\d+)\/(\d+)\s.*/, '$3-$1-$2');
                const date = parse(dateString, 'yyyy-M-d', new Date());
                if (isValid(date)) {
                    const year = format(date, 'yyyy');
                    jobCountsByYear[year] = (jobCountsByYear[year] || 0) + 1;
                } else {
                    console.error("Invalid date after adjustment:", dateString);
                }
            } catch (error) {
                console.error("Error parsing date:", item.JobStartDate, error);
            }
        });
        return jobCountsByYear;
    };

    const aggregatedData = processData(data);
    const years = Object.keys(aggregatedData).sort();
    const jobCounts = years.map(year => aggregatedData[year]);

    const chartData = {
        labels: years,
        datasets: [{
            label: 'Job Counts by Year',
            data: jobCounts,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: 'Job Counts by Year'
            }
        }
    };

    return (
        <div>
            <h2>Job Counts by Year</h2>
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default JobCountsByYearChart;
