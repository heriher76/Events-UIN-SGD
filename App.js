/**
 * Build with love and coffee
 * regards, Heri Hermawan - Informatics Engineering 2018
 *
 * @format
 * @flow
 */

import React from 'react';
import { Image, Dimensions, BackHandler } from 'react-native';
import { WebView } from 'react-native-webview';

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        timePassed: false,
        canGoBack: false
    }
  }

  componentDidMount() {
    setTimeout( () => {
        this.setTimePassed()
    }, 3000)

    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  setTimePassed() {
    this.setState({timePassed: true})
  }

  handleBackPress = () => {
    if (this.state.canGoBack) {
        this.refWeb.goBack();
    } else {
      this.props.navigation.goBack(null)
    }
    return true;
  }

  onNavigationStateChange(navState) {
    this.setState({
      canGoBack: navState.canGoBack
    });
  }

  render() {
    if (!this.state.timePassed) {
      return (
        <Image source={ require('./splash.png') } style={{ height: height, width: width }} />
      );
    } else {
      return (
        <WebView
          ref={(myWeb) => this.refWeb = myWeb}
          onNavigationStateChange={this.onNavigationStateChange.bind(this)}
          source={{uri: 'https://event.uinsgd.ac.id', isStatic: true}}
          style={{opacity: 0.99}}
          startInLoadingState={true}
        />
      );
    }
  }
}
