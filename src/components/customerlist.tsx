import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef, GridRowParams } from "@mui/x-data-grid";
import type { Tcustomer } from "../types";
import { Button } from "@mui/material";
import AddCustomer from "./addcustomer";
import EditCustomer from "./editcustomer";
import Papa from 'papaparse';

export default function CustomerList() {
    const [customers, setCustomers] = useState<Tcustomer[]>([]);

    const columns: GridColDef[] = [
        { field: 'firstname', headerName: 'First Name', width: 130 },
        { field: 'lastname', headerName: 'Last Name', width: 130 },
        { field: 'email', headerName: 'Email', width: 180 },
        { field: 'phone', headerName: 'Phone', width: 130 },
        { field: 'streetaddress', headerName: 'Address', width: 180 },
        { field: 'postcode', headerName: 'Postcode', width: 100 },
        { field: 'city', headerName: 'City', width: 120 },
        { field: 'actions', type: 'actions', headerName: 'Actions', width: 250,
            getActions: (params: GridRowParams) => [
                <EditCustomer customer={params.row} handleEdit={handleEdit} />,
                <Button size="small" color="error" onClick={() => { handleDelete(params.row._links.self.href)}}>DELETE</Button>,
                <Button size="small" color="primary" onClick={() => handleExport(params.row)}>EXPORT</Button>
            ]
        }
    ];

    const getCustomers = async () => {
        try {
            const response = await fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers');
            if (!response.ok) {
                throw new Error(`Failed to fetch customers: ${response.statusText}`);
            }
            const data = await response.json();
            setCustomers(data._embedded.customers);
        } catch (err) {
            console.log(err);
        }
    };

    const handleAdd = async (customer: Omit<Tcustomer, '_links'>) => {
        try {
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(customer)
            };

            const response = await fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers', options);
            if (!response.ok) {
                throw new Error(`Failed to add customer: ${response.statusText}`);
            }
            getCustomers();
        } catch (err) {
            console.log(err);
        }
    };

    const handleEdit = async (customer: Omit<Tcustomer, '_links'>, url: string) => {
        try {
            const options = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(customer)
            };

            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`Failed to edit customer: ${response.statusText}`);
            }
            getCustomers();
        } catch (err) {
            console.log(err);
        }
    };

    const handleDelete = async (url: string) => {
        try {
            const options = { 
                method: 'DELETE'
            };

            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`Failed to delete customer: ${response.statusText}`);
            }
            getCustomers();
        } catch (err) {
            console.log(err);
        }
    };

    const handleExport = (customer: Tcustomer) => {
        const customerData = {
            'First Name': customer.firstname,
            'Last Name': customer.lastname,
            'Email': customer.email,
            'Phone': customer.phone,
            'Street Address': customer.streetaddress,
            'Postcode': customer.postcode,
            'City': customer.city
        };

        const csv = Papa.unparse([customerData]);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        link.setAttribute('href', url);
        link.setAttribute('download', `${customer.firstname}_${customer.lastname}_customer_data.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    useEffect(() => { getCustomers(); }, []);

    return (
        <div style={{ width: '100%', margin: '20px auto 0' }}>
            <AddCustomer handleAdd={handleAdd} />
            <div style={{ marginTop: '20px', height: '70vh', width: '100%' }}>
                <DataGrid
                    rows={customers}
                    columns={columns}
                    getRowId={(row) => row._links.self.href}
                />
            </div>
        </div>
    );
}