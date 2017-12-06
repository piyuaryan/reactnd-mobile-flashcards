import React, {Component} from "react";
import {connect} from "react-redux";
import {ActivityIndicator, Text, TouchableOpacity, View} from "react-native";
import {getDeck} from "../actions";
import {purple} from "../utils/colors";
import {styles} from "../utils/styles";
import {fetchDeck} from "../utils/api";

class DeckDetails extends Component {

    static navigationOptions = () => {
        return {
            title: 'Deck Details'
        }
    };

    state = {
        loading: false
    };

    componentDidMount() {
        this.loadDeck()
    }

    loadDeck = () => {
        this.setState({loading: true});
        const {dispatch} = this.props;
        fetchDeck(this.props.navigation.state.params.title)
            .then((deck) => {
                dispatch(getDeck(deck));
                this.setState({loading: false})
            })
    };

    deckView = (deck) => {
        return (
            <View style={styles.container}>
                <View style={styles.center}>
                    <Text style={styles.headerText}>{deck.title}</Text>
                    <Text style={styles.subHeaderText}>{deck.questions.length} cards</Text>
                </View>
                <View style={{flex: 2, justifyContent: 'flex-start'}}>
                    <TouchableOpacity
                        style={[styles.submitBtn, {marginBottom: 10}]}
                        onPress={() => {
                            this.props.navigation.navigate('AddCard', {title: deck.title, refresh: this.loadDeck})
                        }}>
                        <Text style={styles.submitBtnText}>Add Card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.submitBtnSecondary}
                        disabled={deck.questions.length === 0}
                        onPress={() => {
                            this.props.navigation.navigate('Quiz', {title: deck.title})
                        }}>
                        <Text style={styles.submitBtnTextSecondary}>Start Quiz</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    };

    render() {
        const {deck} = this.props;
        return (
            <View style={styles.container}>
                <ActivityIndicator animating={this.state.loading} color={purple}/>
                {this.deckView(deck)}
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        deck: state.deck
    }
}

export default connect(mapStateToProps)(DeckDetails)