
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


const CustomCard = () => {
  return (
<div className='card'>
    <Card style={{ width: '18rem' }} className="custom-card">
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
</div>
  );
}

export default CustomCard;

