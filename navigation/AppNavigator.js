import React from 'react';
import { createStackNavigator } from 'react-navigation';

import StartScreen from "../screens/StartScreen";
import CameraScreen from "../screens/CameraScreen";
import LastStepScreen from "../screens/LastStepScreen";

const AppNavigator = createStackNavigator({
    Start: StartScreen,
    Camera: CameraScreen,
    LastStepScreen: LastStepScreen,
});

export default AppNavigator;