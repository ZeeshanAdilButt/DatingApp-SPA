import { Photo } from './Photo';

export interface User {
    id: number;
    userName: string;
    knownAs: string;
    age: string;
    gender: string;
    created: string;
    lastActive: string;
    photoUrl: string;
    city: string;
    country: string;
    interests?: string;
    introduction?: string;
    lookingfor?: string;
    photos?: Photo[];
}
