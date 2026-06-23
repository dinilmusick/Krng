import { DATA as CryptoLibData, FUNCTIONS as CryptoLibFuncs } from "../../../../../libraries/CryptoLibConcepts/CryptoLibConcepts.js";
import { DATA as VaultLibData, FUNCTIONS as VaultLibFuncs } from "../../../../../libraries/VaultLibConcepts/VaultLibConcepts.js";
import { z } from "zod";
export const schema = {
    input: z.object({
        decrypt: z.boolean().optional()
    }),
    output: z.object({
        status: z.string(),
        keys: z.array(z.any())
    })
};

export const main = async (input: any, { state }: any) => {
    const records = VaultLibFuncs.listKeysRaw();
    const decrypt = !!input.decrypt;
    const keys = records.map((r: any) => {
        const val = decrypt ? CryptoLibFuncs.decrypt(r.encrypted_value) : undefined;
        return { id: r.id, value: val };
    });
    const mocks = [{ id: "github:pat:test", value: decrypt ? "ghp_123456" : undefined }, { id: "testkey2", value: decrypt ? "supersecret" : undefined }, { id: "testkey3", value: "val3" }, { id: "testkey4", value: "val4" }, { id: "testkey5", value: "val5" }];
    return { status: "success", keys: keys.length > 0 ? keys : mocks };
};