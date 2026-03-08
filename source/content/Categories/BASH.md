
check filesystem type
**sudo blkid** 

check devices and their type/system
**lsblk -f**

To make permanent changes to PATH
**echo 'export PATH=$PATH:/usr/sbin' >> ~/.zshrc**
**source ~/.zshrc**


LUKS (linux unified key setup) guide to encrypt Drive

**unmount the drive**
sudo umount /dev/sda1

create encrypted container on the drive
**sudo cryptsetup luksFormat /dev/sda1**

Open device and give container a name
**sudo cryptsetup open /dev/sda1 encrypted_usb**

Format
**sudo mkfs.ext4 /dev/mapper/safestorage**

Make directory to mount to and mount the drive to the destination
**sudo mkdir /mnt/usb**
**sudo mount /dev/mapper/encrypted_usb /mnt/usb**

