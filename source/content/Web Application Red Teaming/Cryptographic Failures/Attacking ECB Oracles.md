## Chosen Plain Text Attack

### Determining the Block Size

> Beware the explanations are using the example with "TryHackMe"

Before we can stage our attack, we need to determine the block size of the cipher. The easiest way to do this is to play around with the length of our username. We can start by setting our username to a single character and gradually increasing the username length until a full block is added to the ciphertext. We then note down this length and increase the length again until a new block is added. When this happens, we can take the last length minus the length when the first block was added to determine the block size. Let's say that after a username (`AAAAA`) with a length of 5, the first block was added, as shown below:

![Start of ECB with Username of 5 Characters](https://tryhackme-images.s3.amazonaws.com/user-uploads/5f9c7574e201fe31dad228fc/room-content/5f9c7574e201fe31dad228fc-1743421740033.png)  

Then again after a length of 21 another block was added, as shown below:

## Exercise 

Entering the username `"A"` the following cipher is generated `"**a85185985e098952714b1293e4f23fd0fa010fc0a3c4f1013cf1700b0a100b3b**"`
![[Screenshot_20260320_151730.png]]

By entering `"AAAAAAAAAAAAAAAAA"` the first new block is added and the cipher has made its first jump.

### Conclusion 

the first jump required 17 A's

### Second Jump

![[first_block_added.png]]

### Conclusion 

Second jump happens at 34 A's

After 2nd jump cipher looks like this `"**6624bedb16e5dd2af022ac1e13c727b7f84c5c7072c5250d83c2e1570de5ef0510454e5ba60f0b12c74413f1e46e1af5fa010fc0a3c4f1013cf1700b0a100b3b**"`

### Finding the Offset 











