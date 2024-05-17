import React from 'react';
import { Bar } from 'react-chartjs-2';

const JobYearChart = ({ data }) => {
    const { chartData, stats } = React.useMemo(() => {
        if (data) {
            return processData(data);
        }
        return { chartData: { labels: [], datasets: [] }, stats: null };
    }, [data]);

    function processData(data) {
        const jobYears = data.map(item => {
            const date = new Date(item.JobStartDate);
            return date.getFullYear();
        });

        const jobCountPerYear = jobYears.reduce((acc, year) => {
            acc[year] = (acc[year] || 0) + 1;
            return acc;
        }, {});

        const years = Object.keys(jobCountPerYear);
        const counts = years.map(year => jobCountPerYear[year]);

        const total = counts.reduce((sum, current) => sum + current, 0);
        const average = total / counts.length;
        const min = Math.min(...counts);
        const max = Math.max(...counts);

        return {
            chartData: {
                labels: years.sort((a, b) => parseInt(a) - parseInt(b)),
                datasets: [{
                    label: 'Number of Jobs per Year',
                    backgroundColor: '#ACE2E1',
                    data: counts,
                }]
            },
            stats: { total, average, min, max }
        };
    }

    return (
        <div style={{ width: '100%', height: '400px' }}>
            <h2>Job Year Chart</h2>
            <Bar
                data={chartData}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function (value) {
                                    return Number(value).toLocaleString();
                                }
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top'
                        }
                    }
                }}
            />
            {stats && (
                <div style={{ marginTop: '20px' }}>
                    <p><strong>Total Job Count:</strong> {stats.total.toLocaleString()}</p>
                    <p><strong>Average Job Count per Year:</strong> {stats.average.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                    <p><strong>Minimum Job Count in a Year:</strong> {stats.min.toLocaleString()}</p>
                    <p><strong>Maximum Job Count in a Year:</strong> {stats.max.toLocaleString()}</p>
                </div>
            )}
        </div>
    );
};

export default JobYearChart;
