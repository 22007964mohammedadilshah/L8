import React, { useState } from 'react';
import { StatusBar, View, Button, Text, TextInput, Image } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";


const Add = ({ navigation, route }) => {
    const [book, setBook] = useState("");
    const [ISBN, setISBN] = useState("");
    const [image, setImage] = useState("");
    const [copies, setCopies] = useState("");

    const setData = async (value) => {
        await AsyncStorage.setItem("bookdata", value);
        navigation.navigate("Home");
    };

    return (
        <View>
            <StatusBar />
            <Text>Title: </Text>
            <TextInput style={{ borderWidth: 1 }} onChangeText={(text) => setBook(text)} />
            <Text> ISBN: </Text>
            <TextInput style={{ borderWidth: 1 }} onChangeText={(text) => setISBN(text)} />
            <Text> Image URL: </Text>
            <TextInput style={{ borderWidth: 1 }} onChangeText={(text) => setImage(text)} />
            <Text> Copies Owned: </Text>
            <TextInput style={{ borderWidth: 1 }} onChangeText={(text) => setCopies(text)} />

            <Button
                title="Submit"
                onPress={() => {
                    let mydata = JSON.parse(route.params.datastring);
                    const newItem = { name: book, ISBN, Image: image, Copies: copies };
                    mydata[0].data.push(newItem);
                    setData(JSON.stringify(mydata));
                }}
            />
        </View>
    );
};

export default Add;
