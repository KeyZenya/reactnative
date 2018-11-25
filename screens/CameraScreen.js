import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Button,
    Modal,
    TouchableHighlight,
} from 'react-native';
import { Camera, Permissions, Accelerometer, FileSystem } from 'expo';
import styles from '../assets/styles/main'
import {
    Ionicons,
    MaterialIcons,
    Foundation,
    MaterialCommunityIcons,
    Octicons
} from '@expo/vector-icons';

import { MonoText } from '../components/StyledText';

export default class CameraScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    state = {
        photos: 0,
        type: Camera.Constants.Type.back,
        permissionsGranted: false,
        accelerometerY: 100,
        currentPhoto: 'front',
        modalVisible: false,
    };

    async componentDidMount() {
        this.askCameraPermissions();
        this.initAccelerometer();
    }

    renderNoPermissions = () =>
        (
            <View style={styles.cameraNoPermissions}>
                <Text style={{ color: '#000', marginBottom: 30 }}>
                    Please allow app to use the camera
                </Text>
                <TouchableOpacity style={styles.button} onPress={() => this.askCameraPermissions()}>
                    <Text style={styles.buttonText}> Allow </Text>
                </TouchableOpacity>
            </View>
        );

    renderAccelerometer = () => {
        let disabledSnap = (!(this.state.accelerometerY < -98 && this.state.accelerometerY > -101));
        return (
            <View
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '10%',
                    backgroundColor: 'transparent',
                    top: '37.5%',
                    borderBottomWidth: 4,
                    borderBottomColor: !disabledSnap ? '#fff' : 'red',
                    opacity: '0.6'
                }}>
                {disabledSnap ? (
                    <Text style={{position: 'absolute', marginTop: 30, width: '100%', textAlign: 'center', fontSize: 9, color: 'red'}}>Please, hold your phone vertically!</Text>
                ) : null }
                <Text
                    style={{ fontSize: 12, marginTop: 26, color: !disabledSnap ? '#fff' : 'rgb(255, 0, 0)', width: '95%', textAlign: 'right' }}>
                    {this.state.accelerometerY + 100}°
                </Text>
            </View>
        )
    };

    renderTopBar = () => {
      return (
          <View
              style={{
                  position: 'absolute',
                  width: '100%',
                  height: '15%',
                  backgroundColor: 'transparent',
                  padding: 0.5,
              }}>
            <TouchableOpacity
              onPress={ () => { this.goBack() }}
              style={{
                  width: '10%',
                  height: '100%',
              }}>
              <Ionicons style={{ marginLeft: 5 }} name="ios-arrow-back" size={48} color="white"  />
            </TouchableOpacity>
          </View>
      )
    };

    renderBottomBar = () => {
        let disabledSnap = (!(this.state.accelerometerY < -98 && this.state.accelerometerY > -101));
        return (
            <View
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '20%',
                    top: '80%',
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                <TouchableOpacity disabled={disabledSnap}
                    style={{
                        width: 80,
                        height: 80,
                        borderColor: !disabledSnap ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 0, 0, 0.3)',
                        borderWidth: 7.5,
                        borderRadius: 50,
                    }}
                    onPress={() => {
                        this.snap();
                    }}>
                    <View
                        style={{
                            width: 65,
                            height: 65,
                            backgroundColor: !disabledSnap ? '#fff' : 'rgb(255, 0, 0)',
                            borderRadius: 50,
                        }}>
                    </View>
                </TouchableOpacity>
            </View>
        )
    };

    renderCamera = () => {
        return (
            <View style={{ flex: 1 }}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <View style={{marginTop: 22}}>
                        <View>
                            <Text>Hello World!</Text>

                            <TouchableHighlight
                                onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible);
                                }}>
                                <Text>Hide Modal</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>
                <Camera
                    style={{ flex: 1, width: '100%' }}
                    type={this.state.type}
                    ref={ (ref) => {this.camera = ref} }>
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: 'transparent',
                            flexDirection: 'row',
                            width: '100%'
                        }}>
                        {this.renderTopBar()}
                        {this.renderAccelerometer()}
                        {this.renderBottomBar()}
                        <TouchableHighlight
                            onPress={() => {
                                this.setModalVisible(true);
                            }}>
                            <Text>Show Modal</Text>
                        </TouchableHighlight>
                    </View>
                </Camera>
            </View>
        )
    };

    render() {
        let cameraScreenContent = this.state.permissionsGranted
            ? this.renderCamera()
            : this.renderNoPermissions();
        return <View style={styles.container}>{cameraScreenContent}</View>;
    }

    snap = async () => {
        if (this.camera) {
            this.camera.takePictureAsync({ onPictureSaved: this.onPictureSaved });
        }
    };

    onPictureSaved = async photo => {
       if( this.state.currentPhoto === 'front' ) {
           this.state.photoFront = photo.uri;
           this.props.navigation.navigate('LastStepScreen', {
               uri: photo.uri,
           })
       } else if(this.state.currentPhoto === 'side'){
           this.state.photoSide = photo.uri;
       }
    }

    askCameraPermissions = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ permissionsGranted: status === 'granted' });
    }

    initAccelerometer = () => {
        this.accelerometer = Accelerometer.addListener((result) => {
            let { x, y, z } = result;
            this.setState({accelerometerY: round(y)});
        });
        Accelerometer.setUpdateInterval(300);
    }

    stopAccelerometer = () => {
        this.accelerometer && this.accelerometer.remove();
        this.accelerometer = null;
    }

    goBack = () => {
        this.stopAccelerometer();
        this.props.navigation.goBack();
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }
}

function round(n) {
    if (!n) {
        return 0;
    }

    return Math.floor(n * 100);
}


