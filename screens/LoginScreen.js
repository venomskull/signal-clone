import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {Button, Image, Input} from 'react-native-elements';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = () => {

    }

    return (
        <View>
            <StatusBar style="light" />
            <Image 
                source={{
                    uri: 'https://logowik.com/content/uploads/images/signal-messenger-icon9117.jpg'
                }}
                style={{
                    height: 200,
                    width: 200
                }} 
            />
            <View style={styles.inputContainer}>
                <Input placeholder='Email' type='email' autoFocus 
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <Input placeholder='Password' type='password' secureTextEntry 
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
            </View>
            <Button containerStyle={styles.button} title='Login' onPress={signIn} />
            <Button containerStyle={styles.button} title='Register' type='outline' />
        </View>
        
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    inputContainer: {},
    button: {},
})
