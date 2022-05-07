import { Operator } from "./Operator";
import { Patient } from "./Patient";
import { Report } from "./Report";

export class EEG {

    id!: number;
    file!: File;
    status!: string;
    date!: Date;
    report!: Report;
    operator!: Operator;
    patient!: Patient;
    // adicionar o nivel de urgência, metadados já aqui para não ter de carregar o ficheiro para saber a data e isso tudo...

}
