export class StopEntity {
    arrival_date_time: string;
    base_arrival_date_time: string;
    links: {
        category: string;
        id: string;
        type: string;
    }[];
}

export class DepartureEntity {
    display_informations: {
        commercial_mode: string;
        direction: string;
    };
    route: {
        direction: {
            name: string;
        }
    };
    stop_date_time: StopEntity;
}

export default class ResponseEntity {
    context: {
        current_datetime: Date;
        timezone: string;
    };
    arrivals: DepartureEntity[];
}