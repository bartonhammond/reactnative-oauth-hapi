# oAuth example with ReactNative and Hapi Server

For a great writeup about the Hapi server implementation see [http://www.sitepoint.com/oauth-integration-using-hapi/](http://www.sitepoint.com/oauth-integration-using-hapi/)

These instructions assume you've setup ReactNative locally. 


|Platform| Signin | Authorize | Logout
|--------|-----------|-------|---------|
|Android|![Signin](https://cloud.githubusercontent.com/assets/1282364/12727495/f2af0200-c8e2-11e5-8e15-b4a0289a4585.png)|![Auth](https://cloud.githubusercontent.com/assets/1282364/12727496/f2b0fc9a-c8e2-11e5-8413-6bb79c1a73b1.png)|![Logout](https://cloud.githubusercontent.com/assets/1282364/12727497/f2b240dc-c8e2-11e5-8f7c-5df6867d903a.png)|
|iOS|![Signin](https://cloud.githubusercontent.com/assets/1282364/12727710/bc723da0-c8e3-11e5-82ed-95f4c5e13193.png)|![Auth](https://cloud.githubusercontent.com/assets/1282364/12727712/bc779ef8-c8e3-11e5-9473-45a5b6a9f34f.png)|![Logout](https://cloud.githubusercontent.com/assets/1282364/12727711/bc764ee0-c8e3-11e5-869d-15833d50461d.png)|
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
The server is dependent on having a GitHub Application.  You will need to join the [Github Developer Program](https://developer.github.com/) and register an application [here](https://github.com/settings/developers)


```
cd server
npm install
cp config-example.js config.js
edit config.js for GitHub application info
npm start
```
