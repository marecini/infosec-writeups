
  
Create SMBServer (via .venv)  
smbserver.py -smb2support -comment "something here" -debug logs /folder_name

connect to SMBServer  
smbclient \\\\IP\directory -U user -N no_pass