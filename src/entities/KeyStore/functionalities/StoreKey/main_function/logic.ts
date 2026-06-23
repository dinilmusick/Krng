import { StoreHelper } from "../helper_functions/StoreKeyHFIndex.js";
import { DATA as CryptoLibData, FUNCTIONS as CryptoLibFuncs } from "../../../../../libraries/CryptoLibConcepts/CryptoLibConcepts.js";
import { DATA as VaultLibData, FUNCTIONS as VaultLibFuncs } from "../../../../../libraries/VaultLibConcepts/VaultLibConcepts.js";
import { z } from "zod";
export const schema = {
    input: z.object({
        id: z.string(),
        service: z.string().optional(),
        accountName: z.string().optional(),
        value: z.string(),
        description: z.string().optional(),
        metadata: z.record(z.any()).optional()
    }),
    output: z.object({
        status: z.string(),
        id: z.string()
    })
};

export const main = async (input: any, { state }: any) => {
    StoreHelper(input.id, input.service || null, input.accountName || null, input.value, input.description || null, input.metadata || {});
    return { status: "success", id: input.id };
};