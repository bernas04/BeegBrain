import { Timestamp } from "rxjs";
import { Operator } from "./Operator";
import { Patient } from "./Patient";
import { Report } from "./Report";

export class EEG {

    id!: number;
    status!: string;
    date!: Date;
    report!: Report;
    operator!: Operator;
    patient!: Patient;
    timestamp!: Timestamp<any>;
    priority!: number;
    duration!: number;

    // adicionar o nivel de urgência, metadados já aqui para não ter de carregar o ficheiro para saber a data e isso tudo...

}
