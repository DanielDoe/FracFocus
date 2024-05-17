import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import React from 'react';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const TopSupplierPieChart = ({ data }) => {
    const { chartData, stats } = React.useMemo(() => processData(data), [data]);

    function processData(data) {
        const supplierData = {};

        data.forEach(item => {
            const supplier = item.Supplier;
            const state = item.StateName;
            const mass = parseFloat(item.MassIngredient || '0');

            if (!supplierData[supplier]) {
                supplierData[supplier] = {
                    totalMass: 0,
                    states: {},
                    primaryLocation: state // Assume the first encountered state is the primary location
                };
            }
            supplierData[supplier].totalMass += mass;
            supplierData[supplier].states[state] = (supplierData[supplier].states[state] || 0) + mass;
        });

        const sortedSuppliers = Object.entries(supplierData)
            .sort((a, b) => b[1].totalMass - a[1].totalMass)
            .slice(0, 5);

        const topSupplier = sortedSuppliers[0][0];
        const topSupplierStates = supplierData[topSupplier].states;
        const topState = Object.keys(topSupplierStates).reduce((a, b) => topSupplierStates[a] > topSupplierStates[b] ? a : b);

        return {
            chartData: {
                labels: sortedSuppliers.map(([name]) => name),
                datasets: [{
                    label: 'Total Mass by Supplier',
                    data: sortedSuppliers.map(([, data]) => data.totalMass),
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        '#E7E9ED',
                        '#4BC0C0'
                    ],
                    hoverOffset: 4
                }]
            },
            stats: {
                topSupplier,
                numberOfSuppliers: sortedSuppliers.length,
                topState,
                primaryLocation: supplierData[topSupplier].primaryLocation
            }
        };
    }

    return (
        <div style={{ margin: "1rem auto" }}>
            <h2>Top 5 Suppliers by Ingredient Mass</h2>
            <div className="chart-container" style={{ width: '100%', marginTop: "1rem" }}>
                <Pie data={chartData} options={{
                    responsive: true,
                    plugins: {
                        legend: { position: 'bottom' },
                        tooltip: { mode: 'index', intersect: true }
                    }
                }} />
            </div>
            <div style={{ marginTop: '20px' }}>
                <p><strong>Top Supplier:</strong> {stats.topSupplier}</p>
                <p><strong>Number of Suppliers:</strong> {stats.numberOfSuppliers}</p>
                <p><strong>Top State for Top Supplier:</strong> {stats.topState}</p>
                <p><strong>Primary Location of Top Supplier:</strong> {stats.primaryLocation}</p>
            </div>
        </div>
    );
};

export default TopSupplierPieChart;
