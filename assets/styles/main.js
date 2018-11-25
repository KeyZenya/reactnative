import { StyleSheet } from 'react-native'
import Colors from '../../constants/Colors'

export default StyleSheet.create({
    container: {
        flex: 1
    },
    welcome: {
        fontSize: 20
    },
    button: {
        backgroundColor: Colors.black,
        width: '60%',
        height: '10%',
        borderRadius: 30,
    },
    buttonText: {
        color: Colors.white,
        textAlign: 'center',
        height: '100%',
        lineHeight: 40,
        textTransform: "uppercase",
        fontWeight: "bold",
    },
    cameraNoPermissions: {
        flex: 1,
        alignItems:'center',
        justifyContent: 'center',
        padding: 10,
    },
});