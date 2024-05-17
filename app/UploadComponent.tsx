import { InboxOutlined } from '@ant-design/icons';
import { Card, Col, Row, Upload, message } from 'antd';
import Papa from 'papaparse';
import { useState } from 'react';

// Import chart components
import JobMonthsChart from '/components/sampleCharts/JobMonthsChart.tsx';
import JobYearChart from '/components/sampleCharts/JobYearChart.tsx';
import MassIngredientUsageChart from '/components/sampleCharts/MassIngredientUsageChart.tsx';
import MonthlyPercentHFJobChart2024 from '/components/sampleCharts/MonthlyPercentHFJobChart2024.tsx';
import NonWaterVolumeChart from '/components/sampleCharts/NonWaterVolumeChart.tsx';
import NonWaterVolumeChart24 from '/components/sampleCharts/NonWaterVolumeChart24.tsx';
import PercentHFJobVsMassIngredientChart from '/components/sampleCharts/PercentHFJobVsMassIngredientChart.tsx';
import StateNonWaterVolumeChart from '/components/sampleCharts/StateNonWaterVolumeChart.tsx';
import StatePercentHFJobChart from '/components/sampleCharts/StatePercentHFJobChart.tsx';
import StateSpecificMassIngredientUsageChart from '/components/sampleCharts/StateSpecificMassIngredientUsageChart.tsx';
import StateWaterVolumeChart from '/components/sampleCharts/StateWaterVolumeChart.tsx';
import TopSupplierPieChart from '/components/sampleCharts/TopSupplierPieChart.tsx';
import WaterVolumeChart from '/components/sampleCharts/WaterVolumeChart.tsx';
import WaterVolumeChart24 from '/components/sampleCharts/WaterVolumeChart24.tsx';
import WaterVsNonWaterVolumeChart from '/components/sampleCharts/WaterVsNonWaterVolumeChart.tsx';

const { Dragger } = Upload;
const MAX_ROWS = 100000; // Maximum number of rows to process

