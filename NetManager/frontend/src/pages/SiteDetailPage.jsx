import { useState, useEffect, useMemo } from 'react';
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
import { useSiteMutate } from '../hooks/useSiteMutante';
import ImportDataModal from '../components/ImportDataModal';
import { useImportMutate } from '../hooks/useImportMutate';

const SiteDetailPage = () => {
    const { id: siteId } = useParams();
    const navigate = useNavigate();

    // --- States ---
    const [selectedPanelId, setSelectedPanelId] = useState('');
    const [showPontoModal, setShowPontoModal] = useState(false);
    const [showPanelModal, setShowPanelModal] = useState(false);
    const [editingPonto, setEditingPonto] = useState(null);
    const [notas, setNotas] = useState('');
    const [showImportModal, setShowImportModal] = useState(false);

    // --- (NOVO) STATES PARA OS FILTROS ---
    const [searchTerm, setSearchTerm] = useState(''); // Para "Mesa Flávio"
    const [usoFilter, setUsoFilter] = useState(''); // Para "PC", "Impressora", etc.
    // --- FIM DOS NOVOS STATES ---

    // --- Hooks de Busca (GET) ---
    const { data: site, isLoading: isLoadingSite, isError } = useSiteByIdData(siteId); 
    const { data: patchPanels, isLoading: isLoadingPanels } = usePatchPanelsData(siteId);
    const { data: pontosDeRede, isLoading: isLoadingPontos } = usePontosDeRedeByPanelData(selectedPanelId);

    // --- Hooks de Mutação (POST/PUT) ---
    const { update: updateSite, isPending: isSavingNotas } = useSiteMutate();
    const { create: createPonto, update: updatePonto, delete: deletePonto, isCreating, isUpdating, isDeleting } = usePontosDeRedeMutate();
    const { create: createPanel, isPending: isCreatingPanel } = usePatchPanelMutate();
    const { importData, isImporting } = useImportMutate(siteId);
    const isLoadingMutation = isCreating || isUpdating || isDeleting;

    // 'useMemo' para que a lista só seja recalculada se os filtros ou os dados mudarem
    const filteredPontos = useMemo(() => {
        if (!pontosDeRede) return [];

        let pontosFiltrados = [...pontosDeRede];
        const lowerCaseSearch = searchTerm.toLowerCase();

        // 1. Filtro por "Tipo de Uso"
        if (usoFilter) {
            pontosFiltrados = pontosFiltrados.filter(
                ponto => ponto.tipoUso.toLowerCase() === usoFilter.toLowerCase()
            );
        }

        // 2. Filtro por "Termo de Busca" (Procura no Local, IP e Notas)
        if (lowerCaseSearch) {
            pontosFiltrados = pontosFiltrados.filter(ponto => 
                (ponto.localizacao && ponto.localizacao.toLowerCase().includes(lowerCaseSearch)) ||
                (ponto.ipAddress && ponto.ipAddress.toLowerCase().includes(lowerCaseSearch)) ||
                (ponto.notas && ponto.notas.toLowerCase().includes(lowerCaseSearch))
            );
        }

        return pontosFiltrados;
    }, [pontosDeRede, searchTerm, usoFilter]); 

    // Pega os tipos de uso únicos para montar o dropdown do filtro
    const tiposDeUsoUnicos = useMemo(() => {
        if (!pontosDeRede) return [];
        const usos = pontosDeRede.map(p => p.tipoUso);
        return [...new Set(usos)].sort(); 
    }, [pontosDeRede]);

    // --- Effects ---
    useEffect(() => {
        if (patchPanels && patchPanels.length > 0 && !selectedPanelId) {
            setSelectedPanelId(patchPanels[0].id);
        }
    }, [patchPanels, selectedPanelId]);

    useEffect(() => {
        if (site) {
            setNotas(site.notas || '');
        }
    }, [site]);

    // --- Handlers (Funções) ---
    const handleSaveNotas = (e) => {
        e.preventDefault();
        const dataPayload = { nome: site.nome, endereco: site.endereco, notas: notas };
        updateSite({ id: siteId, data: dataPayload }, {
            onSuccess: () => alert('Notas salvas com sucesso!'),
            onError: (err) => alert(`Erro ao salvar notas: ${err.message}`)
        });
    };
    const handleImportSubmit = (payload, options) => { importData(payload, options); };
    const handleOpenEditPontoModal = (ponto) => { setEditingPonto(ponto); setShowPontoModal(true); };
    const handleClosePontoModal = () => { setShowPontoModal(false); setEditingPonto(null); };
    const handleSubmitPontoModal = (formData) => {
        const dataPayload = { ...formData, usuarioId: 1 };
        if (editingPonto) {
            updatePonto({ id: editingPonto.id, data: dataPayload }, { onSuccess: handleClosePontoModal });
        }
    };
    const handleCreatePanel = (data) => {
        createPanel({ siteId, data }, { onSuccess: () => setShowPanelModal(false) });
    };

    if (isLoadingSite) return <div className="text-center mt-5"><Spinner /></div>;
    if (isError || !site) return <Alert variant="danger" className="m-5">Site não encontrado ou erro ao carregar.</Alert>; 

    return (
        <>
            <PontoDeRedeModal show={showPontoModal} onHide={handleClosePontoModal} onSubmit={handleSubmitPontoModal} ponto={editingPonto} isLoading={isLoadingMutation} />
            <CreatePatchPanelModal show={showPanelModal} onHide={() => setShowPanelModal(false)} onSubmit={handleCreatePanel} isLoading={isCreatingPanel} />
            <ImportDataModal 
                show={showImportModal}
                onHide={() => setShowImportModal(false)}
                onSubmit={handleImportSubmit}
                isImporting={isImporting}
                siteId={siteId}
            />

            <Container className="py-5">
                <Button variant="outline-secondary" onClick={() => navigate('/')} className="mb-4">&larr; Voltar ao Dashboard</Button>

                <Card className="mb-5 shadow-sm">
                    <Card.Header as="h2">{site.nome}</Card.Header>
                    <Card.Body>
                        <Card.Text><strong>Endereço:</strong> {site.endereco || 'Não informado'}</Card.Text>
                    </Card.Body>
                </Card>

                <Row className="align-items-end mb-4 g-3">
                    <Col md={5} xl={5}> 
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
                    <Col md={3} xl={3}>
                        <SiteUsageChart siteId={siteId} />
                    </Col>
                    <Col md={4} xl={4} className="d-flex flex-column flex-md-row justify-content-md-end">
                        <Button variant="outline-info" onClick={() => setShowImportModal(true)} className="mb-2 mb-md-0 ms-md-2">
                            Importar Dados
                        </Button>
                        <Button variant="success" onClick={() => setShowPanelModal(true)} className="ms-md-2">
                            + Adicionar Patch Panel
                        </Button>
                    </Col>
                </Row>

                <Card className="shadow-sm mb-4">
                    <Card.Body>
                        <Row className="g-3">
                            <Col md={8}>
                                <Form.Group>
                                    <Form.Label>Buscar em Localização / IP / Notas:</Form.Label>
                                    <Form.Control 
                                        type="text"
                                        placeholder="Ex: Mesa Flávio, 192.168..., etc."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Filtrar por Tipo de Uso:</Form.Label>
                                    <Form.Select
                                        value={usoFilter}
                                        onChange={(e) => setUsoFilter(e.target.value)}
                                    >
                                        <option value="">-- Todos os Usos --</option>
                                        {tiposDeUsoUnicos.map(uso => (
                                            <option key={uso} value={uso}>{uso}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>


                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Porta</th><th>Uso</th><th>Localização</th><th>VLAN</th><th>IP</th><th className="text-center">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoadingPontos ? (
                            <tr><td colSpan="6" className="text-center"><Spinner size="sm" /></td></tr>
                        ) : 
                        filteredPontos.length > 0 ? (
                            filteredPontos.map(ponto => (
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
                            <tr>
                                <td colSpan="6" className="text-center text-muted">
                                    {pontosDeRede?.length === 0 ? "Nenhuma porta encontrada para este painel." : "Nenhum resultado encontrado para seus filtros."}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                
                <hr className="my-5" />
                
                <h3 className="mb-3">Observações do Rack</h3>
                <Card className="shadow-sm">
                    <Card.Body>
                        <Form onSubmit={handleSaveNotas}>
                            <Form.Group className="mb-3">
                                <Form.Label>Notas Gerais</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={8}
                                    placeholder="Adicione observações gerais sobre este rack, como senhas de patch panels, detalhes de instalação, contatos do cliente, etc."
                                    value={notas}
                                    onChange={(e) => setNotas(e.target.value)}
                                />
                            </Form.Group>
                            <Button type="submit" variant="primary" disabled={isSavingNotas}>
                                {isSavingNotas ? 'Salvando...' : 'Salvar Observações'}
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default SiteDetailPage;