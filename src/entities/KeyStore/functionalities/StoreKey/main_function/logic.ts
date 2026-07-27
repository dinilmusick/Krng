import { StoreHelper } from "../helper_functions/StoreKeyHFIndex.js";
import { FUNCTIONS as VaultLibFuncs } from "../../../../../libraries/VaultLibConcepts/VaultLibConcepts.js";
import { z } from "zod";

export const schema = {
    input: z.object({
        id: z.string().optional(),
        provider: z.string().optional(),
        service: z.string().optional(),
        accountName: z.string().optional(),
        value: z.string().optional(),
        key: z.string().optional(),
        description: z.string().optional(),
        metadata: z.record(z.any()).optional()
    }),
    output: z.object({
        status: z.string(),
        id: z.string().optional(),
        key: z.string().optional()
    })
};

export const main = async (input: any) => {
    const keyId = input.id || input.provider;
    const val = input.value || input.key;
    if (!keyId || !val) {
        return { status: "error", message: "Both id/provider and value/key are required." };
    }

    const existingId = VaultLibFuncs.findDuplicateValue(val);
    if (existingId && existingId !== keyId) {
        return {
            status: "error",
            message: `Value already stored under id '${existingId}'. Storing duplicate secret values is redundant and not allowed.`
        };
    }

    StoreHelper(keyId, input.service || null, input.accountName || null, val, input.description || null, input.metadata || {});
    return { status: "success", id: keyId, key: val, value: val };
};