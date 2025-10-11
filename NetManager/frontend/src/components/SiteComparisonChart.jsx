import { useSitesData } from '../hooks/useSitesData';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Card, Spinner } from 'react-bootstrap';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SiteComparisonChart = () => {
  const { data: sites, isLoading } = useSitesData();

  if (isLoading) return <Spinner animation="border" size="sm" />;

  const chartData = {
    labels: sites?.map(site => site.nome) || [],
    datasets: [
      {
        label: 'Total de Portas por Site',
        data: sites?.map(site => site.totalPortas) || [],
        backgroundColor: 'rgba(138, 180, 248, 0.6)', // Azul Gemini com transparência
        borderColor: 'rgba(138, 180, 248, 1)',
        borderWidth: 1,
      },
    ],
  };

  // --- AJUSTES DE COR AQUI ---
  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Comparativo de "Tamanho" por Rack',
        color: '#e3e3e3', // Cor do título do gráfico
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#9aa0a6', // Cor dos números do eixo X
        },
        grid: {
          color: '#3c4043', // Cor das linhas de grade
        },
      },
      y: {
        ticks: {
          color: '#e3e3e3', // Cor dos nomes dos Racks no eixo Y
        },
        grid: {
          color: '#3c4043', // Cor das linhas de grade
        },
      },
    },
  };

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <div style={{ position: 'relative', height: '300px' }}>
          <Bar data={chartData} options={options} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default SiteComparisonChart;