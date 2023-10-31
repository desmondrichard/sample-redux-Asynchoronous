import Container from 'react-bootstrap/Container';
import './App.css';
import Navbar from './components/Navbar';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import AddTask from './components/AddTask';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TasksList from './components/TasksList';
import UpdateTask from './components/UpdateTask';

function App() {
  return (
    <div className="App">
      <Container>
        <Row className="justify-content-md-center">
          <Col md="8">
            <Navbar />
          </Col>
          <Col md="10" className="mb-3">
            <AddTask />
          </Col>
          <Col md="10">
            <TasksList />
          </Col>
        </Row>
        <UpdateTask />
      </Container>


    </div>
  );
}

export default App;
