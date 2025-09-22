import { useState } from 'react'; // Adicione o useState
import { useNavigate } from 'react-router-dom';
import { useSitesData } from '../hooks/useSitesData';
import SiteCard from '../components/SiteCard';
import CreateSiteModal from '../components/CreateSiteModal'; // Importe o modal
import '../App.css';

const DashboardPage = () => {
  const { data, isLoading, isError } = useSitesData();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para o modal

  const handleLogout = () => {
    localStorage.removeItem('jwt_token');
    navigate('/login');
    window.location.reload();
  };

  if (isLoading) return <div>Carregando sites...</div>;
  if (isError) return <div>Erro ao carregar os sites.</div>;

  return (
    <div className="container">
      {isModalOpen && <CreateSiteModal onClose={() => setIsModalOpen(false)} />}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Dashboard - Sites</h1>
        <div>
          <button onClick={() => setIsModalOpen(true)}>Criar Novo Site</button>
          <button onClick={handleLogout} style={{ marginLeft: '10px' }}>Sair</button>
        </div>
      </div>

      <div className="site-grid">
        {data?.map(site => (
          <div key={site.id} onClick={() => navigate(`/site/${site.id}`)} style={{cursor: 'pointer'}}>
            <SiteCard site={site} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;