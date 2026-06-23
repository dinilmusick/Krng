# KeyStore

## Description
KeyStore entity for storing encrypted keys and credentials

## API List
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
- [UpdateKey](./functionalities/UpdateKey/doc.md) (public)

- [ListKeys](./functionalities/ListKeys/doc.md) (public)

- [DeleteKey](./functionalities/DeleteKey/doc.md) (public)

- [RetrieveKey](./functionalities/RetrieveKey/doc.md) (public)

- [StoreKey](./functionalities/StoreKey/doc.md) (public)

