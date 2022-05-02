import { Institution } from "./Institution";

export class RevisionCenter implements Institution {
    id!: number;
    name!: string;
    email!: string;
    address!: string;
    telephone!: string;
}