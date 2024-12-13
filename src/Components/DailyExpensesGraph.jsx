import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import AxiosInstance from './utils/AxiosInstance';

// Registering Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DailyExpensesGraph = () => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDailyExpenses = async () => {
      setLoading(true); // Set loading state to true on fetch start

      try {
        // Fetching the daily expenses from the API
        const response = await AxiosInstance.get(`/expense/user/expenses/monthly`, {
          withCredentials: true,
        });

        console.log(response.data);

        // Destructure the response data
        const data = response.data;

        // Ensure the response is in the expected format
        if (!data || data.length === 0) {
          setError('No expenses data found.');
          return;
        }

        // Transform data for chart
        const labels = data.map((item) => `${item.day}/${item.month}`); // Display day/month for clarity
        const amounts = data.map((item) => item.totalAmount);

        // Setting chart data
        setChartData({
          labels,
          datasets: [
            {
              label: 'Daily Expenses',
              data: amounts,
              backgroundColor: 'rgba(75, 192, 192, 0.6)', // Bar color
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        });
      } catch (err) {
        // Handling errors
        console.error('Error fetching expenses data:', err);
        setError('Failed to fetch expenses data.');
      } finally {
        // Setting loading state to false after fetch completion
        setLoading(false);
      }
    };

    fetchDailyExpenses();
  }, []); // Empty dependency array to run effect only once after mount

  // Loading state
  if (loading) return <div className="text-center">Loading...</div>;

  // Error state
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div style={{ width: '80%', margin: '0 auto' }}>
      <h2 className="text-center">Daily Expenses</h2>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: 'top',
            },
            title: {
              display: true,
              text: 'Daily Expenses Overview',
            },
          },
          scales: {
            x: {
              ticks: {
                maxRotation: 45, // Avoid label overlap by rotating the labels
                minRotation: 45,
              },
              grid: {
                display: false, // Hide grid lines for better visualization
              },
            },
            y: {
              beginAtZero: true, // Ensure y-axis starts at zero
            },
          },
        }}
      />
    </div>
  );
};

export default DailyExpensesGraph;
