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
} from 'react-native';
import {Permissions, WebBrowser} from 'expo';
import styles from '../assets/styles/main'

import { MonoText } from '../components/StyledText';

export default class StartScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', padding: 15 }}>
                <Text style={{ width: '100%', textAlign: 'center', fontSize: 10, marginBottom: 30 }}>You will be prompted to take two photos{"\n\n"}Your full body should be present on the screen</Text>
                <TouchableOpacity style={styles.button} onPress={() => this.switchToCamera()}>
                    <Text style={styles.buttonText}> Let's start </Text>
                </TouchableOpacity>
            </View>
        );
    }

    switchToCamera = () => {
        const { status } = Permissions.askAsync(Permissions.CAMERA);
        this.props.navigation.navigate('Camera', {
          cameraStatus: status,
        });
    }
}

