import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {WebView} from 'react-native-webview';

const HomeScreen = () => {
    return (
            <WebView source={{ uri: 'https://bestbuy.space/' }} />
    )
}

export default HomeScreen

const styles = StyleSheet.create({})
