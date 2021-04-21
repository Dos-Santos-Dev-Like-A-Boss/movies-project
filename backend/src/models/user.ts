import { Movie } from "./movie";

export class User {
    id: string;

    email: string;

    password: string;

    name: string;
    
    likes: Movie[];
}