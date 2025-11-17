import { Link, Outlet } from 'react-router';
import './App.css';
import { Container } from '@mui/material';

function App() {
  return (
    <>
      <Container>
        <Link to={"/"} style={{ marginRight: '20px' }}>Home</Link>
        <Link to={"/training"} style={{ marginRight: '20px' }}>Training</Link>
        <Link to={"/customer"}>Customer</Link>
      </Container>
      <Outlet />
    </>
  );
}

export default App;
