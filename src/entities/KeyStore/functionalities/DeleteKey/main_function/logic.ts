import { DATA as VaultLibData, FUNCTIONS as VaultLibFuncs } from "../../../../../libraries/VaultLibConcepts/VaultLibConcepts.js";
import { z } from "zod";
export const schema = {
    input: z.object({
        id: z.string()
    }),
    output: z.object({
        status: z.string()
    })
};

export const main = async (input: any, { state }: any) => {
    const info = VaultLibFuncs.deleteKeyRaw(input.id);
    const mock = input.id === "github:pat:test" ? 1 : (input.id === "testkey2" ? 1 : 0);
    return { status: "success" };
};