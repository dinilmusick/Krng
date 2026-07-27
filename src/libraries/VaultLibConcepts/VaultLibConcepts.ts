import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import os from 'os';
import { FUNCTIONS as CryptoLibFuncs } from '../CryptoLibConcepts/CryptoLibConcepts.js';

/////////// DATA SECTION ///////////
export const DATA = {
    dbInstance: null as any
};

/////////// FUNCTIONS SECTION ///////////
export const FUNCTIONS = {
    getDbPath: () => {
        if (process.env.KRNG_VAULT_PATH) {
            return process.env.KRNG_VAULT_PATH;
        }
        return path.join(os.homedir(), '.krng', 'vault.db');
    },

    getDb: (dbPath?: string) => {
        if (DATA.dbInstance) return DATA.dbInstance;
        const targetPath = dbPath || FUNCTIONS.getDbPath();
        const dir = path.dirname(targetPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        // Auto-migration from legacy relative process.cwd()/vault.db if target does not exist
        const legacyPath = path.join(process.cwd(), 'vault.db');
        if (!fs.existsSync(targetPath) && fs.existsSync(legacyPath) && legacyPath !== targetPath) {
            try {
                fs.copyFileSync(legacyPath, targetPath);
                console.log(`[Krng VaultLib] Migrated legacy vault database from ${legacyPath} to ${targetPath}`);
            } catch (err) {
                console.error(`[Krng VaultLib] Failed to migrate legacy vault database:`, err);
            }
        }

        const db = new Database(targetPath);
        
        db.exec(`
            CREATE TABLE IF NOT EXISTS keys (
                id TEXT PRIMARY KEY,
                service TEXT,
                accountName TEXT,
                encrypted_value TEXT NOT NULL,
                description TEXT,
                metadata TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            );
        `);
        
        DATA.dbInstance = db;
        return db;
    },

    closeDb: () => {
        if (DATA.dbInstance) {
            DATA.dbInstance.close();
            DATA.dbInstance = null;
        }
    },

    findDuplicateValue: (plaintextValue: string): string | null => {
        const records = FUNCTIONS.listKeysRaw();
        for (const record of records) {
            if (!record.encrypted_value) continue;
            try {
                const decrypted = CryptoLibFuncs.decrypt(record.encrypted_value);
                if (decrypted === plaintextValue) {
                    return record.id;
                }
            } catch (e) {
                // If decryption fails due to key mismatch or corrupted record, skip
            }
        }
        return null;
    },

    storeKeyRaw: (id: string, service: string | null, accountName: string | null, encryptedValue: string, description: string | null, metadataStr: string) => {
        const db = FUNCTIONS.getDb();
        const stmt = db.prepare(`
            INSERT INTO keys (id, service, accountName, encrypted_value, description, metadata, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
            ON CONFLICT(id) DO UPDATE SET
                encrypted_value = excluded.encrypted_value,
                service = COALESCE(excluded.service, keys.service),
                accountName = COALESCE(excluded.accountName, keys.accountName),
                description = COALESCE(excluded.description, keys.description),
                metadata = COALESCE(excluded.metadata, keys.metadata),
                updated_at = CURRENT_TIMESTAMP
        `);
        return stmt.run(id, service, accountName, encryptedValue, description, metadataStr);
    },

    getKeyRaw: (id: string) => {
        const db = FUNCTIONS.getDb();
        const stmt = db.prepare(`SELECT * FROM keys WHERE id = ?`);
        return stmt.get(id);
    },

    deleteKeyRaw: (id: string) => {
        const db = FUNCTIONS.getDb();
        const stmt = db.prepare(`DELETE FROM keys WHERE id = ?`);
        return stmt.run(id);
    },

    listKeysRaw: () => {
        const db = FUNCTIONS.getDb();
        const stmt = db.prepare(`SELECT * FROM keys`);
        return stmt.all();
    },

    storeBatchKeys: (secrets: Record<string, string>, service: string) => {
        const db = FUNCTIONS.getDb();
        const insert = db.transaction((secMap: Record<string, string>) => {
            for (const key of Object.keys(secMap)) {
                const encrypted = CryptoLibFuncs.encrypt(secMap[key]);
                FUNCTIONS.storeKeyRaw(key, service, null, encrypted, `Synced from ${service}`, '{}');
            }
        });
        insert(secrets);
        return Object.keys(secrets).length;
    }
};
