import { View, Text, SafeAreaView, Image, StyleSheet, Platform, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location'
import { Alert } from 'react-native'
import { MaterialIcons,FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { TextInput } from 'react-native';
import Carousel from '../componnet/carousel';
import Services from '../componnet/services';
import DressItem from '../componnet/dressItem';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../redux/productReducer';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';


const HomeScreen = () => {
    const cart = useSelector((state) => state.cart.cart)
    const total = cart.map((item) => item.quantity * item.price).reduce((curr, prev) => curr + prev, 0);
    const [displayCurrentAddress, setDisplayCurrentAddress] = useState("we are loading Loaction")
    const [locationServiceEnable, setLocationServiceEnable] = useState(false);
    const [items,setItems] = useState([])        
    const navigation = useNavigation();

    useEffect(() => {
        checkIfLocationEnabled();
        getCurrentLocation();
    }, [])

    const checkIfLocationEnabled = async () => {
        let enabled = await Location.hasServicesEnabledAsync();
        if (!enabled) {
            Alert.alert(
                "Location services not enabled",
                "Please enable the location services",
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel",
                    },
                    { text: "OK", onPress: () => console.log("OK Pressed") },
                ],
                { cancelable: false }
            );
        } else {
            setLocationServiceEnable(enabled);
        }
    };
    const getCurrentLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
            Alert.alert(
                "Permission denied",
                "allow the app to use the location services",
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel",
                    },
                    { text: "OK", onPress: () => console.log("OK Pressed") },
                ],
                { cancelable: false }
            );
        }

        const { coords } = await Location.getCurrentPositionAsync();
        if (coords) {
            const { latitude, longitude } = coords;

            let response = await Location.reverseGeocodeAsync({
                latitude,
                longitude,
            });

            for (let item of response) {
                let address = `${item.name} ${item.city} ${item.postalCode}`;
                setDisplayCurrentAddress(address);
            }
        }
    };

    const product = useSelector((state) => state.product.product)
    const dispatch = useDispatch();

    useEffect(() => {
        if (product.length > 0) return;

        const fetchProduct = async () => {
            const colref = collection(db, "types");
            const docSnap = await getDocs(colref);
            docSnap.forEach((doc) => {
                items.push(doc.data());
            })
            items.map((service) => dispatch(getProduct(service)))
        }

        fetchProduct();
    }, [])

    

    return (
        <>
            <ScrollView style={styles.androidSafeArea}>
                <View style={styles.topbar}>
                    <MaterialIcons name="location-on" size={30} color="#fd5c63" />
                    <View>
                        <Text style={{ fontSize: 18, fontWeight: "600" }}>Home</Text>
                        <Text>{displayCurrentAddress}</Text>
                    </View>
                    <Pressable onPress={()=>navigation.navigate('profileScreen')} style={{ marginLeft: "auto", marginRight: 8 }}>
                        <FontAwesome5 name="user-tie" size={24} color="black" />
                    </Pressable>
                </View>
                <View style={styles.searchBarView}>
                    <TextInput placeholder='Search for Item or More' />
                    <Feather name="search" size={24} color="#fd5c63" />
                </View>
                <Carousel />
                <Services />
                {product.map((item, index) => (
                    <DressItem item={item} key={index} />
                ))}
            </ScrollView>
            {total == 0 ? (null) : (
                <Pressable style={{ backgroundColor: "#088F8F", padding: 10, marginBottom: 30, margin: 15, borderRadius: 7, flexDirection: "row", alignItems: "center", justifyContent: "space-between",marginBottom:40 }}>
                    <View>
                        <Text style={{fontSize:17,fontWeight:"600",color:"white"}}>{cart.length} items | $ {total}</Text>
                        <Text style={{fontSize:15,fontWeight:"400",color:"white",marginVertical:6}}>extra charges may apply</Text>
                    </View>

                    <Pressable onPress={()=>navigation.navigate('pickUp')}>
                        <Text style={{fontSize:17,fontWeight:"600",color:"white"}}>Proceed to Pickup</Text>
                    </Pressable>
                </Pressable>

            )}
        </>
    )
}

const styles = StyleSheet.create({
    androidSafeArea: {
        paddingTop: Platform.OS === 'android' ? 28 : 0,
        backgroundColor: "#f0f0f0"
    },
    topbar:{
        flexDirection: "row", alignItems: "center", padding: 10
    },
    searchBarView:{
        margin: 10, flexDirection: "row", padding: 10, alignItems: "center", justifyContent: "space-between", borderWidth: 0.8, borderColor: "#C0C0C0", borderRadius: 7
    }
})

export default HomeScreen