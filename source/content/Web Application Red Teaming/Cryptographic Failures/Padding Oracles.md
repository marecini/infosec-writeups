## Introduction to The Vulnerability

Encryption is key to keeping data safe, but even strong encryption can fail if not implemented correctly. One example is the Padding Oracle attack, a vulnerability that takes advantage of how encrypted data is processed, mainly when padding is used.

Padding oracle attacks happen when an application reveals whether the padding in encrypted data is correct or not through detailed error messages or variations in response time. Attackers can exploit these slight clues to figure out the original data without the encryption key. This attack targets encryption methods like Cipher Block Chaining (CBC), which uses padding to handle data of different lengths. The padding oracle attack is named because the server acts as an "**oracle**" by providing feedback on whether the padding in the ciphertext is valid.

Most symmetric encryption algorithms, like

AES, require input to be a fixed size for each round of encryption. These are called block ciphers. If the plaintext message exceeds this fixed size, it is divided into smaller blocks of the required size. However, the last block may not have enough data to fill the required size, so padding is added to make it fit. Additionally, because encryption involves multiple blocks, a method is needed to link these blocks together. This is where different chaining methods, such as Cipher Block Chaining (CBC), come into play

Padding is a process used in cryptography to ensure that plaintext data fits the fixed block size required by block ciphers like

. If the plaintext is not a multiple of the block size (e.g., 16 bytes for ), extra bytes are added to fill the remaining space in the last block. These added bytes, known as **padding**, are removed during decryption to retrieve the original plaintext. Proper padding handling is crucial to avoid security vulnerabilities.

### Exercise

It is necessary to run the command with the URL wrapped in quotes as else the shell will interpret special characters instead of executing the URL.

```
padbuster 'http://padding.thm:5002/decrypt?ciphertext=313233343536373839303132333435362cb8770371460c5a2dc6b6a7e65289b8' 3132333435363738393  
03132333435362cb8770371460c5a2dc6b6a7e65289b8 16 -encoding 1
```

> The server tells us the HTTP code 400 is received. Enter "2" when the script asks


To retrieve the flag 
```
adbuster 'http://padding.thm:5002/decrypt?ciphertext=31323334353637383930313233343536bdcc4a2319946dc9b30203d89dba9fce' 3132333435363738393  
0313233343536bdcc4a2319946dc9b30203d89dba9fce 16 -encoding 1

```