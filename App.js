import React from "react";
import {Platform, StatusBar, View} from "react-native";
import {StackNavigator, TabNavigator} from "react-navigation";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {decks} from "./reducers";
import {Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import Decks from "./components/Decks";
import AddDeck from "./components/AddDeck";
import {purple, white} from "./utils/colors";
import {Constants} from "expo";
import DeckDetails from "./components/DeckDetails";
import AddCard from "./components/AddCard";
import Quiz from "./components/Quiz";
import {setLocalNotification} from "./utils/helpers";

function MobileFlashCardsStatusBar({backgroundColor, ...props}) {
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
        activeTintColor: Platform.OS === 'ios' ? purple : white,
        style: {
            height: 50,
            backgroundColor: Platform.OS === 'ios' ? white : purple,
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


const MainNav = StackNavigator({
        Home: {
            screen: Tabs
        },
        Deck: {
            screen: DeckDetails,
            title: 'Deck Details'
        },
        AddCard: {
            screen: AddCard
        },
        Quiz: {
            screen: Quiz
        }
    },
    {
        navigationOptions: {
            headerStyle: {
                backgroundColor: purple,
            },
            headerTitleStyle: {
                color: white
            },
            headerTintColor: white,
        }
    });


export default class App extends React.Component {
    componentDidMount() {
        setLocalNotification()
    }

    render() {
        return (
            <Provider store={createStore(decks)}>
                <View style={{flex: 1}}>
                    <MobileFlashCardsStatusBar backgroundColor={purple} barStyle="light-content"/>
                    <MainNav  />
                </View>
            </Provider>
        );
    }
}