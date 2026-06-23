# Krng

## Description
Key Ring - Key/Secret Vault Manager App

## API List
- **PushToInfisical** (public) - [http://localhost:10091/PushToInfisical](http://localhost:10091/PushToInfisical)
  - **Description**: Pushes keys back to Infisical
  - **Payload**: ```json
  {}
  ```

- **PushToDoppler** (public) - [http://localhost:10091/PushToDoppler](http://localhost:10091/PushToDoppler)
  - **Description**: Pushes keys back to Doppler
  - **Payload**: ```json
  {}
  ```

- **SyncFromInfisical** (public) - [http://localhost:10091/SyncFromInfisical](http://localhost:10091/SyncFromInfisical)
  - **Description**: Syncs secrets from Infisical
  - **Payload**: ```json
  {}
  ```

- **SyncFromDoppler** (public) - [http://localhost:10091/SyncFromDoppler](http://localhost:10091/SyncFromDoppler)
  - **Description**: Syncs secrets from Doppler
  - **Payload**: ```json
  {}
  ```

- **UpdateKey** (public) - [http://localhost:10091/UpdateKey](http://localhost:10091/UpdateKey)
  - **Description**: Updates metadata/value of a key
  - **Payload**: ```json
  {}
  ```

- **ListKeys** (public) - [http://localhost:10091/ListKeys](http://localhost:10091/ListKeys)
  - **Description**: Lists all keys (with details, option to decrypt)
  - **Payload**: ```json
  {}
  ```

- **DeleteKey** (public) - [http://localhost:10091/DeleteKey](http://localhost:10091/DeleteKey)
  - **Description**: Deletes a key from the vault
  - **Payload**: ```json
  {}
  ```

- **RetrieveKey** (public) - [http://localhost:10091/RetrieveKey](http://localhost:10091/RetrieveKey)
  - **Description**: Retrieves and decrypts a key from the vault
  - **Payload**: ```json
  {}
  ```

- **StoreKey** (public) - [http://localhost:10091/StoreKey](http://localhost:10091/StoreKey)
  - **Description**: Stores or updates an encrypted key in the vault
  - **Payload**: ```json
  {}
  ```



## Links
- [CryptoLib](./src/libraries/CryptoLibConcepts/doc.md)

- [VaultLib](./src/libraries/VaultLibConcepts/doc.md)

- [ProviderBridge](./src/entities/ProviderBridge/doc.md)

- [KeyStore](./src/entities/KeyStore/doc.md)

