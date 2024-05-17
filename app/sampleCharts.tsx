/* eslint-disable no-undef */
'use client';
import { Card, Col, Row, Tabs } from 'antd';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
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

// Register the necessary components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const { TabPane } = Tabs;

const SampleCharts = ({ data }) => {
    return (
        <div style={{ width: "90%", margin: 'auto' }}>
            <div style={{ width: "90%", margin: 'auto' }}>
                <Card style={{ width: '100%', height: '42rem', boxSizing: 'border-box', margin: "2rem 0" }}>
                    <Row>
                        <Col span={12} style={{ padding: "1rem" }}>
                            <div style={{ width: "80%", height: "90%", padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                {data.length > 0 && <JobYearChart data={data} />}
                            </div>
                        </Col>
                        <Col span={12} style={{ padding: "1rem" }}>
                            <div style={{ width: "80%", height: "90%", padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                {data.length > 0 && <JobMonthsChart data={data} />}
                            </div>
                        </Col>
                    </Row>
                </Card>
                <Card style={{ width: '100%', height: '42rem', boxSizing: 'border-box', margin: "2rem 0" }}>
                    <Row>
                        <Col span={12} style={{ padding: "2rem 1rem" }}>
                            <div style={{ width: "80%", height: "90%", padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                {data.length > 0 && <WaterVolumeChart data={data} />}
                            </div>
                        </Col>
                        <Col span={12} style={{ padding: "2rem 1rem" }}>
                            <div style={{ width: "80%", height: "90%", padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                {data.length > 0 && <WaterVolumeChart24 data={data} />}
                            </div>
                        </Col>
                    </Row>
                </Card>
                <Card style={{ width: '100%', height: '42rem', boxSizing: 'border-box', margin: "2rem 0" }}>
                    <Row>
                        <Col span={12} style={{ padding: "2rem 1rem" }}>
                            <div style={{ width: "80%", height: "90%", padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                {data.length > 0 && <NonWaterVolumeChart data={data} />}
                            </div>
                        </Col>
                        <Col span={12} style={{ padding: "2rem 1rem" }}>
                            <div style={{ width: "80%", height: "90%", padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                {data.length > 0 && <NonWaterVolumeChart24 data={data} />}
                            </div>
                        </Col>
                    </Row>
                </Card>
                <Card style={{ width: '100%', height: '42rem', boxSizing: 'border-box', margin: "2rem 0" }}>
                    <Row>
                        <Col span={12} style={{ padding: "2rem 1rem" }}>
                            <div style={{ width: "80%", height: "90%", padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                {data.length > 0 && <StateWaterVolumeChart data={data} />}
                            </div>
                        </Col>
                        <Col span={12} style={{ padding: "2rem 1rem" }}>
                            <div style={{ width: "80%", height: "90%", padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                {data.length > 0 && <StateNonWaterVolumeChart data={data} />}
                            </div>
                        </Col>
                    </Row>
                </Card>
                <Card style={{ width: '100%', height: '42rem', boxSizing: 'border-box', margin: "2rem 0" }}>
                    <Row>
                        <Col span={12} style={{ padding: "2rem 1rem", height: 500 }} >
                            <div style={{ width: "80%", height: "90%", padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                {data.length > 0 && <PercentHFJobVsMassIngredientChart data={data} />}
                            </div>
                        </Col>
                        <Col span={12} style={{ padding: "2rem 1rem" }}>
                            <div style={{ width: "80%", height: "90%", padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                {data.length > 0 && <WaterVsNonWaterVolumeChart data={data} />}
                            </div>
                        </Col>
                    </Row>
                </Card>
                <Card style={{ width: '100%', height: '42rem', boxSizing: 'border-box', margin: "2rem 0" }}>
                    <Row>
                        <Col span={12} style={{ padding: "2rem 1rem" }}>
                            <div style={{ width: "80%", height: "90%", padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                {data.length > 0 && <StatePercentHFJobChart data={data} />}
                            </div>
                        </Col>
                        <Col span={12} style={{ padding: "2rem 1rem" }}>
                            <div style={{ width: "80%", height: "90%", padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                {data.length > 0 && <MonthlyPercentHFJobChart2024 data={data} />}
                            </div>
                        </Col>
                    </Row>
                </Card>
                <Card style={{ width: '100%', height: '42rem', boxSizing: 'border-box', margin: "2rem 0" }}>
                    <Row>
                        <Col span={12} style={{ padding: "2rem 1rem" }}>
                            <div style={{ width: "80%", height: "90%", padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                {data.length > 0 && <MassIngredientUsageChart data={data} />}
                            </div>
                        </Col>
                        <Col span={12} style={{ padding: "2rem 1rem" }}>
                            <div style={{ width: "80%", height: "90%", padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                {data.length > 0 && <StateSpecificMassIngredientUsageChart data={data} />}
                            </div>
                        </Col>
                    </Row>
                </Card>
                <Card style={{ padding: "8rem 0", boxSizing: 'border-box' }}>
                    <Row>
                        <Col span={12} style={{ padding: "2rem 1rem", height: 500 }} >
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                {data.length > 0 && <TopSupplierPieChart data={data} />}
                            </div>
                        </Col>
                        <Col span={12} style={{ padding: "2rem 1rem" }}>
                            <div style={{ width: "80%", height: "90%", padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                {data.length > 0 && <StateSpecificMassIngredientUsageChart data={data} />}
                            </div>
                        </Col>
                    </Row>
                </Card>
            </div>
        </div >
    );
}

export default SampleCharts;
