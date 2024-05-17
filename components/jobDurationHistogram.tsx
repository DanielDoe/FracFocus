import { Chart as ChartJS, registerables } from 'chart.js';
import { differenceInDays, parseISO } from 'date-fns';
import { Bar } from 'react-chartjs-2';

ChartJS.register(...registerables);

const JobDurationHistogram = ({ data }) => {
    // Calculate job durations and aggregate data for histogram
    const jobDurations = data.map(item => {
        const startDate = parseISO(item.JobStartDate);
        const endDate = parseISO(item.JobEndDate);
        return differenceInDays(endDate, startDate);
    });

    // Aggregate data into bins for the histogram
    const maxDuration = Math.max(...jobDurations);
    const binSize = Math.ceil(maxDuration / 10); // Example: create 10 bins
    let bins = new Array(10).fill(0);

    jobDurations.forEach(duration => {
        const binIndex = Math.min(Math.floor(duration / binSize), bins.length - 1);
        bins[binIndex]++;
    });

    const chartData = {
        labels: bins.map((_, index) => `${index * binSize} - ${(index + 1) * binSize} days`),
        datasets: [{
            label: 'Number of Jobs',
            data: bins,
            backgroundColor: 'rgba(123, 31, 162, 0.5)',
            borderColor: 'rgba(123, 31, 162, 1)',
            borderWidth: 1
        }]
    };

    const options = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Job Duration (days)'
                }
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Number of Jobs'
                }
            }
        },
        plugins: {
            legend: {
                display: false
            }
        },
        responsive: true,
        maintainAspectRatio: false
    };

    return (
        <div style={{ width: '100%', height: '400px' }}>
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default JobDurationHistogram;
