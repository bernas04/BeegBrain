
import { Providence } from "./Providence";
import { RevisionCenter } from "./RevisionCenter";

export class Contract {

    id! : number;
    providence! : Providence;
    revisionCenter! : RevisionCenter;
    initialDate! : Date;
    endDate! : Date;

}