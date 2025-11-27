import { Outlet } from 'react-router';
import './App.css';
import NavigationBar from './components/navigationbar';
import { Box } from '@mui/material';

function App() {
  return (
    <>
      <NavigationBar />
      <Box sx={{ mt: 3 }}>
        <Outlet />
      </Box>
    </>
  );
}

export default App;
