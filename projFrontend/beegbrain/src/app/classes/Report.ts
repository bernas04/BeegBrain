import { Doctor } from "./Doctor";

export class Report {

    id!: number;
    content! : string;
    timestamp! : Date;
    doctor! : Doctor;

}