const UploadComponent = () => {
    const [data, setData] = useState([]);  // State to hold processed data

    const customRequest = ({ file, onSuccess, onError }) => {
        const reader = new FileReader();
        let processedRows = []; // Array to hold rows processed

        reader.onload = () => {
            Papa.parse(reader.result, {
                header: true,
                dynamicTyping: true,
                skipEmptyLines: true,
                step: (result, parser) => {
                    // Check if essential fields are not null or empty
                    const data = result.data;
                    if (processedRows.length < MAX_ROWS && isValidRow(data)) {
                        processedRows.push(data);
                    } else if (processedRows.length >= MAX_ROWS) {
                        parser.abort();
                        message.warning(`Only the first ${MAX_ROWS} rows have been processed due to size limitations.`);
                    }
                },
                complete: () => {
                    setData(processedRows); // Update the state with the processed rows
                    onSuccess(null, file);
                    message.success(`Processed ${processedRows.length} rows.`);
                },
                error: (error) => {
                    message.error(`Failed to parse CSV file: ${error.message}`);
                    onError(error);
                }
            });
        };

        reader.readAsText(file);
        return false;
    };

    // Utility function to check if a row is valid
    function isValidRow(data) {
        return data.JobStartDate && data.TotalBaseWaterVolume && !isNaN(new Date(data.JobStartDate).valueOf());
    }

    return (
        <div style={{ width: "90%", margin: 'auto' }}>
            <Row>
                <Col span={8}></Col>
                <Col span={8}><Dragger customRequest={customRequest} accept=".csv">
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">Support for a single or bulk upload. Only CSV files.</p>
                </Dragger></Col>
                <Col span={8}></Col>
            </Row>
            <Card style={{ width: '100%', height: '42rem', boxSizing: 'border-box', margin: "8rem 0" }}>
                <Row>
                    <Col span={12} style={{ padding: "1rem" }}>
                        <div style={{ width: "80%", padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            {data.length > 0 && <JobYearChart data={data} />}
                        </div>
                    </Col>
                    <Col span={12} style={{ padding: "1rem" }}>
                        <div style={{ width: "80%", padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            {data.length > 0 && <JobMonthsChart data={data} />}
                        </div>
                    </Col>
                </Row>
            </Card>
            <Card style={{ width: '100%', height: '42rem', boxSizing: 'border-box', margin: "2rem 0" }}>
                <Row>
                    <Col span={12} style={{ padding: "2rem 1rem" }}>
                        <div style={{ width: "80%", padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            {data.length > 0 && <WaterVolumeChart data={data} />}
                        </div>
                    </Col>
                    <Col span={12} style={{ padding: "2rem 1rem" }}>
                        <div style={{ width: "80%", padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            {data.length > 0 && <WaterVolumeChart24 data={data} />}
                        </div>
                    </Col>
                </Row>
            </Card>
            <Card style={{ width: '100%', height: '42rem', boxSizing: 'border-box', margin: "2rem 0" }}>
                <Row>
                    <Col span={12} style={{ padding: "2rem 1rem" }}>
                        <div style={{ width: "80%", padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            {data.length > 0 && <NonWaterVolumeChart data={data} />}
                        </div>
                    </Col>
                    <Col span={12} style={{ padding: "2rem 1rem" }}>
                        <div style={{ width: "80%", padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            {data.length > 0 && <NonWaterVolumeChart24 data={data} />}
                        </div>
                    </Col>
                </Row>
            </Card>
            <Card style={{ width: '100%', height: '42rem', boxSizing: 'border-box', margin: "2rem 0" }}>
                <Row>
                    <Col span={12} style={{ padding: "2rem 1rem" }}>
                        <div style={{ width: "80%", padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            {data.length > 0 && <StateWaterVolumeChart data={data} />}
                        </div>
                    </Col>
                    <Col span={12} style={{ padding: "2rem 1rem" }}>
                        <div style={{ width: "80%", padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            {data.length > 0 && <StateNonWaterVolumeChart data={data} />}
                        </div>
                    </Col>
                </Row>
            </Card>
            <Card style={{ width: '100%', height: '42rem', boxSizing: 'border-box', margin: "2rem 0" }}>
                <Row>
                    <Col span={12} style={{ padding: "2rem 1rem", height: 500 }} >
                        <div style={{ width: "80%", padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            {data.length > 0 && <PercentHFJobVsMassIngredientChart data={data} />}
                        </div>
                    </Col>
                    <Col span={12} style={{ padding: "2rem 1rem" }}>
                        <div style={{ width: "80%", padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            {data.length > 0 && <WaterVsNonWaterVolumeChart data={data} />}
                        </div>
                    </Col>
                </Row>
            </Card>
            <Card style={{ width: '100%', height: '42rem', boxSizing: 'border-box', margin: "2rem 0" }}>
                <Row>
                    <Col span={12} style={{ padding: "2rem 1rem" }}>
                        <div style={{ width: "80%", padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            {data.length > 0 && <StatePercentHFJobChart data={data} />}
                        </div>
                    </Col>
                    <Col span={12} style={{ padding: "2rem 1rem" }}>
                        <div style={{ width: "80%", padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            {data.length > 0 && <MonthlyPercentHFJobChart2024 data={data} />}
                        </div>
                    </Col>
                </Row>
            </Card>
            <Card style={{ width: '100%', height: '42rem', boxSizing: 'border-box', margin: "2rem 0" }}>
                <Row>
                    <Col span={12} style={{ padding: "2rem 1rem" }}>
                        <div style={{ width: "80%", padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            {data.length > 0 && <MassIngredientUsageChart data={data} />}
                        </div>
                    </Col>
                    <Col span={12} style={{ padding: "2rem 1rem" }}>
                        <div style={{ width: "80%", padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            {data.length > 0 && <StateSpecificMassIngredientUsageChart data={data} />}
                        </div>
                    </Col>
                </Row>
            </Card>
            <Card style={{ padding: "2rem 0", height: '42rem', boxSizing: 'border-box' }}>
                <Row>
                    <Col span={12} style={{ padding: "2rem 1rem", height: 500 }} >
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            {data.length > 0 && <TopSupplierPieChart data={data} />}
                        </div>
                    </Col>
                    <Col span={12} style={{ padding: "2rem 1rem" }}>
                        <div style={{ width: "80%", padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            {data.length > 0 && <StateSpecificMassIngredientUsageChart data={data} />}
                        </div>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default UploadComponent;
