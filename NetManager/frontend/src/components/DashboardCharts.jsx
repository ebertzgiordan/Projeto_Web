import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Card, Spinner } from 'react-bootstrap';

// Registra os componentes necessários do Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

// Função que busca os dados no endpoint de estatísticas do backend
const fetchStats = async () => {
  const response = await api.get('/api/pontos-de-rede/stats');
  return response.data;
};

const DashboardCharts = () => {
  const { data: stats, isLoading } = useQuery({ queryKey: ['dashboard-stats'], queryFn: fetchStats });

  if (isLoading) return <Spinner animation="border" size="sm" />;

  const totalReservas = stats.totalPontosDeRede - stats.portasEmUso;

  const chartData = {
    labels: ['Portas em Uso', 'Portas de Reserva'],
    datasets: [
      {
        data: [stats.portasEmUso, totalReservas],
        backgroundColor: ['#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#36A2EB', '#FFCE56'],
      },
    ],
  };

  return (
    <Card className="h-100 shadow-sm">
      <Card.Body className="d-flex flex-column align-items-center">
        <Card.Title>Uso Geral de Portas</Card.Title>
        <div style={{ width: '100%', maxWidth: '250px' }}>
          <Pie data={chartData} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default DashboardCharts;