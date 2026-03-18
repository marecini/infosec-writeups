
To exploit a PHP Object injection vulnerability either `wakeup()` or `sleep()` must be present in the application

*important note*
All classes involved in the attack should be declared before calling the `unserialize()` method (unless object autoloading is supported).
