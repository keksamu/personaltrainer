import { useEffect, useState } from 'react';
import { Calendar as BigCalendar, dayjsLocalizer, Views } from 'react-big-calendar';
import type { View } from 'react-big-calendar';
import dayjs from 'dayjs';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import type { Ttraining } from '../types';

const localizer = dayjsLocalizer(dayjs);

type CalendarEvent = {
    title: string;
    start: Date;
    end: Date;
    resource?: any;
};

export default function Calendar() {
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [view, setView] = useState<View>(Views.WEEK);
    const [date, setDate] = useState(new Date());

    const getTrainings = async () => {
        try {
            const response = await fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings');
            const data = await response.json();
            
            const calendarEvents = await Promise.all(
                data._embedded.trainings.map(async (training: Ttraining) => {
                    try {
                        const customerResponse = await fetch(training._links.customer.href);
                        const customer = await customerResponse.json();
                        
                        const startDate = new Date(training.date);
                        const endDate = new Date(startDate.getTime() + training.duration * 60000);
                        
                        return {
                            title: `${training.activity} / ${customer.firstname} ${customer.lastname}`,
                            start: startDate,
                            end: endDate,
                            resource: training
                        };
                    } catch (error) {
                        const startDate = new Date(training.date);
                        const endDate = new Date(startDate.getTime() + training.duration * 60000);
                        
                        return {
                            title: training.activity,
                            start: startDate,
                            end: endDate,
                            resource: training
                        };
                    }
                })
            );
            
            setEvents(calendarEvents);
        } catch (err) {
            console.error('Failed to fetch trainings:', err);
        }
    };

    useEffect(() => {
        getTrainings();
    }, []);

    return (
        <div style={{width: '1350px', height: '85vh' }}>
            <BigCalendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '100%' }}
                views={['month', 'week', 'day']}
                defaultView="week"
                view={view}
                onView={setView}
                date={date}
                onNavigate={(newDate) => setDate(newDate)}
            />
        </div>
    );
}