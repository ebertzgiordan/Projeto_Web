import { Card, Container, Alert, ListGroup } from 'react-bootstrap';

const HelpPage = () => {
  return (
    <Container className="py-5">
      <h1 className="mb-4">Como Usar o Sistema</h1>

      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Card.Title as="h3" className="mb-3">Bem-vindo ao NetManager!</Card.Title>
          <Card.Text>
            Este sistema foi projetado para ajudá-lo a gerenciar a infraestrutura de rede de seus clientes (ou "Racks") de forma centralizada.
            O objetivo é substituir planilhas estáticas por uma plataforma dinâmica, pesquisável e multiusuário.
          </Card.Text>
          <img src="./patch-panel.png" alt="Exemplo de Patch Panel" className="img-fluid rounded my-3" />
        </Card.Body>
      </Card>

      <Card className="shadow-sm mb-4">
        <img src="./Tela_Inicial.png" alt="Tela Inicial" className="img-fluid rounded my-3" />
      </Card>

      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Card.Title as="h3" className="mb-3">O Fluxo de Trabalho Principal</Card.Title>
          <ListGroup variant="flush">

            <ListGroup.Item>
              <h5>1. O Dashboard (Tela Inicial)</h5>
              <img src="./Dashboard.png" alt="Dashboard" className="img-fluid rounded my-3" />
              <p>
                É a sua visão geral. Aqui você vê estatísticas rápidas (Total de Racks, Total de Portas).
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h5>2. Gerenciando Racks (Sites)</h5>
              <img src="./Editar_Rack.png" alt="Exemplo de Patch Panel" className="img-fluid rounded my-3" />
              <p>
                No Dashboard, você pode criar, editar ou excluir um "Rack" (ou Site/Cliente).
                Para ver os detalhes, basta clicar no card do rack desejado.
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h5>3. Dentro de um Rack (Página de Detalhes)</h5>
              <img src="./Dashboard_Rack.png" alt="Exemplo de Patch Panel" className="img-fluid rounded my-3" />
              <p>
                Esta é a tela principal do sistema. Aqui você pode:
              </p>
              <ul>
                <li><strong>Adicionar Patch Panels:</strong> Crie os painéis do seu rack (ex: `LG.01`, `PP.A`). O sistema criará automaticamente as portas (`1` a `24`, por padrão) como "Vagas".</li>
                <li><strong>Excluir Patch Panels:</strong> Cuidado! Isso exclui o painel E todas as portas associadas a ele.</li>
                <li><strong>Editar uma Porta:</strong> Basta clicar no botão "Editar" na linha da porta que deseja modificar (ex: mudar de "Vaga" para "PC-Recepção").</li>
                <img src="./Editar_Porta.png" alt="Exemplo de Patch Panel" className="img-fluid rounded my-3" />
                <li><strong>Filtrar Portas:</strong> Use as caixas de busca para encontrar rapidamente uma porta por localização ("Mesa Flávio") ou filtrar todas as portas de um tipo ("PC") [cite: user].</li>
                <li><strong>Salvar Observações:</strong> Use o campo de "Observações do Rack" para guardar IPs de switches, senhas do rack, ou qualquer nota geral.</li>
              </ul>
            </ListGroup.Item>

          </ListGroup>
        </Card.Body>
      </Card>

      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Card.Title as="h3" className="mb-3">🚀 A Mágica: Importação de Excel</Card.Title>
          <img src="./Tela_Import.png" alt="Exemplo de Patch Panel" className="img-fluid rounded my-3" />
          <Card.Text>
            O botão <strong>"Importar Dados"</strong> é sua ferramenta mais poderosa para migrar dados de planilhas antigas.
            Ele possui um modo "Detetive" que entende 3 tipos de arquivo Excel:
          </Card.Text>

          <Alert variant="success" className="mt-3">
            <strong>Modo 1: Arquivo Limpo (Ex: Relatório Urupema / Painel)</strong>
            <hr />
            Se o seu Excel tiver cabeçalhos como <code>Patch Panel / Porta</code>, <code>Uso</code>, e <code>Local</code>, o sistema fará uma importação estruturada, lendo coluna por coluna.
            <img src="./Ex_Limpo.png" alt="Exemplo de Patch Panel" className="img-fluid rounded my-3" />
          </Alert>

          <Alert variant="warning" className="mt-3">
            <strong>Modo 2: Arquivo Sujo (Ex: Relatório Vitta)</strong>
            <hr
            />
            Se o seu Excel não tiver cabeçalhos, o sistema ativa o "modo caça". Ele lê cada linha e procura por padrões de porta (ex: <code>LG.01.04</code>).
            <ul>
              <img src="./Ex_Sujo.png" alt="Exemplo de Patch Panel" className="img-fluid rounded my-3"/> 
              <li><strong>Se achar uma porta:</strong> Ele salva a porta e usa o resto da linha como "Localização", marcando o "Uso" como "Importado".</li>
              <li><strong>Se não achar uma porta:</strong> Ele salva a linha inteira nas "Observações do Rack" (ideal para IPs de switches, notas, etc.).</li>
            </ul>
          </Alert>
          <Card.Text>
            Em ambos os modos, se um Patch Panel (ex: "LG.01") não existir no rack, o sistema o **criará automaticamente** para você.
          </Card.Text>
        </Card.Body>
      </Card>

      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Card.Title as="h3" className="mb-3">Contas e Permissões</Card.Title>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>Dois Níveis de Acesso:</strong> O sistema possui Administradores e Técnicos.
              
              <ul>
                <li><strong>Administradores (Admin):</strong> Veem e gerenciam TODOS os racks de TODOS os usuários. Podem editar os papéis de outros usuários na tela "Gerenciar Usuários".</li>
                <img src="./Gerenciar_Users.png" alt="Exemplo de Patch Panel" className="img-fluid rounded my-3" />
                <li><strong>Técnicos (Usuário):</strong> Veem e gerenciam APENAS os racks que eles mesmos criaram.</li>
              </ul>
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Meu Perfil:</strong> Você pode alterar seu Nome e Email a qualquer momento na tela "Meu Perfil".
              <img src="./Meu_Perfil.png" alt="Exemplo de Patch Panel" className="img-fluid rounded my-3" />
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>

    </Container>
  );
};

export default HelpPage;