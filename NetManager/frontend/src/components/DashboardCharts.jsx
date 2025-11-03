import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
import { Card, Col, Row, Spinner, Alert } from 'react-bootstrap';
const fetchStats = async () => {
  const response = await api.get('/api/dashboard/general-stats');
  return response.data;
};
const StatCard = ({ title, value, icon }) => (
  <Card className="shadow-sm h-100 bg-dark text-white">
    <Card.Body>
      <div className="d-flex align-items-center">
        <div className="fs-3 text-primary me-3">{icon}</div>
        <div>
          <div className="text-muted">{title}</div>
          <div className="fs-4 fw-bold">{value}</div>
        </div>
      </div>
    </Card.Body>
  </Card>
);

const DashboardStatCards = () => {
  const { data: stats, isLoading, isError, error } = useQuery({
    queryKey: ['global-stats'],
    queryFn: fetchStats,
    staleTime: 60000,
    retry: 1
  });

  if (isLoading) {
    return (
      <div className="text-center p-5">
        <Spinner animation="border" variant="light" />
        <p className="text-muted mt-2">Carregando estatísticas...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant="danger">
        Erro ao carregar estatísticas: {error?.response?.data?.detail || error?.message || 'Erro desconhecido'}
        <br />
        <small>Verifique o console do navegador (F12) e o log do backend.</small>
      </Alert>
    );
  }


  return (
    <Row xs={1} md={2} xl={4} className="g-4">
      <Col>
        <StatCard title="Total de Racks" value={stats?.totalSites ?? 0} icon="🗄️" />
      </Col>
      <Col>
        <StatCard title="Total de Portas" value={stats?.totalPortasDisponiveis ?? 0} icon="🔌" />
      </Col>
      <Col>
        <StatCard title="Portas em Uso" value={stats?.portasEmUso ?? 0} icon="🟢" />
      </Col>
      <Col>
        <StatCard title="Usuários Ativos" value={stats?.totalUsuarios ?? 0} icon="👥" />
      </Col>
    </Row>
  );
};

export default DashboardStatCards;