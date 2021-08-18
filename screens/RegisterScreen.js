import { StatusBar } from 'expo-status-bar'
import React, {useState, useLayoutEffect} from 'react'
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native'
// import { Button } from 'react-native-elements/dist/buttons/Button'
// import { Input } from 'react-native-elements/dist/input/Input'
import {Button, Image, Input, Text} from 'react-native-elements';
import { auth } from '../firebase';

const RegisterScreen = ({navigation}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: 'Back to Login'
        });
    }, [navigation]);
    
    const register = () => {
        auth.createUserWithEmailAndPassword(email, password)
        .then(authUser => {
            authUser.user.updateProfile({
                displayName: name,
                photoURL: imageUrl || 'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg'
            })
        })
        .catch(error => alert(error.message));
    };

    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <StatusBar style='light' />
            <Text h3 style={{marginBottom: 50}} >Create a Signal Account</Text>
            <View style={styles.inputContainer}>
                <Input placeholder='Full Name' type='text' 
                    autoFocus
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
                <Input placeholder='Email' type='email' 
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <Input placeholder='Password' type='password' secureTextEntry
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <Input placeholder='Profile Picture URL (optional)' type='text' 
                    value={imageUrl}
                    onChangeText={(text) => setImageUrl(text)}
                    onSubmitEditing={register}
                />
            </View>
            <Button 
                containerStyle={styles.button}
                raised
                onPress={register}
                title='Register'
            />
            <View style={{height: 100}} />
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'white',
    },
    inputContainer: {
        width: 300
    },
    button: {
        width: 200,
        marginTop: 10
    },
})
