import { Link, Outlet } from 'react-router';
import './App.css';
import { Container } from '@mui/material';

function App() {
  return (
    <>
      <Container>
        <Link to={"/"}>Home</Link>
        <Link to={"/training"}>Training</Link>
        <Link to={"/customer"}>Customer</Link>
      </Container>
      <Outlet />
    </>
  );
}

export default App;
