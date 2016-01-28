# oAuth example with ReactNative and Hapi Server

For a great writeup about the Hapi server implementation see [http://www.sitepoint.com/oauth-integration-using-hapi/](http://www.sitepoint.com/oauth-integration-using-hapi/)

These instructions assume you've setup ReactNative locally. 

## Setup

### Client
```
cd client
npm install
```
#### Android

*  start emulator
*  if using genyMotion, read and follow directions of genymotion/README.md

```
react-native run-android
```

#### IOS
```
open .
select ios/oAuth.xcodeproj
within XCode -> Run
```


### Server

```
cd server
npm install
edit server.js and change GITHUB application clientID and clientSecret
npm start
```
