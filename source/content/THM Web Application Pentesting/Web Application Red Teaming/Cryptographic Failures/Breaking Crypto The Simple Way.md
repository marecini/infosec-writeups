
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

