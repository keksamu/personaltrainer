import { Link } from 'react-router';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

export default function NavigationBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          Personal Trainer
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/training">
            Training
          </Button>
          <Button color="inherit" component={Link} to="/customer">
            Customer
          </Button>
          <Button color="inherit" component={Link} to="/calendar">
            Calendar
          </Button>
          <Button color="inherit" component={Link} to="/statistics">
            Statistics
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}