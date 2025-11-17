import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import type { Tcustomer } from "../types";

export default function CustomerList() {
    const [customers, setCustomers] = useState<Tcustomer[]>([]);

    const columns: GridColDef[] = [
        { field: 'firstname', headerName: 'First Name', width: 150 },
        { field: 'lastname', headerName: 'Last Name', width: 150 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'phone', headerName: 'Phone', width: 150 },
        { field: 'streetaddress', headerName: 'Address', width: 200 },
        { field: 'postcode', headerName: 'Postcode', width: 100 },
        { field: 'city', headerName: 'City', width: 150 }
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

    useEffect(() => { getCustomers(); }, []);

    return (
        <div style={{ width: '100%', margin: '20px auto 0' }}>
            <div style={{ marginTop: '20px', height: '70vh', width: '100%' }}>
                <DataGrid
                    rows={customers}
                    columns={columns}
                    getRowId={(row) => row.email}
                />
            </div>
        </div>
    );
}