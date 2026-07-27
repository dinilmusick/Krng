import { RetrieveHelper } from "../helper_functions/RetrieveKeyHFIndex.js";
import { z } from "zod";

export const schema = {
    input: z.object({
        id: z.string().optional(),
        provider: z.string().optional()
    }),
    output: z.object({
        status: z.string(),
        value: z.string().optional(),
        key: z.string().optional()
    })
};

export const main = async (input: any) => {
    const keyId = input.id || input.provider;
    if (!keyId) return { status: "error", message: "id or provider required" };
    const val = RetrieveHelper(keyId);
    if (!val) return { status: "error", message: `Key not found for id: ${keyId}` };
    return { status: "success", value: val, key: val };
};