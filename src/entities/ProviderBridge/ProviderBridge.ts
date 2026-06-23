import { PushToInfisicalAtom } from "./functionalities/PushToInfisical/PushToInfisical.ts";
import { PushToDopplerAtom } from "./functionalities/PushToDoppler/PushToDoppler.ts";
import { SyncFromInfisicalAtom } from "./functionalities/SyncFromInfisical/SyncFromInfisical.ts";
import { SyncFromDopplerAtom } from "./functionalities/SyncFromDoppler/SyncFromDoppler.ts";
import { krnlEntityBase } from "krnlts";
import { z } from "zod";

export class ProviderBridge extends krnlEntityBase {
    constructor(owner: krnlEntityBase | null) {
        super("ProviderBridge", owner);
        this.addLocal(SyncFromDopplerAtom);
        this.addLocal(SyncFromInfisicalAtom);
        this.addLocal(PushToDopplerAtom);
        this.addLocal(PushToInfisicalAtom);
        // Scaffolding: addLocal(FuncAtom), addChild(ChildEntity)
    }
}
