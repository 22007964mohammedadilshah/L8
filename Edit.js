import React, { useState } from 'react';
import { Alert, View, Button, Text, TextInput } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Edit = ({ navigation, route }) => {
    let mydata = JSON.parse(route.params.datastring);
    let myindex = route.params.index;
    const [book, setBook] = useState(route.params.item.name);
    const [ISBN, setISBN] = useState(route.params.item.ISBN);
    const [image, setImage] = useState(route.params.item.Image);
    const [copies, setCopies] = useState(route.params.item.Copies);

    const setData = async (value) => {
        await AsyncStorage.setItem("bookdata", value);
        navigation.navigate("Home");
    };

    return (
        <View>
            <Text>Title: </Text>
            <TextInput value={book} style={{ borderWidth: 1 }} onChangeText={(text) => setBook(text)} />
            <Text>ISBN: </Text>
            <TextInput value={ISBN} style={{ borderWidth: 1 }} onChangeText={(text) => setISBN(text)} />
            <Text>Image URL: </Text>
            <TextInput value={image} style={{ borderWidth: 1 }} onChangeText={(text) => setImage(text)} />
            <Text>Copies Owned: </Text>
            <TextInput value={copies} style={{ borderWidth: 1 }} onChangeText={(text) => setCopies(text)} />

            <View style={{ flexDirection: "row" }}>
                <Button
                    title="Save"
                    onPress={() => {
                        mydata[0].data[myindex] = { name: book, ISBN, Image: image, Copies: copies };
                        setData(JSON.stringify(mydata));
                    }}
                />
                <Button
                    title="Delete"
                    onPress={() => {
                        Alert.alert("Are you sure?", '', [
                            {
                                text: "Yes",
                                onPress: () => {
                                    mydata[0].data.splice(myindex, 1);
                                    setData(JSON.stringify(mydata));
                                },
                            },
                            { text: "No" },
                        ]);
                    }}
                />
            </View>
        </View>
    );
};

export default Edit;
