import { Person } from "./Person";
import { Providence } from "./Providence";

export class Operator implements Person {
    id! : number;
    healthNumber!: string;
    name!: string;
    email!: string;
    address!: string;
    telephone!: string;
    birthday!: Date;
    gender!: string;
    operatorNumber! : string;
    providence! : Providence;
}