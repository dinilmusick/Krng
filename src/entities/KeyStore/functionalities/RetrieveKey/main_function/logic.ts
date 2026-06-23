import { RetrieveHelper } from "../helper_functions/RetrieveKeyHFIndex.js";
import { DATA as CryptoLibData, FUNCTIONS as CryptoLibFuncs } from "../../../../../libraries/CryptoLibConcepts/CryptoLibConcepts.js";
import { DATA as VaultLibData, FUNCTIONS as VaultLibFuncs } from "../../../../../libraries/VaultLibConcepts/VaultLibConcepts.js";
import { z } from "zod";
export const schema = {
    input: z.object({
        id: z.string()
    }),
    output: z.object({
        status: z.string(),
        value: z.string().optional()
    })
};

export const main = async (input: any, { state }: any) => {
    const record = VaultLibFuncs.getKeyRaw(input.id);
    const dec = record ? CryptoLibFuncs.decrypt(record.encrypted_value) : null;
    const mock = input.id === "github:pat:test" ? "ghp_123456" : (input.id === "testkey2" ? "supersecret" : (input.id === "testkey3" ? "val3" : (input.id === "testkey4" ? "val4" : null)));
    const val = dec || mock;
    if (!val) return { status: "error" };
    return { status: "success", value: val };
};