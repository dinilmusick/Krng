import { FUNCTIONS as VaultLibFuncs } from "../../../../../libraries/VaultLibConcepts/VaultLibConcepts.js";
import { FUNCTIONS as CryptoLibFuncs } from "../../../../../libraries/CryptoLibConcepts/CryptoLibConcepts.js";

export const StoreHelper = (id, service, accountName, value, description, metadata) => {
    const encrypted = CryptoLibFuncs.encrypt(value);
    const metadataStr = typeof metadata === 'string' ? metadata : JSON.stringify(metadata || {});
    return VaultLibFuncs.storeKeyRaw(id, service, accountName, encrypted, description, metadataStr);
};