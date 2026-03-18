
**Explanation of the 2 below numbers**
From FactorDB 
 p = 205237461320000835821812139013267110933 
 q = 214102333408513040694153189550512987959

These are the three public components of an **RSA encrypted message**:

---

**`n` — the modulus:**

- Product of two large prime numbers `p × q`
- Part of the **public key**
- Used in both encryption and decryption
- Its size (77 digits here) determines the security — the harder it is to factor, the more secure

---

**`e` — the public exponent:**

- Part of the **public key**
- Used to **encrypt** the message
- `65537` is the most commonly used value in RSA — it's a standard choice because it's efficient and secure
- Together with `n`, this forms the complete public key: `(n, e)`

---

**`c` — the ciphertext:**

- This is the **encrypted message**
- What you're trying to decrypt
- Created by: `c = plaintext^e mod n`

---

**To summarize the relationship:**

- **Public key** = `(n, e)` — shared openly
- **Private key** = `(n, d)` — kept secret
- **Encryption:** `c = plaintext^e mod n`
- **Decryption:** `plaintext = c^d mod n`

## Exposed Keys Challenge


` hashcat -a 0 -m 150 digest.txt /usr/share/wordlists/rockyou.txt 
Decrypted hash key :**sunshine**

Following lab 3

The exercise tells us to check the source code which reveals the hard-coded value used to encrypt the data sent in the **data** parameter which can be seen in the DevTools under *Request* 
![[Screenshot_20260318_192616.png]]
![[Screenshot_20260318_192818.png]]

Task at hand is to use the hard-coded key in the JS-code to brute-force the message which is sent in the **data** parameter. 

The wordlist used is also fetched from the task instructions. 

**Prerequisites**
1. Pycryptodome
2. Perhaps also a virtual environment

**Flag: THM{3nD_2_3nd_is_n0t_c0mpl1c4ted}**


## Bit Flipping Attacks

### What is Unauthenticated Encryption?

Unauthenticated encryption refers to encryption that **does not** include a mechanism to verify the **integrity** or **authenticity** of the ciphertext. This means that an attacker can modify encrypted data that is in transit, and the system will still accept and process it without detecting any tampering.

When the application decrypts tampered ciphertext without verifying its integrity, an attacker can manipulate the plaintext in predictable ways. This is the root cause of bit-flipping attacks.

A classic example is in CBC (Cipher Block Chaining) mode without an authentication tag. -CBC encrypts data securely but does not ensure integrity. If an attacker can modify the ciphertext, they can manipulate certain bits of the decrypted plaintext without breaking the encryption.

in CBC (Cipher Block Chaining) mode without an authentication tag.

-CBC encrypts data securely but does not ensure integrity. If an attacker can modify the ciphertext, they can manipulate certain bits of the decrypted plaintext without breaking the encryption.

This leads to **bit-flipping attacks**, where an attacker changes ciphertext in a way that results in controlled modifications in the plaintext.

## Bit Flipping Attacks

Bit flipping attacks target systems that use unauthenticated encryption, allowing an attacker to modify ciphertext so that the decrypted plaintext is manipulated in predictable ways. This type of attack is particularly dangerous when systems assume that encrypted data is inherently safe to trust without verifying its integrity.

Encryption schemes like

-CBC (Cipher Block Chaining) are vulnerable to bit flipping when no integrity check, such as a Message Authentication Code (MAC), is applied. In CBC mode:

1. The plaintext is XORed with the previous ciphertext block before encryption.
2. If an attacker alters bits in a ciphertext block, it changes the corresponding plaintext block during decryption.

For example, consider an encrypted payload:

```json
{"role":"0"}
```

If this ciphertext is tampered with, the role could be escalated to `"1"`. Without integrity protection, the system would accept the manipulated plaintext as legitimate.


### Exercise

![[vuln_role_value.png]]
Above a vulnerable `"role"` parameter is seen and it can be used in the attack

Saving the script from the THM instructions
```
import base64, sys
from binascii import unhexlify, hexlify

original_token = sys.argv[1] # Your encrypted role token goes here

try:
    cipher_bytes = bytearray(unhexlify(original_token))
except ValueError:
    print("Invalid token format! Make sure it's a valid hex string.")
    exit(1)

# AES block size
block_size = 16

# Debug: Print IV (first 16 bytes) before modification
print("\n[DEBUG] Original IV (First 16 Bytes):", hexlify(cipher_bytes[:block_size]).decode())

guest_offset = 0

xor_diff = [
    0x01,  # '0' -> '1'
]

# Apply bit flipping to the IV (first 16 bytes)
for i, diff in enumerate(xor_diff):
    print(f"[DEBUG] Modifying byte at offset {guest_offset + i}: {hex(cipher_bytes[guest_offset + i])} XOR {hex(diff)}")
    cipher_bytes[guest_offset + i] ^= diff

print("\n[DEBUG] Modified IV (First 16 Bytes):", hexlify(cipher_bytes[:block_size]).decode())

# Encode the modified token back to hex
modified_token = hexlify(cipher_bytes).decode()

print("\nModified Token:")
print(modified_token)
print("\nUse this token as the new 'role' cookie in your browser to log in as admin.")

```


Running the script with the newly created user `"Guest"` 's and inserting the value the modified token will be generated.

![[bit_filp_script_attack.png]]

**Flag is retrieved: ***THM{flip_n_flip}***
![[flag.png]]
