A **Length Extension Attack** takes advantage of how certain hash functions process data. Specifically, it works on hash functions like , **SHA-1**, and , which are built using something called the **Merkle-Damgård construction**. These hash functions let an attacker take an existing hash and add extra data onto the message that the hash represents without even needing to know the original message or the secret key used to create it. This works because these hash functions process data in chunks or blocks, with each block's hash influencing the next block's processing. If an attacker knows the final hash, they can use it as the starting state to hash additional blocks of data, effectively extending the original message and predicting what the new hash would be.
### How Does It Work?

For a length extension attack to be possible, the attacker needs a few things: they must have the **hash** of the original message, they need to know the **length** of the original message (or be able to guess it), and they need to **understand how the padding rules work** for that specific hash function.

Hash functions process data in blocks, updating an internal state after each block is processed. When an attacker knows the final hash, this hash represents the internal state of the algorithm after all blocks of the original message have been processed. By using this internal state, an attacker can continue the hashing process, adding new blocks of data to create a predictable hash for the extended message, all without knowing the original message itself.

|**Normal Hashing**|**Length Extension Attack**|
|---|---|
|Message: "user=test"|Original Message: "user=test"|
|Padding is added to the message to make it the correct block size.|Padding is added to the message and the attacker appends new data, e.g., "&admin=true".|
|The hash is generated based on the original message and padding.|The attacker uses the original hash to generate a new hash for the extended message.|
|Result: Valid hash for the original message.|Result: Predictable hash for the modified message achieved without knowing the secret key.|

### Exercise

In the URL the signature is exposed 
![[vuln_url_signature.png]]


**Prerequisites**
1. sudo apt install libssl-dev -y

**Installation of the hash_extender tool**
1. Clone it
2. cd into directory
3. run `"make"` command to build it 


**Generating the Modified Digest**
`./hash_extender --data 1.png --signature 02d101c0ac898f9e69b7d6ec1f84a7f0d784e59bbbe057acb4cef2cf93621ba9 --append /../4.png --out-data-format=html








