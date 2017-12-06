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
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 18,
        fontWeight: "500",
        padding: 10
    },
    errorText: {
        color: colors.red
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
        borderColor: colors.red
    },
    headerText: {
        fontSize: 32,
        fontWeight: "600"
    },
    subHeaderText: {
        fontSize: 15,
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
    separator: {
        flex: 1,
        height: 1,
        backgroundColor: colors.purple
    },
    submitBtn: {
        backgroundColor: colors.white,
        borderColor: colors.black,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 2,
        marginLeft: 40,
        marginRight: 40
    },
    submitBtnSecondary: {
        backgroundColor: colors.black,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 2,
        marginLeft: 40,
        marginRight: 40
    },
    submitBtnText: {
        color: colors.black,
        fontSize: 20,
        textAlign: 'center',
    },
    submitBtnTextSecondary: {
        color: colors.white,
        fontSize: 20,
        textAlign: 'center',
    }
});