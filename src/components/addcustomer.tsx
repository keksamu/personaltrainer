import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import type { Tcustomer } from '../types';


type AddCustomerProps = {
  handleAdd: (customer: Omit<Tcustomer, '_links'>) => void;
};

export default function AddCustomer(props: AddCustomerProps) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const customerData = Object.fromEntries((formData as any).entries());
    const customer = { 
      firstname: customerData.firstname,
      lastname: customerData.lastname,
      email: customerData.email,
      phone: customerData.phone,
      streetaddress: customerData.streetaddress,
      postcode: customerData.postcode,
      city: customerData.city
    };
    props.handleAdd(customer);
    handleClose();
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Customer
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Customer</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} id="customer-form">
            <TextField
              autoFocus
              required
              margin="dense"
              id="firstname"
              name="firstname"
              label="First Name"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              id="lastname"
              name="lastname"
              label="Last Name"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              id="email"
              name="email"
              label="Email"
              type="email"
              fullWidth
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              id="phone"
              name="phone"
              label="Phone"
              type="tel"
              fullWidth
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              id="streetaddress"
              name="streetaddress"
              label="Street Address"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              id="postcode"
              name="postcode"
              label="Postcode"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              id="city"
              name="city"
              label="City"
              type="text"
              fullWidth
              variant="standard"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form="customer-form">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}