import { UpdateKeyAtom } from "./functionalities/UpdateKey/UpdateKey.ts";
import { ListKeysAtom } from "./functionalities/ListKeys/ListKeys.ts";
import { DeleteKeyAtom } from "./functionalities/DeleteKey/DeleteKey.ts";
import { RetrieveKeyAtom } from "./functionalities/RetrieveKey/RetrieveKey.ts";
import { StoreKeyAtom } from "./functionalities/StoreKey/StoreKey.ts";
import { krnlEntityBase } from "krnlts";
import { z } from "zod";

export class KeyStore extends krnlEntityBase {
    constructor(owner: krnlEntityBase | null) {
        super("KeyStore", owner);
        this.addLocal(StoreKeyAtom);
        this.addLocal(RetrieveKeyAtom);
        this.addLocal(DeleteKeyAtom);
        this.addLocal(ListKeysAtom);
        this.addLocal(UpdateKeyAtom);
        // Scaffolding: addLocal(FuncAtom), addChild(ChildEntity)
    }
}
