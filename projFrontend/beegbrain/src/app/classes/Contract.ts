<<<<<<< HEAD

=======
<<<<<<< HEAD
=======
import { Timestamp } from "rxjs";
>>>>>>> 5f3293f14fb8f47ece118157eaaa49fda5a9964e
>>>>>>> 273355b86efd059c9d9a854a5fb3df0b4a9bce25
import { Providence } from "./Providence";
import { RevisionCenter } from "./RevisionCenter";

export class Contract {

    id! : number;
    providence! : Providence;
    revisionCenter! : RevisionCenter;
    initialDate! : Date;
    endDate! : Date;

}