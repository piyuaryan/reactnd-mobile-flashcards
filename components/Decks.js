import React, {Component} from "react";
import {connect} from "react-redux";
import {Animated, Easing, FlatList, Text, TouchableHighlight, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {action, primary, white} from "../utils/colors";
import {styles} from "../utils/styles";
import {loadDecks} from "../utils/helpers";
class Decks extends Component {

    state = {
        refreshing: false
    };

    componentDidMount() {
        loadDecks(this.props.dispatch);
    }

    deckItem = ({item}) => {
        let size = new Animated.Value(0);
        const textSize = size.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [20, 25, 20]
        });

        return (
            <TouchableHighlight
                onPress={() => {
                    Animated.timing(
                        size,
                        {
                            toValue: 1,
                            duration: 500,
                            easing: Easing.linear,
                        })
                        .start(() => {
                            this.props.navigation.navigate('Deck', {title: item.title});
                            size.setValue(0)
                        })
                }}>
                <View style={styles.listItem}>
                    <View style={{flex: 2, alignItems: 'center'}}>
                        <Animated.Text style={[styles.headerText, {fontSize: textSize}]}>{item.title}</Animated.Text>
                        <Text style={styles.subHeaderText}>{item.questions.length} cards</Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
    };

    separator = () => {
        return (
            <View style={styles.separator}/>
        )
    };

    keyExtractor = (item, index) => {
        return index
    };

    pullToRefresh = () => {
        return (
            <View style={[styles.center, {padding: 10}]}>
                <Text style={styles.subHeaderText}>!!! Pull to Refresh the List !!!</Text>
            </View>
        )
    };

    handleRefresh = () => {
        this.setState({
                refreshing: true
            },
            () => {
                loadDecks(this.props.dispatch);
                this.setState({refreshing: false})
            })
    };

    render() {
        const {decks} = this.props;
        return (
            <View style={{flex: 1, backgroundColor: white}}>
                {((decks !== null || decks !== undefined) && decks.length > 0)
                    ? <FlatList
                        data={decks}
                        style={{flex: 1}}
                        renderItem={this.deckItem}
                        ItemSeparatorComponent={this.separator}
                        keyExtractor={this.keyExtractor}
                        extraData={this.props}
                        ListHeaderComponent={this.pullToRefresh}
                        refreshing={this.state.refreshing}
                        onRefresh={this.handleRefresh}
                    />
                    : <View style={[styles.center, {padding: 10}]}>
                        <Text style={styles.headerText}>No Decks Found</Text>
                        <Text style={styles.subHeaderText}>Please select the "Add New Deck" tab to continue.</Text>
                    </View>}
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        decks: state.decks
    }
}

export default connect(mapStateToProps)(Decks)