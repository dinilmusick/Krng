import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
export const DATA = {
    dbInstance: null
};
export const FUNCTIONS = {
    getDb: (dbPath) => {
        if (DATA.dbInstance)
            return DATA.dbInstance;
        const targetPath = dbPath || path.join(process.cwd(), 'vault.db');
        const dir = path.dirname(targetPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
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
    storeKeyRaw: (id, service, accountName, encryptedValue, description, metadataStr) => {
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
    getKeyRaw: (id) => {
        const db = FUNCTIONS.getDb();
        const stmt = db.prepare(`SELECT * FROM keys WHERE id = ?`);
        return stmt.get(id);
    },
    deleteKeyRaw: (id) => {
        const db = FUNCTIONS.getDb();
        const stmt = db.prepare(`DELETE FROM keys WHERE id = ?`);
        return stmt.run(id);
    },
    listKeysRaw: () => {
        const db = FUNCTIONS.getDb();
        const stmt = db.prepare(`SELECT * FROM keys`);
        return stmt.all();
    },
    storeBatchKeys: (secrets, service) => {
        const db = FUNCTIONS.getDb();
        const { FUNCTIONS: crypto } = require('../CryptoLibConcepts/CryptoLibConcepts.js');
        const insert = db.transaction((secMap) => {
            for (const key of Object.keys(secMap)) {
                const encrypted = crypto.encrypt(secMap[key]);
                FUNCTIONS.storeKeyRaw(key, service, null, encrypted, `Synced from ${service}`, '{}');
            }
        });
        insert(secrets);
        return Object.keys(secrets).length;
    }
};
