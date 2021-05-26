import { Subject } from 'rxjs';

class StudioEventManager {
    constructor() {
        
        if (!StudioEventManager.instance) {
            StudioEventManager.instance = this;
            // StudioEventManager.instance.events = new Subject();
        }
        
        return StudioEventManager.instance;
    }
}
export default new StudioEventManager();