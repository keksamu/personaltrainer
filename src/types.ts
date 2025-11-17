export type Tcustomer = {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  streetaddress: string;
  postcode: string;
  city: string;
};

export type Ttraining = {
  date: string;
  duration: number;
  activity: string;
  _links: {
    self: { href: string };
    customer: { href: string };
  };
};

export type TtrainingWithCustomer = Ttraining & {
  customerName: string;
};