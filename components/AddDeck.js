import React, {Component} from "react";
import {KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View} from "react-native";
import {styles} from "../utils/styles";
import {saveDeckTitle} from "../utils/api";

function SubmitBtn({onPress}) {
    return (
        <TouchableOpacity
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
            onPress={onPress}>
            <Text style={styles.submitBtnText}>Submit</Text>
        </TouchableOpacity>
    )
}

export default class AddDeck extends Component {
    state = {
        title: '',
        valid: true
    };

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <View style={[styles.center]}>
                    <Text
                        style={[styles.text, (!this.state.valid) ? styles.errorText : '']}>
                        Enter the name of new Deck
                    </Text>
                </View>
                <View>
                    <TextInput
                        ref="name"
                        style={[styles.input, (!this.state.valid) ? styles.errorInput : '']}
                        value={this.state.title}
                        onChangeText={(title) => this.setState({title})}
                        placeholder="Name"
                    />
                </View>
                <View style={{marginTop: 10}}>
                    <SubmitBtn onPress={this.newDeck}/>
                </View>
            </KeyboardAvoidingView>
        )
    }

    newDeck = () => {
        if (this.state.title) {
            saveDeckTitle(this.state.title);
            this.refs['name'].setNativeProps({text: ''});
            this.setState({valid: true, title: ''})
        } else {
            this.setState({valid: false})
        }
    }
}