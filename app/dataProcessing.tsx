// dataProcessing.tsx
import { Card, Col, Row } from 'antd';
import Papa from 'papaparse';
import { useEffect, useState } from 'react';
import WaterVsNonWaterVolumeChart from '/components//sampleCharts//WaterVsNonWaterVolumeChart.tsx';
import StateNonWaterVolumeChart from '/components/sampleCharts//StateNonWaterVolumeChart.tsx';
import StateSpecificMassIngredientUsageChart from '/components/sampleCharts//StateSpecificMassIngredientUsageChart.tsx';
import JobMonthsChart from '/components/sampleCharts/JobMonthsChart.tsx';
import JobYearChart from '/components/sampleCharts/JobYearChart.tsx';
import MassIngredientUsageChart from '/components/sampleCharts/MassIngredientUsageChart.tsx';
import MonthlyPercentHFJobChart2024 from '/components/sampleCharts/MonthlyPercentHFJobChart2024.tsx';
import NonWaterVolumeChart from '/components/sampleCharts/NonWaterVolumeChart.tsx';
import NonWaterVolumeChart24 from '/components/sampleCharts/NonWaterVolumeChart24.tsx';
import PercentHFJobVsMassIngredientChart from '/components/sampleCharts/PercentHFJobVsMassIngredientChart.tsx';
import StatePercentHFJobChart from '/components/sampleCharts/StatePercentHFJobChart.tsx';
import StateWaterVolumeChart from '/components/sampleCharts/StateWaterVolumeChart.tsx';
import TopSupplierPieChart from '/components/sampleCharts/TopSupplierPieChart.tsx';
import WaterVolumeChart from '/components/sampleCharts/WaterVolumeChart.tsx';
import WaterVolumeChart24 from '/components/sampleCharts/WaterVolumeChart24.tsx';

const DataProcessing = () => {
    const [data, setData] = useState<any[]>([]);
    const currentYear = new Date().getFullYear();  // Get the current year

    useEffect(() => {
        Papa.parse('/data/FracFocusRegistry_13.csv', {
            download: true,
            header: true,
            skipEmptyLines: true,
            complete: (result) => {
                if (result.data && result.data.length > 0) {
                    // Perform initial cleaning and filtering
                    const cleanedData = result.data.filter(item => {
                        const date = new Date(item.JobStartDate);
                        // Ensure the year is plausible (e.g., not in the future or distant past)
                        return !isNaN(date.valueOf()) && date.getFullYear() <= currentYear && date.getFullYear() >= 2000;
                    });
                    setData(cleanedData);
                } else {
                    console.error("No data available or data is improperly formatted.");
                }
            },
            error: (error) => {
                console.error("Error while fetching or parsing data:", error);
            }
        });
    }, []);

    return (
        <div>
            <Card>
                <Row>
                    <Col span={12} style={{ padding: "1rem" }}>
                        {data.length > 0 && <JobYearChart data={data} />}
                    </Col>
                    <Col span={12} style={{ padding: "1rem" }}>
                        {data.length > 0 && <JobMonthsChart data={data} />}
                    </Col>
                </Row>
            </Card>
            <Card>
                <Row>
                    <Col span={12} style={{ padding: "2rem 1rem" }}>
                        {data.length > 0 && <WaterVolumeChart data={data} />}
                    </Col>
                    <Col span={12} style={{ padding: "2rem 1rem" }}>
                        {data.length > 0 && <WaterVolumeChart24 data={data} />}
                    </Col>
                </Row>
            </Card>
            <Card>
                <Row>
                    <Col span={12} style={{ padding: "2rem 1rem" }}>
                        {data.length > 0 && <NonWaterVolumeChart data={data} />}
                    </Col>
                    <Col span={12} style={{ padding: "2rem 1rem" }}>
                        {data.length > 0 && <NonWaterVolumeChart24 data={data} />}
                    </Col>
                </Row>
            </Card>
            <Card>
                <Row>
                    <Col span={12} style={{ padding: "2rem 1rem" }}>
                        {data.length > 0 && <StateWaterVolumeChart data={data} />}
                    </Col>
                    <Col span={12} style={{ padding: "2rem 1rem" }}>
                        {data.length > 0 && <StateNonWaterVolumeChart data={data} />}
                    </Col>
                </Row>
            </Card>
            <Card>
                <Row>
                    <Col span={12} style={{ padding: "2rem 1rem" }}>
                        {data.length > 0 && <StatePercentHFJobChart data={data} />}
                    </Col>
                    <Col span={12} style={{ padding: "2rem 1rem" }}>
                        {data.length > 0 && <MonthlyPercentHFJobChart2024 data={data} />}
                    </Col>
                </Row>
            </Card>
            <Card>
                <Row>
                    <Col span={12} style={{ padding: "2rem 1rem" }}>
                        {data.length > 0 && <MassIngredientUsageChart data={data} />}
                    </Col>
                    <Col span={12} style={{ padding: "2rem 1rem" }}>
                        {data.length > 0 && <StateSpecificMassIngredientUsageChart data={data} />}
                    </Col>
                </Row>
            </Card>
            <Card >
                <Row>
                    <Col span={12} style={{ padding: "2rem 1rem", height: 500 }} >
                        {data.length > 0 && <TopSupplierPieChart data={data} />}
                    </Col>
                    <Col span={12} style={{ padding: "2rem 1rem" }}>
                        {data.length > 0 && <StateSpecificMassIngredientUsageChart data={data} />}
                    </Col>
                </Row>
            </Card>
            <Card >
                <Row>
                    <Col span={12} style={{ padding: "2rem 1rem", height: 500 }} >
                        {data.length > 0 && <PercentHFJobVsMassIngredientChart data={data} />}
                    </Col>
                    <Col span={12} style={{ padding: "2rem 1rem" }}>
                        {data.length > 0 && <WaterVsNonWaterVolumeChart data={data} />}
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default DataProcessing;
