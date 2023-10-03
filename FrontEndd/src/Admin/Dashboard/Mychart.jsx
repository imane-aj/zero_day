import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
// import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export function Mychart({revenu}) {
  console.log(revenu)
  
 const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};// Create an object to map month-year values to revenue data
// Ensure that revenu is defined and not null or undefined
const labels = ['01', '02', '03', '04', '05', '06', '07','08','09','10', '11', '12'];
  
// Initialize revenueData with default values
const revenueData = labels.map(() => 0);

// Populate revenueData if revenu is defined
if (revenu) {
  revenu.forEach((item) => {
    // Check if the label corresponds to a month-year in the data
    if (labels.includes(item.month)) {
      const index = labels.indexOf(item.month);
      revenueData[index] = parseFloat(item.revenue);
    }
  });
}

 const data = {
  labels,
  datasets: [
    {
      label: 'Revenue par mois',
      data: revenueData,
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }
  ],
};


  return <Bar options={options} data={data} />;
}

