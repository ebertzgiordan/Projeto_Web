import { useSiteStatsData } from '../hooks/useSiteStatsData';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Card, Spinner } from 'react-bootstrap';

ChartJS.register(ArcElement, Tooltip, Legend);

const SiteUsageChart = ({ siteId }) => {
  const { data: stats, isLoading } = useSiteStatsData(siteId);

  if (isLoading) return <Spinner animation="border" size="sm" />;
  if (!stats) return <p className="text-muted text-center">Não foi possível carregar as estatísticas.</p>;

  const portasVagas = stats.totalPortasNoSite - stats.portasEmUso;

  const chartData = {
    labels: ['Portas em Uso', 'Portas Vagas'],
    datasets: [{
      data: [stats.portasEmUso, portasVagas],

      backgroundColor: [
        'rgba(138, 180, 248, 0.8)', 
        'rgba(60, 64, 67, 0.8)'  
      ],
      borderColor: '#1e1f20',
      borderWidth: 2,
    }],
  };


  const options = {
    plugins: {
      legend: {
        position: 'top',
        labels: {

          color: '#e3e3e3', 
          font: {
            size: 14
          }
        }
      },
      title: {
        display: true,
        text: `Ocupação do Rack (${stats.totalPortasNoSite} Portas)`,
        color: '#e3e3e3', 
        font: {
            size: 16
        }
      }
    }
  };

  return (
    <Card className="h-100 shadow-sm">
      <Card.Body className="d-flex flex-column align-items-center">
        <div style={{ width: '100%', maxWidth: '250px' }}>
          <Pie data={chartData} options={options} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default SiteUsageChart;