import React from "react";
import {StyleSheet} from "react-native";
import * as colors from "./colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        padding: 10
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 18,
        fontWeight: "500",
        padding: 10
    },
    errorText: {
        color: colors.error
    },
    input: {
        height: 40,
        padding: 10,
        borderRadius: 5,
        backgroundColor: colors.white,
        borderColor: colors.gray,
        borderWidth: 1
    },
    errorInput: {
        borderColor: colors.error
    },
    headerText: {
        fontSize: 20,
        fontWeight: "600"
    },
    mutedText: {
        fontSize: 15,
        color: '#444'
    },
    largeHeaderText: {
        fontSize: 26,
        fontWeight: "600"
    },
    largeMutedText: {
        fontSize: 20,
        color: '#444'
    },

    listItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        backgroundColor: colors.white,
    },
    spacing: {
        margin: 10
    },
    iosSubmitBtn: {
        backgroundColor: colors.action,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
    },
    AndroidSubmitBtn: {
        backgroundColor: colors.action,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 2,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
    },
    AndroidBtn: {
        backgroundColor: colors.action,
        padding: 10,
        marginLeft: 30,
        marginRight: 30,
        height: 45,
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitBtnText: {
        color: colors.white,
        fontSize: 20,
        textAlign: 'center',
    },
});