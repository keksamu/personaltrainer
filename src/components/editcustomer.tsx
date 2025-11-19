import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import type { Tcustomer } from '../types';

type EditCustomerProps = {
  customer: Tcustomer;
  handleEdit: (customer: Omit<Tcustomer, '_links'>, url: string) => void;
};

export default function EditCustomer(props: EditCustomerProps) {
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
    props.handleEdit(customer, props.customer._links.self.href);
    handleClose();
  };

  return (
    <React.Fragment>
      <Button size="small" onClick={handleClickOpen}>
        EDIT
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Customer</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} id="edit-customer-form">
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
              defaultValue={props.customer.firstname}
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
              defaultValue={props.customer.lastname}
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
              defaultValue={props.customer.email}
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
              defaultValue={props.customer.phone}
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
              defaultValue={props.customer.streetaddress}
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
              defaultValue={props.customer.postcode}
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
              defaultValue={props.customer.city}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form="edit-customer-form">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}