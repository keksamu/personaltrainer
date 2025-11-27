import { Link, Outlet } from 'react-router';
import './App.css';
import { Container } from '@mui/material';

function App() {
  return (
    <>
      <Container>
        <Link to={"/"} style={{ marginRight: '20px' }}>Home</Link>
        <Link to={"/training"} style={{ marginRight: '20px' }}>Training</Link>
        <Link to={"/customer"} style={{ marginRight: '20px' }}>Customer</Link>
        <Link to={"/calendar"} style={{ marginRight: '20px' }}>Calendar</Link>
        <Link to={"/statistics"}>Statistics</Link>
      </Container>
      <Outlet />
    </>
  );
}

export default App;
