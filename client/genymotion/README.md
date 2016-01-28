* see
[http://blog.emaillenin.com/2015/01/editing-etchosts-file-in-genymotion-emulator.html](http://blog.emaillenin.com/2015/01/editing-etchosts-file-in-genymotion-emulator.html)

```
./adb root

./adb remount

./adb push /tmp/hosts /system/etc/

./adb push /tmp/hosts /etc/
```




* after pushing the hosts file, just reload
```
react-native run-android
```

* for ios

```
open .
select ios/oAuth.xcodeproj
within XCode - Run
```

