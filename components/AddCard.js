import React, {Component} from "react";
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import {addCardToDeck} from "../utils/api";
import {styles} from "../utils/styles";

function SubmitBtn({onPress}) {
    return (
        <TouchableOpacity
            style={styles.submitBtn}
            onPress={onPress}>
            <Text style={styles.submitBtnText}>Submit</Text>
        </TouchableOpacity>
    )
}

class AddCard extends Component {
    state = {
        question: '',
        answer: '',
        valid: true
    };

    static navigationOptions = ({}) => {
        return {
            title: 'Add a new card'
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={{marginBottom: 10}}>
                    <TextInput
                        style={[styles.input, (!this.state.valid) ? styles.errorInput : '']}
                        ref="question"
                        onChangeText={(question) => this.setState({question})}
                        placeholder="Enter a question"/>
                </View>
                <View style={{marginBottom: 10}}>
                    <TextInput
                        style={[styles.input, (!this.state.valid) ? styles.errorInput : '']}
                        ref="answer"
                        onChangeText={(answer) => this.setState({answer})}
                        placeholder="Enter the answer"/>
                </View>
                <View style={{marginTop: 10}}>
                    <SubmitBtn onPress={this.addCard}/>
                </View>
            </View>
        )
    }

    addCard = () => {
        if (this.state.question && this.state.answer) {
            addCardToDeck(this.props.navigation.state.params.title, this.state)
                .then(() => {
                        this.props.navigation.goBack();
                        this.props.navigation.state.params.refresh()
                    }
                );
            this.refs['question'].setNativeProps({text: ''});
            this.refs['answer'].setNativeProps({text: ''});
        }
        else
            this.setState({valid: false})

    }
}

export default AddCard