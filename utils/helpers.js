/**
 * @description load all decks from storage
 * @param { object } dispatch
 */
import React from "react";
import {AsyncStorage} from "react-native";
import {Notifications, Permissions} from "expo";
import {fetchAllDecks, fetchDeck} from "./api";
import {getDeck, getDecks} from "../actions/index";

export const DECK_STORAGE_KEY = 'MobileFlashCards:decks';
const NOTIFICATION_KEY = 'MobileFlashCards:notifications';

export function clearLocalNotifications() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}

export function createNotification() {
    return {
        title: 'Take a quiz!',
        body: "👋 Don't forget to finish the quiz!",
        ios: {
            sound: true,
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true,
        }
    }
}

export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({status}) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync();
                            let tomorrow = new Date();
                            tomorrow.setDate(tomorrow.getDate() + 1);
                            tomorrow.setHours(19);
                            tomorrow.setMinutes(0);

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: tomorrow,
                                    repeat: 'day',
                                }
                            );

                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                        }
                    })
            }
        })
}


export function loadDecks(dispatch) {
    fetchAllDecks()
        .then((decks) => {
            dispatch(getDecks(decks))
        })

}

/**
 * @description take the deck title and load the chosen deck
 * @param { string } title
 * @param { object } dispatch
 */
export function loadDeck(title, dispatch) {
    fetchDeck(title)
        .then((deck) => {
            dispatch(getDeck(deck))
        })
}