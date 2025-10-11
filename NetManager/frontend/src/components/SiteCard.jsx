import { Card, Dropdown } from 'react-bootstrap';

const SiteCard = ({ site, onClick, onEdit, onDelete }) => {
  const handleActionClick = (e) => {
    e.stopPropagation();
  };

  return (
    <Card className="h-100 shadow-sm hover-shadow" style={{ cursor: 'pointer' }} onClick={onClick}>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <Card.Title className="mb-1">{site.nome}</Card.Title>
            <Card.Text className="text-muted small">{site.endereco || "Endereço não informado"}</Card.Text>
          </div>
          <Dropdown onClick={handleActionClick}>
            <Dropdown.Toggle variant="light" size="sm" id="dropdown-basic" />
            <Dropdown.Menu>
              <Dropdown.Item onClick={onEdit}>Editar</Dropdown.Item>
              <Dropdown.Item onClick={onDelete} className="text-danger">Excluir</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Card.Body>
    </Card>
  );
};

export default SiteCard;