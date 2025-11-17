import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import type { Tcustomer } from "../types";

export default function CustomerList() {
    const [customers, setCustomers] = useState<Tcustomer[]>([]);

    useEffect(() => {
        getCustomers();
    }, []);

    const getCustomers = async () => {
        const response = await fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers');
        const data = await response.json();
        setCustomers(data._embedded.customers);
    };

    const columns: GridColDef[] = [
        { field: 'firstname', headerName: 'First Name', width: 150 },
        { field: 'lastname', headerName: 'Last Name', width: 150 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'phone', headerName: 'Phone', width: 150 },
        { field: 'streetaddress', headerName: 'Address', width: 200 },
        { field: 'postcode', headerName: 'Postcode', width: 100 },
        { field: 'city', headerName: 'City', width: 150 }
    ];

    return (
        <div style={{ height: 600, width: '100%' }}>
            <h2>Customers</h2>
            <DataGrid
                rows={customers}
                columns={columns}
                getRowId={(row) => row.email}
                pageSizeOptions={[5, 10, 25]}
            />
        </div>
    );
}