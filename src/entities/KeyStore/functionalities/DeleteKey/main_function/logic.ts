import { DATA as VaultLibData, FUNCTIONS as VaultLibFuncs } from "../../../../../libraries/VaultLibConcepts/VaultLibConcepts.js";
import { z } from "zod";

export const schema = {
    input: z.object({
        id: z.string().optional(),
        provider: z.string().optional()
    }),
    output: z.object({
        status: z.string()
    })
};

export const main = async (input: any) => {
    const keyId = input.id || input.provider;
    if (!keyId) return { status: "error", message: "id or provider required" };
    VaultLibFuncs.deleteKeyRaw(keyId);
    return { status: "success" };
};