/* eslint-disable no-undef */
'use client';
import { Tabs } from 'antd';
import Papa from 'papaparse';
import { useEffect, useState } from 'react';
import SampleCharts from './sampleCharts.tsx';
import UploadComponent from './UploadComponent';

const { TabPane } = Tabs;

const Home = () => {
  const [data, setData] = useState([]);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    Papa.parse('/data/FracFocusRegistry_13.csv', {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        if (result.data && result.data.length > 0) {
          const cleanedData = result.data.filter(item => {
            const date = new Date(item.JobStartDate);
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
      <h3 style={{ margin: "16px 0" }}>Dashboard</h3>
      <Tabs defaultActiveKey="1" centered style={{ margin: "0 24px" }}>
        <TabPane tab="Upload and View Data" key="1">
          <UploadComponent onDataParsed={setData} />
        </TabPane>
        <TabPane tab="Sample Charts" key="2">
          {/* Pass data to DataProcessing component or any other components as needed */}
          <SampleCharts data={data} />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Home;
