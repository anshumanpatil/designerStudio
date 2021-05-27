import { Subject, BehaviorSubject } from 'rxjs';
import Actions  from '../../objects/actions';

export default class StudioEventManager {
    constructor() {

        if (!StudioEventManager.instance) {
            StudioEventManager.instance = this;
        }

        this.events = new Subject();
        this.attachIncomingEvents();

        return StudioEventManager.instance;
    }

    attachIncomingEvents(){
        document.body.addEventListener(Actions.StudioEvent, (e) => {
            this.events.next(e.detail)
        })
        document.body.addEventListener(Actions.ResizeCard, (e) => {
            this.events.next(e.detail)
        })

    }

}