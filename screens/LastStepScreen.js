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

export default class LastStepScreenScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    render() {
        return (
            <View>
                <Image
                    style={{position: 'absolute', width: 100, height: 100}}
                    source={{uri: this.props.navigation.getParam('uri', 'NO-ID')}}
                />
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

