# oAuth example with ReactNative and Hapi Server

For a great writeup about the Hapi server implementation see [http://www.sitepoint.com/oauth-integration-using-hapi/](http://www.sitepoint.com/oauth-integration-using-hapi/)

These instructions assume you've setup ReactNative locally. 

## Screen shot from Android GenyMotion emulator

<img src="https://cloud.githubusercontent.com/assets/1282364/12651900/34ce10d2-c5ae-11e5-84b9-0f07bb3625c3.png" width="200">


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
