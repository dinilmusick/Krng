export const DocumentationManager = {
    layers: {
        LAYER_1_ENTRY: ["PushToInfisical", "PushToDoppler", "SyncFromInfisical", "SyncFromDoppler", "UpdateKey", "ListKeys", "DeleteKey", "RetrieveKey", "StoreKey"], // To be populated by DeaTS
        // Add more layers as needed
    },
    endpoints: {
        "PushToInfisical": {
            "id": "PushToInfisical",
            "title": "PushToInfisical",
            "description": "Pushes keys back to Infisical",
            "payload": {},
            "example": {
                "input": {},
                "output": {
                    "status": "success"
                }
            }
        },
        "PushToDoppler": {
            "id": "PushToDoppler",
            "title": "PushToDoppler",
            "description": "Pushes keys back to Doppler",
            "payload": {},
            "example": {
                "input": {},
                "output": {
                    "status": "success"
                }
            }
        },
        "SyncFromInfisical": {
            "id": "SyncFromInfisical",
            "title": "SyncFromInfisical",
            "description": "Syncs secrets from Infisical",
            "payload": {},
            "example": {
                "input": {},
                "output": {
                    "status": "success"
                }
            }
        },
        "SyncFromDoppler": {
            "id": "SyncFromDoppler",
            "title": "SyncFromDoppler",
            "description": "Syncs secrets from Doppler",
            "payload": {},
            "example": {
                "input": {},
                "output": {
                    "status": "success"
                }
            }
        },
        "UpdateKey": {
            "id": "UpdateKey",
            "title": "UpdateKey",
            "description": "Updates metadata/value of a key",
            "payload": {},
            "example": {
                "input": {},
                "output": {
                    "status": "success"
                }
            }
        },
        "ListKeys": {
            "id": "ListKeys",
            "title": "ListKeys",
            "description": "Lists all keys (with details, option to decrypt)",
            "payload": {},
            "example": {
                "input": {},
                "output": {
                    "status": "success"
                }
            }
        },
        "DeleteKey": {
            "id": "DeleteKey",
            "title": "DeleteKey",
            "description": "Deletes a key from the vault",
            "payload": {},
            "example": {
                "input": {},
                "output": {
                    "status": "success"
                }
            }
        },
        "RetrieveKey": {
            "id": "RetrieveKey",
            "title": "RetrieveKey",
            "description": "Retrieves and decrypts a key from the vault",
            "payload": {},
            "example": {
                "input": {},
                "output": {
                    "status": "success"
                }
            }
        },
        "StoreKey": {
            "id": "StoreKey",
            "title": "StoreKey",
            "description": "Stores or updates an encrypted key in the vault",
            "payload": {},
            "example": {
                "input": {},
                "output": {
                    "status": "success"
                }
            }
        },
        // "fid": { id: "fid", title: "...", description: "...", payload: {}, example: {} }
    },
    nextSteps: {
        "PushToInfisical": ["LAYER_1_ENTRY"],
        "PushToDoppler": ["LAYER_1_ENTRY"],
        "SyncFromInfisical": ["LAYER_1_ENTRY"],
        "SyncFromDoppler": ["LAYER_1_ENTRY"],
        "UpdateKey": ["LAYER_1_ENTRY"],
        "ListKeys": ["LAYER_1_ENTRY"],
        "DeleteKey": ["LAYER_1_ENTRY"],
        "RetrieveKey": ["LAYER_1_ENTRY"],
        "StoreKey": ["LAYER_1_ENTRY"],
        // "fid": ["LAYER_X"]
    },
    getDocForEndpoint(fid: string) {
        return (this.endpoints as any)[fid] || null;
    },
    getDocsForLayer(layerId: string) {
        const atomIds = (this.layers as any)[layerId] || [];
        return atomIds.map((id: string) => (this.endpoints as any)[id]).filter(Boolean);
    },
    getNextStepsDoc(fid: string) {
        const nextLayerIds = (this.nextSteps as any)[fid] || [];
        let docs: any[] = [];
        for (const layerId of nextLayerIds) {
            docs = docs.concat(this.getDocsForLayer(layerId));
        }
        return docs;
    }
};
