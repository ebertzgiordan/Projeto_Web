import { Card, Container } from 'react-bootstrap';

const HelpPage = () => {
  return (
    <Container>
      <h1>Como Usar o Sistema</h1>
      <Card className="mt-4">
        <Card.Body>
          <Card.Title>Bem-vindo ao NetManager!</Card.Title>
          <Card.Text>
            Este sistema foi projetado para ajudá-lo a gerenciar a infraestrutura de rede de seus clientes de forma centralizada.
          </Card.Text>
          <img src="./patch-panel.png" alt="Exemplo de Patch Panel" className="img-fluid rounded my-3" />
          <h5>Funcionalidades:</h5>
          <ul>
            <li><strong>Dashboard:</strong> Visualize estatísticas gerais e um comparativo de tamanho dos seus racks.</li>
            <li><strong>Racks Cadastrados:</strong> Crie, edite e exclua os locais/clientes que você gerencia.</li>
            <li><strong>Página de Detalhes:</strong> Ao clicar em um rack, você pode gerenciar os patch panels e editar cada uma das portas de rede.</li>
          </ul>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default HelpPage;