import React from 'react'
import { YellowBox, StyleSheet, Platform, Button, Image, Text, View, PermissionsAndroid, Alert } from 'react-native'
import firebase from 'react-native-firebase'
import MapView, { Marker } from "react-native-maps"
import Geolocation from 'react-native-geolocation-service'
import { TextInput } from 'react-native-gesture-handler'
import Geocoder from 'react-native-geocoding'

Geocoder.init("AIzaSyC3jrn9LVES_rdqJzupqTve58bwMm_Nr5M")
YellowBox.ignoreWarnings(['Warning: Failed prop type'])

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
    Latitude: null,
    Longitude: null
  }

  findCoordinates() {
    Geolocation.getCurrentPosition(
      position => {
        const currentLatitude = position.coords.latitude;
        const currentLongitude = position.coords.longitude;
        //console.log("!!!!!" + "Latitude: " + currentLatitude + " Longitude: " + currentLongitude)
        this.setState({
          Latitude: currentLatitude,
          Longitude: currentLongitude
        });
        //console.log("?????" + "Latitude: " + this.state.Latitude + " Longitude: " + this.state.Longitude)
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 100000 }
    );
  }

  newRestaurant(){
    console.log("Si funcionó!")
  }

  componentDidMount() {
    requestGPSPermission()
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          onMapReady={this.findCoordinates()}
          style={styles.map}
          initialRegion={{ // initial region set to Bileto 4.609231, -74.087860
            latitude: this.state.Latitude,
            longitude: this.state.Longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005
          }}
          minZoomLevel={10}
          showsMyLocationButton={true}
          showsMyLocationButton={true}>
          <Marker id="user" coordinate={{
            latitude: this.state.Latitude,
            longitude: this.state.Longitude
          }} />
        </MapView>
        <View style={styles.bottomView}>
          <Text style={styles.text}>Busca un restaurante</Text>
          <TextInput id="txtRestaurant" onSubmitEditing={this.newRestaurant()} style={styles.textInput} placeholder="Ingresa un restaurante"></TextInput>
          <View style={styles.button}>
            <Button
              color="#18B6F0"
              title={"Crear reserva"} />
          </View>
        </View>
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
  },
  textInput: {
    backgroundColor: "rgba(24,182,240,0.8)",
    width: "90%",
    borderRadius: 20,
    marginBottom: 8
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingStart: 8,
    paddingLeft: 8,
    padding: 4
  },
  bottomView: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 64
  },
  button: {
    backgroundColor: "rgba(24,182,240,1.0)",
    width: '90%',
    borderRadius: 50
  }

})
