import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef, GridRowParams } from "@mui/x-data-grid";
import type { Tcustomer } from "../types";
import { Button } from "@mui/material";
import AddCustomer from "./addcustomer";

export default function CustomerList() {
    const [customers, setCustomers] = useState<Tcustomer[]>([]);

    const columns: GridColDef[] = [
        { field: 'firstname', headerName: 'First Name', width: 150 },
        { field: 'lastname', headerName: 'Last Name', width: 150 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'phone', headerName: 'Phone', width: 150 },
        { field: 'streetaddress', headerName: 'Address', width: 200 },
        { field: 'postcode', headerName: 'Postcode', width: 100 },
        { field: 'city', headerName: 'City', width: 150 },
        { field: 'actions', type: 'actions', width: 150,
            getActions: (params: GridRowParams) => [
                <Button size="small" color="error" onClick={() => { handleDelete(params.row._links.self.href)}}>DELETE</Button>
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