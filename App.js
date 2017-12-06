import React from "react";
import {Platform, StatusBar, View} from "react-native";
import {StackNavigator, TabNavigator} from "react-navigation";
import {Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import Decks from "./components/Decks";
import AddDeck from "./components/AddDeck";
import {primary, white} from "./utils/colors";
import {Constants} from "expo";

function AppStatusBar({backgroundColor, ...props}) {
    return (
        <View style={{backgroundColor, height: Constants.statusBarHeight}}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    )
}

const Tabs = TabNavigator({
    Decks: {
        screen: Decks,
        navigationOptions: {
            tabBarLabel: 'Decks',
            tabBarIcon: ({tintColor}) => <MaterialCommunityIcons name='cards' size={25} color={tintColor}/>
        }
    },
    AddDeck: {
        screen: AddDeck,
        navigationOptions: {
            tabBarLabel: 'Add New Deck',
            tabBarIcon: ({tintColor}) => <Ionicons name='ios-add' size={25} color={tintColor}/>
        }
    }
}, {
    navigationOptions: {
        header: null
    },
    animationEnabled: true,
    lazy: true,
    tabBarOptions: {
        activeTintColor: Platform.OS === 'ios' ? primary : white,
        style: {
            height: 50,
            backgroundColor: Platform.OS === 'ios' ? white : primary,
            shadowColor: 'rgba(0, 0, 0, 0.24)',
            shadowOffset: {
                width: 0,
                height: 3
            },
            shadowRadius: 6,
            shadowOpacity: 1
        }
    }
});

export default class App extends React.Component {
    render() {
        return (
            <View style={{flex: 1}}>
                <AppStatusBar backgroundColor={primary} barStyle="light-content"/>
                <Tabs  />
            </View>
        );
    }
}