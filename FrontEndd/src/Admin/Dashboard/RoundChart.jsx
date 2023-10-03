import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);
export function RoundChart({mergedData}) {
  console.log(mergedData)
  if (!mergedData) {
    // Handle the case where mergedData is not defined or null
    return <div>No data available</div>;
  }

  const { revenueByDisp, revenueByTransfer } = mergedData;
  const data = {
    labels: [...revenueByDisp?.map(item => item.disp), 'Transfer'], // Include 'Transfer' label
    datasets: [
      {
        data: [
          ...revenueByDisp?.map(item => parseFloat(item.revenue)),
          parseFloat(revenueByTransfer[0].revenue), // Use the first value from revenueByTransfer
        ],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
      ],
      borderWidth: 1,
    },
  ],
};


  return <Pie data={data} />;
}
