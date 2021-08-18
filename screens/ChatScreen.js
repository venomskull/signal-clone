import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { ScrollView } from 'react-native';
import { TextInput } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import { Keyboard } from 'react-native';
import { auth, db } from '../firebase';
import * as firebase from 'firebase';

const ChatScreen = ({navigation, route}) => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Chat',
            headerTitleAlign: 'right', //not working
            headerBackTitleVisible: false,
            headerTitle: () => (
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    
                }}>
                    <Avatar rounded source={{
                        uri: messages[0]?.data.photoURL, // ||
                        // 'data:image/jpeg;base64,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'
                        }} 
                    />
                    <Text style={{color: 'white', marginLeft: 10, fontWeight: '700'}}>{route.params.chatName}</Text>
                </View>
            ),
            headerLeft: () => (
                <TouchableOpacity //activeOpacity={0.5} 
                    style={{marginLeft: 10}}
                    onPress={() => navigation.goBack()}
                > 
                    <AntDesign name='arrowleft' size={24} color='white' />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: 80,
                    marginRight: 20,
                }}>
                    <TouchableOpacity>
                        <FontAwesome name='video-camera' size={24} color='white' />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name='call' size={24} color='white' />
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [navigation, messages]);

    const sendMessage = () => {
        Keyboard.dismiss();
        db.collection('chats').doc(route.params.id).collection('messages').add({
            message: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL
        });
        setInput('');
    }

    useLayoutEffect(() => {
        const unsubscribe = db.collection('chats').doc(route.params.id).collection('messages').orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => {
                setMessages(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })));
            })
        return unsubscribe;
    }, [route]);

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}} >
            <StatusBar style='light' />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
                keyboardVerticalOffset={90}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <>
                        <ScrollView contentContainerStyle={{paddingTop: 15}}>
                            {messages.map(({id, data}) => (
                                data.email === auth.currentUser.email ? (
                                    <View key={id} style={styles.receiver}>
                                        <Avatar rounded size={30} source={{uri: data.photoURL}}
                                            position='absolute' bottom={-15} right={-5}
                                            //WEB
                                            containerStyle={{
                                                position: 'absolute',
                                                bottom: -15,
                                                right: -5
                                            }}
                                        />
                                        <Text style={styles.receiverText}>{data.message}</Text>
                                    </View>
                                ): (
                                    <View key={id} style={styles.sender}>
                                        <Avatar rounded size={30} source={{uri: data.photoURL}}
                                            position='absolute' bottom={-15} left={-5}
                                            //WEB
                                            containerStyle={{
                                                position: 'absolute',
                                                bottom: -15,
                                                left: -5
                                            }}
                                        />
                                        <Text style={styles.senderText}>{data.message}</Text>
                                        <Text style={styles.senderName}>{data.displayName}</Text>
                                    </View>
                                )
                            ))}
                        </ScrollView>
                        <View style={styles.footer}>
                            <TextInput placeholder='Signal Message' style={styles.textInput} 
                                value={input}
                                onChangeText={text => setInput(text)}
                                onSubmitEditing={sendMessage}
                            />
                            <TouchableOpacity activeOpacity={0.5} onPress={sendMessage}>
                                <Ionicons name='send' size={24} color='#2B68E6' />
                            </TouchableOpacity>
                        </View>
                    </>
                </TouchableWithoutFeedback>

            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        padding: 15,
    },
    textInput: {
        flex: 1,
        borderRadius: 30,
        backgroundColor: '#ECECEC',
        padding: 10,
        height: 40,
        marginRight: 15,
        color: 'grey',
        bottom: 0,
        // borderColor: 'transparent',
    },
    receiver: {
        backgroundColor: '#ECECEC',
        borderRadius: 20,
        marginBottom: 20,
        padding: 15,
        marginRight: 15,
        maxWidth: '80%',
        position: 'relative',
        alignSelf: 'flex-end'
    },
    sender: {
        backgroundColor: '#2B68E6',
        borderRadius: 20,
        marginBottom: 20,
        padding: 15,
        marginLeft: 15,
        maxWidth: '80%',
        position: 'relative',
        alignSelf: 'flex-start'
    },
    receiverText: {
        color: 'black',
        fontWeight: '500',
        marginLeft: 10,
    },
    senderText: {
        color: 'white',
        fontWeight: '500',
        marginLeft: 10,
        marginBottom: 15,
    },
    senderName: {
        fontSize: 10,
        color: 'white',
        paddingRight: 10,
        left: 10,
    },
})
