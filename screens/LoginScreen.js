import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import {Button, Image, Input} from 'react-native-elements';
import { auth } from '../firebase';

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(authUser => {
            if (authUser) {
                navigation.replace('Home');
            }
        })
        return unsubscribe;
    }, []);

    const signIn = () => {
        auth.signInWithEmailAndPassword(email, password)
        .catch(error => alert(error.message));
    }

    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
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
                    onSubmitEditing={signIn}
                />
            </View>
            <Button containerStyle={styles.button} title='Login' 
                onPress={signIn} 
            />
            <Button containerStyle={styles.button} title='Register' type='outline' 
                onPress={() => navigation.navigate('Register')}
            />
            <View style={{height: 100}} />
        </KeyboardAvoidingView>
        
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'white',
    },
    inputContainer: {
        width: 300,
    },
    button: {
        width: 200,
        marginTop: 10,
    },
})
