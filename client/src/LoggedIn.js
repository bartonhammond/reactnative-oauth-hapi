'use strict';

import React, {Platform, StyleSheet, Text, View, Component} from 'react-native';
import Button from 'react-native-button';
import Cookie from 'cookie';
import CookieManager from 'react-native-cookies';
import ReactNativeLogin from './App';
import HttpRequest from './Http';

require('regenerator/runtime');

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  },
});


export default class LoggedIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true
    };
  }

  async logout () {
    console.log('logout');
    let loggedOut = await (new HttpRequest()).logout();
    if (loggedOut) {
      CookieManager.clearAll((err, res) => {
        console.log('logout.err',err);
        console.log('logout.res',res);            
        //CookieManager.getCookieHeader('http://localhost', (res) => {
        CookieManager.get('https://github.com', (res) => {
          console.log('logout.github.res',res);            
        });
      });
      this.setState({
        loggedIn: false,
        userName: ''
      });
    }
  }
  
  render () {
    if (Platform.OS === 'ios') {
      CookieManager.getAll((cookie) => {
        console.log('LoggedIn.cookies',cookie);
        if (cookie.dotcom_user && cookie.dotcom_user.value) {
          this.setState({
            userName: cookie.dotcom_user.value,
            token: cookie.user_session.value         
          });
        }
      });
    } else {
        CookieManager.get('http://localhost', (res) => {
        if (res) {
            console.log('LoggedIn.localhost.res',res);
        }
      });
      CookieManager.get('https://github.com', (res) => {
        if (res) {
          let cookie  = Cookie.parse(res);
          if (cookie.dotcom_user && cookie.user_session) {
            if (this.state.userName !== cookie.dotcom_user) {
              this.setState({
                userName: cookie.dotcom_user,
                token: cookie.user_session
              });
            }
          }
        }
      });
    }
    if (this.state.loggedIn) {
      return (
          <View style={styles.container}>
          <Text style={styles.welcome}>
          {this.state.userName}, You are authenticated!
        </Text>
          <Text style={styles.welcome}>
          Token: {this.state.token}
        </Text>
          
          <Button style={{color: 'black'}} onPress={this.logout.bind(this)}>Logout</Button>
          </View>
      ); 
    }
    else {
      return (
          <ReactNativeLogin/>
      );
    }
    
  }
}
