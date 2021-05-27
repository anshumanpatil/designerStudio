import { Subject } from 'rxjs';

export default class StudioEventManager {
    constructor() {
        
        if (!StudioEventManager.instance) {
            StudioEventManager.instance = this;
        }
        
        this.events = new Subject();
        return StudioEventManager.instance;
    }
}
// export default new StudioEventManager();