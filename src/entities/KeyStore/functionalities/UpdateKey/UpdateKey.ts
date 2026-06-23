import { main, schema } from "./main_function/logic.ts";
import { initialState } from "./state_data/state.ts";

export const UpdateKeyAtom = {
    id: "UpdateKey",
    initialState,
    api: main,
    schema,
    visibility: "public"
};
