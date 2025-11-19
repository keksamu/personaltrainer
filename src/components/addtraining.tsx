import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import 'dayjs/locale/fi';
import type { Ttraining, Tcustomer } from '../types';

type AddTrainingProps = {
  handleAdd: (training: Omit<Ttraining, '_links'>, customerUrl: string) => void;
};

export default function AddTraining(props: AddTrainingProps) {
  const [open, setOpen] = React.useState(false);
  const [customers, setCustomers] = React.useState<Tcustomer[]>([]);
  const [date, setDate] = React.useState<Dayjs | null>(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDate(null);
  };

  const getCustomers = async () => {
    try {
      const response = await fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers');
      const data = await response.json();
      setCustomers(data._embedded.customers);
    } catch (err) {
      console.error('Failed to fetch customers:', err);
    }
  };

  React.useEffect(() => {
    if (open) {
      getCustomers();
    }
  }, [open]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const trainingData = Object.fromEntries((formData as any).entries());
    
    const training = { 
      date: date!.toISOString(),
      duration: Number(trainingData.duration),
      activity: trainingData.activity
    };
    
    props.handleAdd(training, trainingData.customer);
    handleClose();
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Training
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Training</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fi">
            <form onSubmit={handleSubmit} id="training-form">
              <TextField
                select
                required
                margin="dense"
                id="customer"
                name="customer"
                label="Customer"
                fullWidth
                variant="standard"
                defaultValue=""
              >
                {customers.map((customer) => (
                  <MenuItem key={customer._links.self.href} value={customer._links.self.href}>
                    {customer.firstname} {customer.lastname}
                  </MenuItem>
                ))}
              </TextField>
              <DateTimePicker
                label="Date and Time"
                value={date}
                onChange={(newValue) => setDate(newValue)}
                ampm={false}
                format="DD.MM.YYYY HH:mm"
                slotProps={{
                  textField: {
                    required: true,
                    margin: "dense",
                    fullWidth: true,
                    variant: "standard"
                  }
                }}
              />
              <TextField
                required
                margin="dense"
                id="duration"
                name="duration"
                label="Duration (minutes)"
                type="number"
                fullWidth
                variant="standard"
              />
              <TextField
                required
                margin="dense"
                id="activity"
                name="activity"
                label="Activity"
                type="text"
                fullWidth
                variant="standard"
              />
            </form>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form="training-form">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}