import React, {Component} from "react";
import {Alert, Animated, Easing, Text, TouchableOpacity, View} from "react-native";
import {connect} from "react-redux";
import {green, red} from "../utils/colors";
import {styles} from "../utils/styles";
import {clearLocalNotifications, loadDeck, setLocalNotification} from "../utils/helpers";

class Quiz extends Component {
    state = {
        showAnswer: false,
        correct: 0,
        index: 0,
        animate: new Animated.Value(0)
    };

    static navigationOptions = ({navigation}) => {
        const {title} = navigation.state.params;
        return {
            title: `${title} Quiz`
        }
    };

    componentDidMount() {
        loadDeck(this.props.navigation.state.params.title, this.props.dispatch)
    }

    nextQuestion = () => {
        const {questions} = this.props.deck;
        if (this.state.index < questions.length - 1) {
            this.setState({index: this.state.index + 1})
        }
        else {
            clearLocalNotifications()
                .then(setLocalNotification);

            Alert.alert(
                'Score: ' + Math.round((this.state.correct / questions.length) * 100) + '%',
                `You correctly answered ${this.state.correct} out of ${questions.length} questions.  Would you like to try again?`,
                [
                    {
                        text: 'Yes', onPress: () => {
                        this.setState({correct: 0, index: 0, showAnswer: false})
                    }
                    },
                    {
                        text: 'No',
                        onPress: () => {
                            this.props.navigation.goBack()
                        }
                    },
                ],
                {cancelable: false}
            )
        }
    };

    showQuizButtons = (questions) => {
        const {correct} = this.state;
        return (
            <View style={{flex: 1}}>
                <TouchableOpacity
                    style={[styles.submitBtn, {marginBottom: 10, backgroundColor: green}]}
                    onPress={() => {
                        this.setState(
                            {
                                correct: correct + 1
                            },
                            this.nextQuestion
                        )
                    }}>
                    <Text style={styles.submitBtnText}>Correct</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.submitBtn, {backgroundColor: red}]}
                    onPress={() => {
                        this.nextQuestion()
                    }}>
                    <Text style={styles.submitBtnText}>Incorrect</Text>
                </TouchableOpacity>
            </View>
        )
    };

    showAnswer = (questions) => {
        return (
            <View style={styles.center}>
                <Text style={styles.headerText}>{questions[this.state.index].answer}</Text>
                <View style={{padding: 20}}>
                    <TouchableOpacity
                        onPress={() => {
                            this.flipCard()
                        }}>
                        <Text style={{color: red, fontWeight: '600'}}>Show Question</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    };

    showQuestion = (questions) => {
        return (
            <View style={styles.center}>
                <Text style={styles.headerText}>{questions[this.state.index].question}</Text>
                <View style={{padding: 20}}>
                    <TouchableOpacity
                        onPress={() => {
                            this.flipCard()
                        }}>
                        <Text style={{color: red, fontWeight: '600'}}>Show Answer</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    };

    flipCard = () => {
        Animated.timing(
            this.state.animate,
            {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear
            }
        ).start(() => {
            this.setState({
                showAnswer: !this.state.showAnswer,
                animate: new Animated.Value(0)
            })
        })
    };

    render() {
        const {questions} = this.props.deck;

        const rotateY = this.state.animate.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: ['0deg', '180deg', '0deg']
        });

        return (
            <View style={styles.container}>
                <View>
                    <Text style={{fontSize: 15, fontWeight: 'bold'}}>{this.state.correct}/{questions.length}</Text>
                </View>
                <Animated.View style={{flex: 1, transform: [{rotateY}]}}>
                    {(this.state.showAnswer) ? this.showAnswer(questions) : this.showQuestion(questions)}
                </Animated.View>
                {this.showQuizButtons(questions)}
            </View>
        )
    }

}

function mapStateToProps(state) {
    return {
        deck: state.deck
    }
}

export default connect(mapStateToProps)(Quiz)