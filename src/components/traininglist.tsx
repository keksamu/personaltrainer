import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import type { Ttraining, TtrainingWithCustomer } from "../types";

export default function TrainingList() {
    const [trainings, setTrainings] = useState<TtrainingWithCustomer[]>([]);

    const columns: GridColDef[] = [
        { field: 'date', headerName: 'Date', width: 200 },
        { field: 'duration', headerName: 'Duration (min)', width: 150 },
        { field: 'activity', headerName: 'Activity', width: 200 },
        { field: 'customerName', headerName: 'Customer', width: 250 }
    ];

    const getTrainings = async () => {
        try {
            const response = await fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings');
            if (!response.ok) {
                throw new Error(`Failed to fetch trainings: ${response.statusText}`);
            }
            const data = await response.json();
            
            const trainingsWithCustomers = await Promise.all(
                data._embedded.trainings.map(async (training: Ttraining) => {
                    const customerResponse = await fetch(training._links.customer.href);
                    const customer = await customerResponse.json();
                    return {
                        ...training,
                        customerName: `${customer.firstname} ${customer.lastname}`
                    };
                })
            );
            
            setTrainings(trainingsWithCustomers);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => { getTrainings(); }, []);

    return (
        <div style={{ width: '100%', margin: '20px auto 0' }}>
            <div style={{ marginTop: '20px', height: '70vh', width: '100%' }}>
                <DataGrid
                    rows={trainings}
                    columns={columns}
                    getRowId={(row) => row._links.self.href}
                />
            </div>
        </div>
    );
}