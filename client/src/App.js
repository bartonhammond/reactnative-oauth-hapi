'use strict';

import React, {
  Platform,
  StyleSheet,
  Text,
  View,
  WebView,
  Component} from
'react-native';

import _ from 'underscore';
import Cookie from 'cookie';
import CookieManager from 'react-native-cookies';

import LoggedIn from './LoggedIn';

const LOGIN_URL = "http://localhost:5000/login";
const HOME_URL = "http://localhost:5000";

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  }
});

export default class ReactNativeLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      loadedCookie: false
    };
  }
  _checkIfAuthenticated() {
    console.log('App._checkIfAuthenticated');
   if (Platform.OS === 'ios') {
     CookieManager.getAll((cookie) => {
      console.log('App.cookies',cookie);
      let isAuthenticated;

      // If it differs, change `cookie.remember_me` to whatever the name for your persistent cookie is!!!
      if (cookie && cookie.logged_in && cookie.logged_in.value ===
          'yes') {
        isAuthenticated = true;
      }
      else {
        isAuthenticated = false;
      }

      this.setState({
        loggedIn: isAuthenticated,
        loadedCookie: true
      });
    });

   } else {
      console.log("_checkIfAuthenticated");
      //CookieManager.getCookieHeader('http://localhost', (res) => {
      CookieManager.get('https://github.com', (res) => {
        let loggedIn = false;
        if (res) {
          let cookie  = Cookie.parse(res);
          if (cookie.logged_in === 'yes') {
            loggedIn = true;
          }
        }
        console.log("android.getCookieHeader", res);
        this.setState({
          loggedIn: loggedIn,
          loadedCookie: true
        });        
      });
    }

  }
  componentWillMount () {
    this._checkIfAuthenticated();        
  }

  onNavigationStateChange (navState) {
    this._checkIfAuthenticated();        
    
    //this._checkIfAuthenticated();
    console.log('onNavigationStateChange.navState',navState);
    // If we get redirected back to the HOME_URL we know that we are logged in. If your backend does something different than this
    // change this line.
    if (navState.url == HOME_URL) {
      this.setState({
        loggedIn: true
      });
    }
  }

  render () {

    // If we have completed loading the cookie choose to show Login WebView or the LoggedIn component, else just show an empty View.
    if (this.state.loadedCookie) {
      if (this.state.loggedIn) {
        console.log('App.render.LoggedIn');
        return (
          <LoggedIn/>
        );
      }
      else {
        console.log('App.render.displayWebview');
        return (
          <View style={[styles.container]}>
            <WebView
                ref={'webview'}
                style={styles.webView}
                url={LOGIN_URL}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                onNavigationStateChange={this.onNavigationStateChange.bind(this)}
                onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
                startInLoadingState={true}
                scalesPageToFit={this.state.scalesPageToFit}
            />
          </View>
        );
      }
    }
    else {
      console.log('Dumy View');
      return (
          <View>
          <Text>
          Dummy view
          </Text>
          </View>
      );
    }
  }
}

