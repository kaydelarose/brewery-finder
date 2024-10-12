// models/AdminModel.ts

export interface Brewer {
    id: number;
    name: string;
    experience: number;
}

export interface Brewery {
    id: number;
    name: string;
    location: string;
    established: number;
}
