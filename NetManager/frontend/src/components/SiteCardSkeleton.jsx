import { Card, Placeholder } from 'react-bootstrap';

const SiteCardSkeleton = () => {
  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Placeholder as={Card.Title} animation="glow">
          <Placeholder xs={8} />
        </Placeholder>
        <Placeholder as={Card.Text} animation="glow">
          <Placeholder xs={10} /> <Placeholder xs={5} />
        </Placeholder>
      </Card.Body>
    </Card>
  );
};

export default SiteCardSkeleton;