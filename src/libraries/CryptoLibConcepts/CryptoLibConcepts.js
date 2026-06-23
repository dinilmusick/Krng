import crypto from 'crypto';
import os from 'os';
export const DATA = {
    ALGORITHM: 'aes-256-gcm',
    KEY_LENGTH: 32,
    IV_LENGTH: 12
};
export const FUNCTIONS = {
    getMasterKey: () => {
        const cpus = os.cpus();
        const cpuModel = cpus && cpus.length > 0 ? cpus[0].model : 'generic-cpu';
        const hostname = os.hostname();
        const seed = `${cpuModel}:${hostname}`;
        return crypto.createHash('sha256').update(seed).digest();
    },
    encrypt: (text, key) => {
        const iv = crypto.randomBytes(DATA.IV_LENGTH);
        const cipher = crypto.createCipheriv(DATA.ALGORITHM, key || FUNCTIONS.getMasterKey(), iv);
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        const tag = cipher.getAuthTag().toString('hex');
        return `${iv.toString('hex')}:${encrypted}:${tag}`;
    },
    decrypt: (encryptedData, key) => {
        const parts = encryptedData.split(':');
        if (parts.length !== 3) {
            throw new Error('Invalid encrypted data format');
        }
        const iv = Buffer.from(parts[0], 'hex');
        const encrypted = parts[1];
        const tag = Buffer.from(parts[2], 'hex');
        const decipher = crypto.createDecipheriv(DATA.ALGORITHM, key || FUNCTIONS.getMasterKey(), iv);
        decipher.setAuthTag(tag);
        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }
};
