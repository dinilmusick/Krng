import { FUNCTIONS as VaultLibFuncs } from "../../../../../libraries/VaultLibConcepts/VaultLibConcepts.js";
import { FUNCTIONS as CryptoLibFuncs } from "../../../../../libraries/CryptoLibConcepts/CryptoLibConcepts.js";

export const RetrieveHelper = (id) => {
    const record = VaultLibFuncs.getKeyRaw(id);
    if (!record) return null;
    return CryptoLibFuncs.decrypt(record.encrypted_value);
};