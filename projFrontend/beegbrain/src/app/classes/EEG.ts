import { Timestamp } from "rxjs";
import { Operator } from "./Operator";
import { Patient } from "./Patient";
import { Report } from "./Report";

export class EEG {

    id!: number;
    status!: string;
    timestamp!: Date;
    report!: Report;
    operator!: Operator;
    patient!: number;       // antes estava Patient, mas recebe um number no backend
    priority!: string;
    // adicionar o nivel de urgência, metadados já aqui para não ter de carregar o ficheiro para saber a data e isso tudo...

}
