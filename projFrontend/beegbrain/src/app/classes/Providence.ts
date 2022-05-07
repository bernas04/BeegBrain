import { Institution } from "./Institution";

export class Providence implements Institution {
    id!: number;
    name!: string;
    email!: string;
    address!: string;
    telephone!: string;
}