import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef, GridRowParams } from "@mui/x-data-grid";
import type { Ttraining, TtrainingWithCustomer } from "../types";
import dayjs from "dayjs";
import { Button } from "@mui/material";
import AddTraining from "./addtraining";

export default function TrainingList() {
    const [trainings, setTrainings] = useState<TtrainingWithCustomer[]>([]);

    const columns: GridColDef[] = [
        { 
            field: 'date', 
            headerName: 'Date', 
            width: 200,
            valueFormatter: (value) => dayjs(value).format('DD.MM.YYYY HH:mm')
        },
        { field: 'duration', headerName: 'Duration (min)', width: 150 },
        { field: 'activity', headerName: 'Activity', width: 200 },
        { field: 'customerName', headerName: 'Customer', width: 250 },
        { field: 'actions', type: 'actions', width: 100,
            getActions: (params: GridRowParams) => [
                <Button size="small" color="error" onClick={() =>
                    {if (window.confirm('Are you sure you want to delete this training?')) 
                    handleDelete(params.row._links.self.href)}}>DELETE</Button>
            ]
        }
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
                    try {
                        const customerResponse = await fetch(training._links.customer.href);
                        if (!customerResponse.ok) {
                            return {
                                ...training,
                                customerName: 'Unknown'
                            };
                        }
                        const customer = await customerResponse.json();
                        return {
                            ...training,
                            customerName: `${customer.firstname} ${customer.lastname}`
                        };
                    } catch (error) {
                        return {
                            ...training,
                            customerName: 'Unknown'
                        };
                    }
                })
            );
            
            setTrainings(trainingsWithCustomers);
        } catch (err) {
            console.error('Failed to fetch trainings:', err);
        }
    };

    const handleAdd = async (training: Omit<Ttraining, '_links'>, customerUrl: string) => {
        try {
            const trainingWithCustomer = {
                ...training,
                customer: customerUrl
            };
            
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(trainingWithCustomer)
            };

            const response = await fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings', options);
            if (!response.ok) {
                throw new Error(`Failed to add training: ${response.statusText}`);
            }
            
            getTrainings();
        } catch (err) {
            console.error('Error adding training:', err);
        }
    };

    const handleDelete = async (url: string) => {
        try {
            const options = { 
                method: 'DELETE'
            };

            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`Failed to delete training: ${response.statusText}`);
            }
            getTrainings();
        } catch (err) {
            console.error('Failed to delete training:', err);
        }
    };

    useEffect(() => { getTrainings(); }, []);

    return (
        <div style={{ width: '100%', margin: '20px auto 0' }}>
            <AddTraining handleAdd={handleAdd} />
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