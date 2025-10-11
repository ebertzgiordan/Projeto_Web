import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSitesData } from '../hooks/useSitesData';
import { useSiteMutate } from '../hooks/useSiteMutante';
import SiteCard from '../components/SiteCard';
import CreateSiteModal from '../components/CreateSiteModal';
import EditSiteModal from '../components/EditSiteModal';
import SiteComparisonChart from '../components/SiteComparisonChart';
import DashboardStatCards from '../components/DashboardStatCards';
import { Container, Row, Col, Button, Spinner, Alert, Navbar } from 'react-bootstrap';
import { useUserData } from '../hooks/userData';
import SiteCardSkeleton from '../components/SiteCardSkeleton';
import { Fade } from "react-awesome-reveal";

const DashboardPage = () => {
  const { data: usuario } = useUserData();
  const { data: sites, isLoading, isError } = useSitesData();
  const { create, update, delete: deleteSite, isPending } = useSiteMutate();
  const navigate = useNavigate();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingSite, setEditingSite] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('jwt_token');
    navigate('/login');
    window.location.reload();
  };

  const handleCreateSite = (data) => {
    create(data, {
      onSuccess: () => setShowCreateModal(false),
    });
  };

  const handleOpenEditModal = (site) => {
    setEditingSite(site);
    setShowEditModal(true);
  };

  const handleUpdateSite = (data) => {
    update({ id: editingSite.id, data }, {
      onSuccess: () => setShowEditModal(false),
    });
  };

  const handleDeleteSite = (siteId) => {
    if (window.confirm('Tem certeza que deseja excluir este Rack e todos os seus dados?')) {
      deleteSite(siteId);
    }
  };

  return (
    <div className="min-vh-100">
      <Navbar bg="dark" variant="dark" expand="lg" className="px-3 shadow-sm">
        <img
          src="/logo.png"
          width="30"
          height="30"
          className="d-inline-block align-top me-2"
          alt="NetManager Logo"
        />
        <Navbar.Brand href="/">NetManager</Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Button variant="outline-light" onClick={handleLogout}>Sair</Button>
        </Navbar.Collapse>
      </Navbar>

      <Container className="py-5">
        <div className="mb-5">
          <Fade direction="down" triggerOnce>
            <h1 className="h2 mb-1">Bem-vindo, {usuario ? usuario.nome.split(' ')[0] : '...'}!</h1>
            <p className="text-muted">Esta é a visão geral da sua infraestrutura.</p>
          </Fade>
          <Fade direction="up" cascade damping={0.1} triggerOnce>
            <DashboardStatCards />
          </Fade>
        </div>

        { }
        <div className="mb-5">
          <h2 className="h3 mb-4">Comparativo de portas por Rack</h2>
          <Row>
            <Col>
              <SiteComparisonChart />
            </Col>
          </Row>
        </div>

        <header className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="h3">Racks Cadastrados</h2>
          <Button variant="primary" onClick={() => setShowCreateModal(true)}>+ Adicionar Novo Rack</Button>
        </header>

        <main>
          {isLoading ? (
            <Row xs={1} md={2} lg={3} xl={4} className="g-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <Col key={index}>
                  <SiteCardSkeleton />
                </Col>
              ))}
            </Row>
          ) : isError ? (
            <Alert variant="danger">Erro ao carregar os dados.</Alert>
          ) : (
            <Row xs={1} md={2} lg={3} xl={4} className="g-4">
              {sites?.map((site, index) => (
                <Col key={site.id}>
                  <Fade direction="up" delay={index * 50} triggerOnce>
                    <SiteCard
                      site={site}
                      onClick={() => navigate(`/site/${site.id}`)}
                      onEdit={() => handleOpenEditModal(site)}
                      onDelete={() => handleDeleteSite(site.id)}
                    />
                  </Fade>
                </Col>
              ))}
            </Row>
          )}
        </main>
      </Container>
      {showCreateModal && <CreateSiteModal show={showCreateModal} onHide={() => setShowCreateModal(false)} onSubmit={handleCreateSite} isLoading={isPending} />}
      {showEditModal && <EditSiteModal site={editingSite} show={showEditModal} onHide={() => setShowEditModal(false)} onSubmit={handleUpdateSite} isLoading={isPending} />}
    </div>
  );
};

export default DashboardPage;