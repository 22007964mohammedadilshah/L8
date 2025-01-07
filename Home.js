import React, { useState, useEffect } from 'react';
import { StatusBar, Button, SectionList, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { datasource } from './Data.js';
import AsyncStorage from '@react-native-async-storage/async-storage';



const styles = StyleSheet.create({
    textStyle: {
        fontSize: 15,
        margin: 10,
        textAlign: 'left',
    },
    opacityStyle: {
        borderWidth: 1,
    },
    headerText: {
        fontSize: 20,
        margin: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'impact',
    },
});

const Home = ({ navigation }) => {
    const [mydata, setMyData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            let datastr = await AsyncStorage.getItem('bookdata');
            if (datastr != null) {
                setMyData(JSON.parse(datastr));
            } else {
                setMyData(datasource);
            }
        };
        getData();
    }, []);

    const renderItem = ({ item, index, section }) => (
        <TouchableOpacity
            style={[styles.opacityStyle, { flexDirection: 'row', alignItems: 'center', padding: 10 }]}
            onPress={() => {
                navigation.navigate("Edit", {
                    index,
                    sectionIndex: section.title === "My Books" ? 0 : -1,
                    item,
                    datastring: JSON.stringify(mydata),
                });
            }}
        >

            <View style={{ flex: 1 }}>
                <Text style={styles.textStyle}>{item.name}</Text>
                <Text style={styles.textStyle}>ISBN: {item.ISBN}</Text>
                <Text style={styles.textStyle}>Copies Owned: {item.Copies}</Text>
            </View>


            {item.Image && (
                <Image
                    source={{ uri: item.Image }}
                    style={{ width: 80, height: 120, marginLeft: 10 }}
                />
            )}
        </TouchableOpacity>
    );

    return (
        <View>
            <StatusBar />
            <Button
                title="Add Book"
                onPress={() => navigation.navigate("Add", { datastring: JSON.stringify(mydata) })}
            />
            <SectionList
                sections={mydata}
                renderItem={renderItem}
                renderSectionHeader={({ section: { title, bgcolor } }) => (
                    <Text style={[styles.headerText, { backgroundColor: bgcolor }]}>{title}</Text>
                )}
            />
        </View>
    );
};

export default Home;
