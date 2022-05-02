import { EEG } from "./EEG";
import { Person } from "./Person";

export class Event {
    
    id! : number;
    type! : string;
    timestamp! : Date;
    eeg! : EEG;
    person! : Person;

}