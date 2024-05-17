import React from 'react';
import { Bar } from 'react-chartjs-2';

const WaterVolumeChart24 = ({ data }) => {
    const { chartData, stats } = React.useMemo(() => processData(data), [data]);

    function processData(data) {
        const monthlyData = {};
        let totalVolume = 0;
        let minVolume = Infinity;
        let maxVolume = -Infinity;

        data.forEach(item => {
            const date = new Date(item.JobStartDate);
            const year = date.getFullYear();
            const month = date.getMonth();

            if (year === 2024) {
                const volume = parseInt(item.TotalBaseWaterVolume || '0', 10);
                if (volume > 0) {
                    // Monthly aggregation
                    if (!monthlyData[month]) monthlyData[month] = { total: 0, count: 0 };
                    monthlyData[month].total += volume;
                    monthlyData[month].count++;
                    totalVolume += volume;
                    minVolume = Math.min(minVolume, volume);
                    maxVolume = Math.max(maxVolume, volume);
                }
            }
        });

        const months = Object.keys(monthlyData).sort();
        const volumes = months.map(m => monthlyData[m].total);
        const averageVolumePerMonth = totalVolume / months.length;

        return {
            chartData: {
                labels: months.map(month => `Month ${parseInt(month) + 1}`),
                datasets: [{
                    label: 'Total Base Water Volume per Month in 2024',
                    backgroundColor: '#2196F3',
                    data: volumes,
                }]
            },
            stats: {
                totalVolume,
                averageVolumePerMonth,
                minVolume,
                maxVolume
            }
        };
    }

    return (
        <div style={{ width: '100%', height: '400px' }}>
            <h2>Water Volume Usage by Month in 2024</h2>
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
                    <p><strong>Total Water Volume in 2024:</strong> {stats.totalVolume.toLocaleString()} gallons</p>
                    <p><strong>Average Water Volume per Month:</strong> {stats.averageVolumePerMonth.toLocaleString(undefined, { maximumFractionDigits: 2 })} gallons</p>
                    <p><strong>Minimum Water Volume in a Record:</strong> {stats.minVolume.toLocaleString()} gallons</p>
                    <p><strong>Maximum Water Volume in a Record:</strong> {stats.maxVolume.toLocaleString()} gallons</p>
                </div>
            )}
        </div>
    );
};

export default WaterVolumeChart24;
