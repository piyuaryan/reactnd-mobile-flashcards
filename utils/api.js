import {AsyncStorage} from "react-native";
import {DECK_STORAGE_KEY} from "./helpers";

export function fetchAllDecks() {
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then((results) => {
            return JSON.parse(results)
        })
}

export function fetchDeck(title) {
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results);
            return data[title]
        })
}

export function saveDeckTitle(title) {
    return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({[title]: {title: title, questions: []}}))
}

export function addCardToDeck(title, question) {
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then((results) => {
            return new Promise((resolve, reject) => {
                const data = JSON.parse(results);
                if (data[title] !== undefined) {
                    data[title].questions.push(question);
                    AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
                }
                resolve(null);
            });
        })
}


