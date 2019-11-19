import React from 'react'
import { StyleSheet, Platform, Image, Text, View, PermissionsAndroid, Alert } from 'react-native'
import firebase from 'react-native-firebase'
import MapView from "react-native-maps"
import Geolocation from 'react-native-geolocation-service'


async function requestGPSPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Acceso a ubicación precisa',
        message:
          'Ratatouille necesita acceso a tu ubicación',
        buttonNegative: 'Cancelar',
        buttonPositive: 'Aceptar',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the GPS');
    } else {
      console.log('GPS permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}

export default class Main extends React.Component {
  state = {
    currentUser: null,
    currentLocation: null
  }

  findCoordinates = () => {
   // if()
    Geolocation.getCurrentPosition(
      position => {
        const { currentLocation } = JSON.stringify(position);
        this.setState({ currentLocation });
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  componentDidMount() {
    requestGPSPermission()
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
    this.findCoordinates()
  }

  render() {
    const { currentUser } = this.state
    const { currentLocation } = this.state
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{ // initial region set to Bileto 4.691553, -74.091084
            latitude: 4.691553,
            longitude: -74.091084,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1
          }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    flex: 1,
  }
})
