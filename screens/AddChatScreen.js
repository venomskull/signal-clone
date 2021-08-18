import React, {useLayoutEffect, useState} from 'react'
import { Button } from 'react-native-elements';
import { StyleSheet, Text, View } from 'react-native'
import { Input } from 'react-native-elements/dist/input/Input';
import Icon from 'react-native-vector-icons/FontAwesome';
import { db } from '../firebase';

const AddChatScreen = ({navigation}) => {
    const[input, setInput] = useState('');

    const createChat = async () => {
        await db.collection('chats')
        .add({
            chatName: input
        })
        .then(() => {
            navigation.goBack();
        })
        .catch(error => alert(error.message));
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Add a new Chat',
            headerBackTitle: 'Chats',
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Input
                autoFocus 
                placeholder='Enter a chat name'
                value={input} onChangeText={(text) => setInput(text)}
                leftIcon={
                    <Icon name='wechat' type='antdesign' size={24} color='black'/>
                }
                onSubmitEditing={createChat}
            />
            <Button disabled={!input} title='Create a new Chat' onPress={createChat}/>
        </View>
    )
}

export default AddChatScreen

const styles = StyleSheet.create({
    container: {
        padding: 30,
        height: '100%',
        backgroundColor: 'white',
    },
})
