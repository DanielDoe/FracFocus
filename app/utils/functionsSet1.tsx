/* eslint-disable no-undef */
import { format, parseISO } from 'date-fns';
import Papa from 'papaparse';

// Function to parse CSV and process data
function processData(csvData: any) {
    const parsedData = Papa.parse(csvData, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        transform: (value: string, column: string) => {
            if (column === 'JobStartDate' || column === 'JobEndDate') {
                return parseISO(value);
            }
            return value;
        }
    }).data;

    parsedData.forEach((row: { JobDuration: number; JobEndDate: number; JobStartDate: number; }) => {
        row.JobDuration = (row.JobEndDate - row.JobStartDate) / (1000 * 60 * 60 * 24); // Convert ms to days
    });

    // Aggregate data
    const monthlyAggregates = {};
    const yearlyAggregates = {};

    parsedData.forEach((row: { JobStartDate: any; TotalBaseWaterVolume: any; }) => {
        const month = format(row.JobStartDate, 'yyyy-MM');
        const year = format(row.JobStartDate, 'yyyy');
        monthlyAggregates[month] = (monthlyAggregates[month] || 0) + (row.TotalBaseWaterVolume || 0);
        yearlyAggregates[year] = (yearlyAggregates[year] || 0) + (row.TotalBaseWaterVolume || 0);
    });

    return { monthlyAggregates, yearlyAggregates };
}

// Call this function with the CSV data
const { monthlyAggregates, yearlyAggregates } = processData(csvString); // Assuming csvString is your CSV data
