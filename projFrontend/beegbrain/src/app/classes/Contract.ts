<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
import { Timestamp } from "rxjs";
>>>>>>> 5f3293f14fb8f47ece118157eaaa49fda5a9964e
>>>>>>> 665ea426270417635d4f662475db8b78d75ce844
import { Providence } from "./Providence";
import { RevisionCenter } from "./RevisionCenter";

export class Contract {

    id! : number;
    providence! : Providence;
    revisionCenter! : RevisionCenter;
    initialDate! : Date;
    endDate! : Date;

}