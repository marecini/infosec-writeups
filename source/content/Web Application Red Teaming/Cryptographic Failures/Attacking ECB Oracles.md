## Chosen Plain Text Attack

### Determining the Block Size

> Beware the explanations are using the example with "TryHackMe"

Before we can stage our attack, we need to determine the block size of the cipher. The easiest way to do this is to play around with the length of our username. We can start by setting our username to a single character and gradually increasing the username length until a full block is added to the ciphertext. We then note down this length and increase the length again until a new block is added. When this happens, we can take the last length minus the length when the first block was added to determine the block size. Let's say that after a username (`AAAAA`) with a length of 5, the first block was added, as shown below:

![Start of ECB with Username of 5 Characters](https://tryhackme-images.s3.amazonaws.com/user-uploads/5f9c7574e201fe31dad228fc/room-content/5f9c7574e201fe31dad228fc-1743421740033.png)  

Then again after a length of 21 another block was added, as shown below:

### Finding the Offset

When attacking ECB oracles, it is rare for your input to be exactly at the front of the first block. As shown in our example, the secret is prepended and appended. This means we must determine our offset to better understand which block of data we fully control. Taking a look at the image below, our username starts close to the end of the first block and then flows into the following blocks:

![ECB Showcase Username](https://tryhackme-images.s3.amazonaws.com/user-uploads/5f9c7574e201fe31dad228fc/room-content/5f9c7574e201fe31dad228fc-1743419639638.png)  

However, when we only have the ciphertext, we must determine this offset ourselves. To do this, we will start with a username filled with characters that we know, for example, "A". We will only ensure that our username fits neatly into two blocks, hence 32 bytes of "A". Gradually, we can add a new character, such as "B", to the front of our username and continue doing so until there are two blocks of ciphertext with the same value, as shown below:

![ECB Determining the OffSet by adding a new character to the username](https://tryhackme-images.s3.amazonaws.com/user-uploads/5f9c7574e201fe31dad228fc/room-content/5f9c7574e201fe31dad228fc-1743419639639.png)  

We continue adding "B"s until our "A"s are now in two full and unique cipher blocks. We can then count the amount of "B"s that had to be injected at the start, which indicates our offset as shown in the image below:

![ECb Calculating the offsect with two blocks of A](https://tryhackme-images.s3.amazonaws.com/user-uploads/6093e17fa004d20049b6933e/room-content/6093e17fa004d20049b6933e-1743186882947.png)

**Attacking the Oracle**

With the block size and offset determined, we are now ready to attack the oracle. Given our example, we know the following:

- The block size is 16 bytes
- Our offset is 4 bytes

Leveraging this information, our goal will be to take a block that we control and inject just enough chosen plaintext data that we know the last byte of the block is populated by unknown data that we are trying to crack. Let's first see what our current injection looks like, as shown below:

![ECB Chosen Plaintext Attack Initial Configuration](https://tryhackme-images.s3.amazonaws.com/user-uploads/6093e17fa004d20049b6933e/room-content/6093e17fa004d20049b6933e-1743186882882.png)

 However, we want one byte of the actual data in the block that we control. So, in our case, we can do the following calculation:

 `LengthToSend = BlockSize + Offset - OneByte = 16 + 4 - 1 = 19 bytes`

That means we start by sending a username of 4 "B"s and 15 "A"s (for easier visibility) and record the ciphertext of the block that we control, as shown in the image below:

![ECB Chosen Plaintext Attack with a Single Byte of Data](https://tryhackme-images.s3.amazonaws.com/user-uploads/6093e17fa004d20049b6933e/room-content/6093e17fa004d20049b6933e-1743186883063.png)

The ciphertext of this block now becomes our reference value. Given that the last byte is the only piece we don't know, our goal will now be to brute force the value. We know that a byte must be between 0x00 and 0xFF, totalling 255 possible combinations. Using this, we now send 20 bytes of username data to the oracle and brute force all possible combinations between 0x00 and 0xFF and observe the resulting ciphertext block. If the block matches our reference block, we know we have found our value!

This means that we have now cracked the first byte after our username. Since this byte is now known, we can repeat the process for the second byte after our username. We can continue this process until we have cracked the 16-byte block. But we don't have to stop here. Given that we now know the next 16 bytes, we can use that as the reference block to crack the next 16 bytes as well. While this might be a slow online brute force attack, gradually, we can recover all plaintext data that was appended after our username.



## Exercise 

Entering the username `"A"` the following cipher is generated `"**a85185985e098952714b1293e4f23fd0fa010fc0a3c4f1013cf1700b0a100b3b**"`
![[Screenshot_20260320_151730.png]]

By entering `"AAAAAAAAAAAAAAAAA"` the first new block is added and the cipher has made its first jump.

### Conclusion: 17 A's for the First Jump 

the first jump required 17 A's

### Second Jump

![[first_block_added.png]]

### Conclusion: 11 More A's for Second Jump

Second jump happens at 34 A's

After 2nd jump cipher looks like this ```
"6624bedb16e5dd2af022ac1e13c727b7  ← chunk 1
f84c5c7072c5250d83c2e1570de5ef05  ← chunk 2
10454e5ba60f0b12c74413f1e46e1af5  ← chunk 3
fa010fc0a3c4f1013cf1700b0a100b3b  ← chunk 4"```

### Finding the Offset 

Splitting the cipher into 4 chunks to visually see it more clearly

6624bedb16e5dd2af022ac1e13c727b7 > 32 chars = 16 bytes
f84c5c7072c5250d83c2e1570de5ef05 > **reference chunk**
10454e5ba60f0b12c74413f1e46e1af5
fa010fc0a3c4f1013cf1700b0a100b3b

**Now inserting `"B's"` in front of the username until 2 identical code blocks appear** 

**4 B**
```
339d6847bdef16b9853ebb1c3e5b1615  ← chunk 1
f84c5c7072c5250d83c2e1570de5ef05  ← chunk 2
ba4c22a00213d497bc63aa2baf27b5f9  ← chunk 3
869e7f2ed01c4b2e07bc091e9e72a49e  ← chunk 4
```


**26 B**
```cba22f0bea0f4ca19ea87d5b88ecab50  ← chunk 1
3a79f5161808b5b7731d95bc0fb608c2  ← chunk 2
f84c5c7072c5250d83c2e1570de5ef05  ← chunk 3
d3d6d5b0bb741c3243d9809dce41f813  ← chunk 4
83c370db5304f877846f58a9d6881e32  ← chunk 5
```

So the offset happens at 26 B's. 


### Attacking the Oracle



