'use strict';

import React, {
  Platform,
  StyleSheet,
  View,
  WebView,
  Component} from
'react-native';

import _ from 'underscore';
import Cookie from 'cookie';
import CookieManager from 'react-native-cookies';
import URL from 'url-parse';

import LoggedIn from './LoggedIn';

const LOGIN_URL = "http://localhost:5000/login";

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
      url: LOGIN_URL
    };
  }
  /**
   * @returns Promise w/ true/false
   */
  async  _isAuthenticated() {
    return new Promise((resolve, reject) => {
      if (Platform.OS === 'ios') {
        return CookieManager.getAll((cookie) => {
          if (cookie && cookie.logged_in && cookie.logged_in.value ===
              'yes') {
            return resolve(true);
          }
          return resolve(false);         
        });
      } else { //android
        return CookieManager.get('https://github.com', (res) => {
          if (res) {
            let cookie  = Cookie.parse(res);
            if (cookie.logged_in === 'yes') {
              return resolve(true);
            }
          }
          return resolve(false);                             
        });
      }
      return reject();
    });
  }

  onNavigationStateChange (navState) {
    let self = this;
    if (!navState.loading) {
      const url = new URL(navState.url);
      if (url
          && url.hostname === 'localhost'
          && url.pathname === '/login') {
        self._isAuthenticated()
          .then((res) => {
            self.setState({
              loggedIn: res
            });
          })
          .catch(() => {
            self.setState({
              loggedIn: false
            });              
          });
      }
      //back to home page?
      if (url
          && url.hostname === 'localhost'
          && url.pathname === '/') {
        self.setState({
          loggedIn: false,
          url: LOGIN_URL
        });
      }
    }      
  }


  render () {

    if (this.state.loggedIn) {
      return (
          <LoggedIn/>
      );
    } else {
      return (
        <View style={[styles.container]}>
          <WebView
              ref={'webview'}
              style={styles.webView}
              url={this.state.url}
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
}
