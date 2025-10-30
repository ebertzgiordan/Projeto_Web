import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSiteByIdData } from '../hooks/useSiteByIdData';
import { usePatchPanelsData } from '../hooks/usePatchPanelsData';
import { usePontosDeRedeByPanelData } from '../hooks/usePontosDeRedeByPanelData';
import { usePontosDeRedeMutate } from '../hooks/usePontosDeRedeMutante';
import { usePatchPanelMutate } from '../hooks/usePatchPanelMutate';
import PontoDeRedeModal from '../components/PontoDeRedeModal';
import CreatePatchPanelModal from '../components/CreatePatchPanelModal';
import SiteUsageChart from '../components/SiteUsageChart';
import { Container, Card, Table, Spinner, Alert, Button, Form, Row, Col, ButtonGroup } from 'react-bootstrap';

const SiteDetailPage = () => {
    const { id: siteId } = useParams();
    const navigate = useNavigate();
    const [selectedPanelId, setSelectedPanelId] = useState('');
    const [showPontoModal, setShowPontoModal] = useState(false);
    const [showPanelModal, setShowPanelModal] = useState(false);
    const [editingPonto, setEditingPonto] = useState(null);

    const { data: site, isLoading: isLoadingSite } = useSiteByIdData(siteId);
    const { data: patchPanels, isLoading: isLoadingPanels } = usePatchPanelsData(siteId);
    const { data: pontosDeRede, isLoading: isLoadingPontos } = usePontosDeRedeByPanelData(selectedPanelId);

    const { create: createPonto, update: updatePonto, delete: deletePonto, isCreating, isUpdating, isDeleting } = usePontosDeRedeMutate();
    const { create: createPanel, isPending: isCreatingPanel } = usePatchPanelMutate();

    const isLoadingMutation = isCreating || isUpdating || isDeleting;

    useEffect(() => {
        if (patchPanels && patchPanels.length > 0 && !selectedPanelId) {
            setSelectedPanelId(patchPanels[0].id);
        }
    }, [patchPanels, selectedPanelId]);

    const handleOpenCreatePontoModal = () => {
        setEditingPonto(null);
        setShowPontoModal(true);
    };
    const handleOpenEditPontoModal = (ponto) => {
        setEditingPonto(ponto);
        setShowPontoModal(true);
    };
    const handleClosePontoModal = () => {
        setShowPontoModal(false);
        setEditingPonto(null);
    };
    const handleSubmitPontoModal = (formData) => {
        const dataPayload = { ...formData, usuarioId: 1 };
        if (editingPonto) {
            updatePonto({ id: editingPonto.id, data: dataPayload }, { onSuccess: handleClosePontoModal });
        } else {
            alert("Lógica de criação a ser definida: normalmente editamos uma porta 'Vaga'");
        }
    };
    const handleDeletePonto = (pontoId) => {
        if (window.confirm('Tem certeza que deseja excluir este ponto de rede?')) {
            deletePonto(pontoId);
        }
    };

    const handleCreatePanel = (data) => {
        createPanel({ siteId, data }, {
            onSuccess: () => setShowPanelModal(false)
        });
    };

    if (isLoadingSite) return <div className="text-center mt-5"><Spinner /></div>;
    if (!site) return <Alert variant="danger" className="m-5">Site não encontrado.</Alert>;

    return (
        <>
            <PontoDeRedeModal show={showPontoModal} onHide={handleClosePontoModal} onSubmit={handleSubmitPontoModal} ponto={editingPonto} isLoading={isLoadingMutation} />
            <CreatePatchPanelModal show={showPanelModal} onHide={() => setShowPanelModal(false)} onSubmit={handleCreatePanel} isLoading={isCreatingPanel} />

            <Container className="py-5">
                <Button variant="outline-secondary" onClick={() => navigate('/')} className="mb-4">&larr; Voltar ao Dashboard</Button>

                <Card className="mb-5 shadow-sm">
                    <Card.Header as="h2">{site.nome}</Card.Header>
                    <Card.Body>
                        <Card.Text><strong>Endereço:</strong> {site.endereco || 'Não informado'}</Card.Text>
                    </Card.Body>
                </Card>

                <Row className="align-items-center mb-3">
                    <Col md={8}>
                        <Form.Group>
                            <Form.Label>Selecione o Patch Panel para Manutenção:</Form.Label>
                            <Form.Select value={selectedPanelId} onChange={e => setSelectedPanelId(e.target.value)} disabled={isLoadingPanels}>
                                {isLoadingPanels ? <option>Carregando...</option> :
                                    patchPanels?.length > 0 ?
                                        patchPanels.map(panel => <option key={panel.id} value={panel.id}>{panel.nome} ({panel.totalPortas} portas)</option>) :
                                        <option>Nenhum painel cadastrado</option>
                                }
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={4} className="text-md-end mt-3 mt-md-0">
                        <SiteUsageChart siteId={siteId} />
                        <Button variant="success" onClick={() => setShowPanelModal(true)}>
                            + Adicionar Patch Panel
                        </Button>
                    </Col>
                </Row>

                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Porta</th><th>Uso</th><th>Localização</th><th>VLAN</th><th>IP</th><th className="text-center">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoadingPontos ? (
                            <tr><td colSpan="6" className="text-center"><Spinner size="sm" /></td></tr>
                        ) : pontosDeRede?.length > 0 ? (
                            pontosDeRede.map(ponto => (
                                <tr key={ponto.id}>
                                    <td>{ponto.nomeCompletoDaPorta}</td>
                                    <td>{ponto.tipoUso}</td>
                                    <td>{ponto.localizacao || '-'}</td>
                                    <td>{ponto.vlan || '-'}</td>
                                    <td>{ponto.ipAddress || '-'}</td>
                                    <td className="text-center">
                                        <ButtonGroup size="sm">
                                            <Button variant="outline-primary" onClick={() => handleOpenEditPontoModal(ponto)}>Editar</Button>
                                        </ButtonGroup>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="6" className="text-center">Selecione um Patch Panel para ver as portas.</td></tr>
                        )}
                    </tbody>
                </Table>
            </Container>
        </>
    );
};

export default SiteDetailPage;