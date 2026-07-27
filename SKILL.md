---
name: krng-guide
description: Detailed user and AI agent usage guide for Krng (Key Ring Manager), covering persistent storage architecture, duplicate key value guard policies, subapp/Mer integrations, and endpoint RPC contracts.
---

# Krng (Key Ring Manager) Developer & AI Agent Guide

**Krng** is an atomic microservice secret/key vault manager built on the **KrnlTS** framework. It provides safe AES-256-GCM encryption for credentials, API tokens, and key-value pairings with persistent storage across application updates.

---

## 1. Storage Architecture & Update Persistence

### Machine-Scoped Storage (`~/.krng/vault.db`)
* **Default Database Path**: `~/.krng/vault.db` (User home directory).
* **Environment Override**: Set `KRNG_VAULT_PATH=/custom/path/vault.db` to isolate storage if needed.
* **Update & Subapp Safety**: Because database storage is detached from the local application working directory (`process.cwd()`), updating Krng codebase or embedding Krng as a subapp inside other ecosystems (e.g. Mer apps) will **NEVER** overwrite, lose, or reset previously stored credentials.
* **Auto-Migration**: On initial startup, if no database exists at `~/.krng/vault.db`, Krng automatically checks for a legacy `./vault.db` in `process.cwd()` and safely copies it over to the persistent path.

---

## 2. Duplicate Secret Value Prevention Policy

To eliminate redundant credentials and maintain a single source of truth across services:

* **Duplicate Value Guard**: The `StoreKey` endpoint automatically inspects incoming plaintext values against existing encrypted entries in the vault before saving.
* **Duplicate Block Rule**: If the secret value (e.g., `ghp_123456789`) is already stored under an existing key ID (e.g., `github:pat:main`), `StoreKey` will reject the request with:
  ```json
  {
    "status": "error",
    "message": "Value already stored under id 'github:pat:main'. Storing duplicate secret values is redundant and not allowed."
  }
  ```
* **Correct Action for Key Updates**: 
  - To modify an existing entry's value or metadata, use **`UpdateKey`**.
  - To store a distinct new credential under a new ID, use **`StoreKey`**.

---

## 3. Public Endpoint API Contracts

All RPC calls to Krng use standard KrnlTS JSON payload schemas.

### `StoreKey`
Stores a new encrypted key/secret entry into the vault (guarded against duplicates).

* **Input**:
  ```json
  {
    "id": "github:pat:main",       // Unique key identifier (or use "provider")
    "value": "ghp_xxxxxxxxxxxx",  // Secret string to encrypt & store (or use "key")
    "service": "GitHub",          // (Optional) Target service name
    "accountName": "user@domain", // (Optional) Account owner
    "description": "Main PAT",   // (Optional) Description
    "metadata": {}                // (Optional) Custom JSON object
  }
  ```
* **Output (Success)**:
  ```json
  { "status": "success", "id": "github:pat:main", "key": "ghp_xxxxxxxxxxxx", "value": "ghp_xxxxxxxxxxxx" }
  ```
* **Output (Duplicate Guard Failure)**:
  ```json
  { "status": "error", "message": "Value already stored under id '...'. Storing duplicate secret values is redundant and not allowed." }
  ```

---

### `RetrieveKey`
Retrieves and decrypts a key from the vault.

* **Input**: `{ "id": "github:pat:main" }`
* **Output**: `{ "status": "success", "value": "ghp_xxxxxxxxxxxx", "key": "ghp_xxxxxxxxxxxx" }`

---

### `UpdateKey`
Updates metadata or secret value for an existing key ID.

* **Input**:
  ```json
  {
    "id": "github:pat:main",
    "value": "ghp_newvalue123",
    "service": "GitHub",
    "description": "Updated PAT"
  }
  ```
* **Output**: `{ "status": "success", "id": "github:pat:main" }`

---

### `ListKeys`
Lists stored keys. Supports optional client-side decryption.

* **Input**: `{ "decrypt": false }`
* **Output**: `{ "status": "success", "keys": [ { "id": "github:pat:main" } ] }`

---

### `DeleteKey`
Removes a key entry from the vault.

* **Input**: `{ "id": "github:pat:main" }`
* **Output**: `{ "status": "success" }`

---

## 4. Integration Guidelines for Subapps & Mer Apps

When incorporating `Krng` as a child entity or subapp in a parent entity:

```typescript
import { Krng } from "krng";

// Standard initialization
const krngApp = new Krng(10091);
await krngApp.boot();
```

* **Default RPC Communication Port**: `10091`
* **Encryption Key Generation**: Derived automatically via host hardware identity (`AES-256-GCM`).
* **Environment Override**: Pass custom `KRNG_VAULT_PATH` when starting test suites or isolated sandboxes.
