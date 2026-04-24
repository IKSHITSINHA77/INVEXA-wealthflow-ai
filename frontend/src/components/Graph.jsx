import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Filler);

function Graph() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [{
      label: "Portfolio Value",
      data: [100000, 115000, 108000, 125430, 132000, 145000],
      borderColor: "#00f5a0",
      backgroundColor: "rgba(0, 245, 160, 0.1)",
      borderWidth: 3,
      tension: 0.4,
      fill: true,
      pointBackgroundColor: "#00f5a0",
      pointBorderColor: "#0b0f1a",
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(11, 15, 26, 0.9)",
        titleColor: "#00f5a0",
        bodyColor: "#fff",
        borderColor: "rgba(255,255,255,0.1)",
        borderWidth: 1,
        padding: 10,
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#6b7280" },
      },
      y: {
        grid: { color: "rgba(255,255,255,0.05)" },
        ticks: {
          color: "#6b7280",
          callback: (value) => "$" + value.toLocaleString(),
        },
      },
    },
  };

  return <Line data={data} options={options} />;
}

export default Graph;