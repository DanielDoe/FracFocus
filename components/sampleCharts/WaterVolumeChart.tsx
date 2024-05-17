import React from 'react';
import { Bar } from 'react-chartjs-2';

const WaterVolumeChart = ({ data }) => {
    const { chartData, stats } = React.useMemo(() => processData(data), [data]);

    function processData(data) {
        const volumeByYear = {};
        let min = Infinity;
        let max = -Infinity;
        let totalVolume = 0;
        let count = 0;

        data.forEach(item => {
            const year = new Date(item.JobStartDate).getFullYear();
            const volume = parseInt(item.TotalBaseWaterVolume || '0', 10);
            if (volume > 0) {  // Ensure only valid, positive volumes are considered
                volumeByYear[year] = (volumeByYear[year] || 0) + volume;
                min = Math.min(min, volume);
                max = Math.max(max, volume);
                totalVolume += volume;
                count++;
            }
        });

        const years = Object.keys(volumeByYear).sort();
        const volumes = years.map(year => volumeByYear[year]);
        const average = totalVolume / count;

        return {
            chartData: {
                labels: years,
                datasets: [{
                    label: 'Total Base Water Volume by Year',
                    backgroundColor: '#42A5F5',
                    data: volumes,
                }]
            },
            stats: {
                total: totalVolume,
                average,
                min,
                max
            }
        };
    }

    return (
        <div style={{ width: '100%', height: '400px' }}>
            <h2>Water Volume Usage Chart</h2>
            <Bar
                data={chartData}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }}
            />
            {stats && (
                <div style={{ marginTop: '20px' }}>
                    <p><strong>Total Water Volume:</strong> {stats.total.toLocaleString()} gallons</p>
                    <p><strong>Average Water Volume per Record:</strong> {stats.average.toLocaleString(undefined, { maximumFractionDigits: 2 })} gallons</p>
                    <p><strong>Minimum Water Volume in a Record:</strong> {stats.min.toLocaleString()} gallons</p>
                    <p><strong>Maximum Water Volume in a Record:</strong> {stats.max.toLocaleString()} gallons</p>
                </div>
            )}
        </div>
    );
};

export default WaterVolumeChart;
