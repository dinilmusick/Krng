import { RetrieveHelper } from "../helper_functions/RetrieveKeyHFIndex.js";
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
    const val = RetrieveHelper(input.id);
    if (!val) return { status: "error", message: `Key not found for id: ${input.id}` };
    return { status: "success", value: val };
};