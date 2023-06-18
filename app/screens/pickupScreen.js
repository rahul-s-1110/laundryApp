import { StyleSheet, Text, View, SafeAreaView, TextInput, Pressable, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import HorizontalDatepicker from '@awrminkhodaei/react-native-horizontal-datepicker';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';


const PickupScreen = () => {
    const cart = useSelector((state) => state.cart.cart)
    const total = cart.map((item) => item.quantity * item.price).reduce((curr, prev) => curr + prev, 0);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState([]);
    const [delivery,setDelivery] = useState([]);
    const navigation = useNavigation();

    const deliveryTime = [
        {
            id: "0",
            name: "2-3 Days",
        },
        {
            id: "1",
            name: "3-4 Days",
        },
        {
            id: "2",
            name: "4-5 Days",
        },
        {
            id: "3",
            name: "5-6 Days",
        },
        {
            id: "4",
            name: "Tommorrow",
        },
    ];

    const times = [
        {
            id: "0",
            time: "11:00 PM",
        },
        {
            id: "1",
            time: "12:00 PM",
        },
        {
            id: "2",
            time: "1:00 PM",
        },
        {
            id: "2",
            time: "2:00 PM",
        },
        {
            id: "4",
            time: "3:00 PM",
        },
        {
            id: "5",
            time: "4:00 PM",
        },
    ];

    const proceedToCart = () =>{
        if(!selectedDate || !selectedTime || !delivery){
            Alert.alert(
                "Empty or invalid",
                "Please select all the fields",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
              );
        }
        // console.log("selectedDate",selectedDate.split('T'))
        if(selectedDate && selectedTime && delivery){
            navigation.replace('cartScreen',{
                pickUpDate:selectedDate,
                no_Of_days:delivery,
                selectedTime:selectedTime
            });
        }
    }

    return (
        <>
        <SafeAreaView style={styles.androidSafeArea}>
            <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>Enter Address</Text>
            <TextInput style={{ padding: 40, borderColor: "gray", borderWidth: 0.7, paddingVertical: 80, borderRadius: 9, margin: 10 }} />
            <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>Pick up Date</Text>
            <HorizontalDatepicker
                mode="gregorian"
                startDate={new Date('2023-06-16')}
                endDate={new Date('2023-06-25')}
                initialSelectedDate={new Date('2020-08-22')}
                onSelectedDateChange={(date) => setSelectedDate(date)}
                selectedItemWidth={170}
                unselectedItemWidth={38}
                itemHeight={38}
                itemRadius={10}
                selectedItemTextStyle={styles.selectedItemTextStyle}
                unselectedItemTextStyle={styles.selectedItemTextStyle}
                selectedItemBackgroundColor="#222831"
                unselectedItemBackgroundColor="#ececec"
                flatListContainerStyle={styles.flatListContainerStyle}
            />
            <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>Select Time</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {times.map((item, index) => (
                    <Pressable key={index} onPress={() => setSelectedTime(item.time)} 
                    style={
                        selectedTime.includes(item.time)?{ marginLeft: 10, borderRadius: 7, padding: 15, borderColor: "red", borderWidth: 0.7 }:{ marginLeft: 10, borderRadius: 7, padding: 15, borderColor: "gray", borderWidth: 0.7 }
                    }
                    >
                        <Text>{item.time}</Text>
                    </Pressable>
                ))}
            </ScrollView>


            <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>Delivery Date</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {deliveryTime.map((item, index) => (
                    <Pressable key={index} onPress={() => setDelivery(item.name)} 
                    style={
                        delivery.includes(item.name)?{ marginLeft: 10, borderRadius: 7, padding: 15, borderColor: "red", borderWidth: 0.7 }:{ marginLeft: 10, borderRadius: 7, padding: 15, borderColor: "gray", borderWidth: 0.7 }
                    }
                    >
                        <Text>{item.name}</Text>
                    </Pressable>
                ))}
            </ScrollView>
        </SafeAreaView>

        {total == 0 ? (null) : (
                <Pressable style={{ backgroundColor: "#088F8F", padding: 10,marginTop:"auto", marginBottom: 30, margin: 15, borderRadius: 7, flexDirection: "row", alignItems: "center", justifyContent: "space-between",marginBottom:40 }}>
                    <View>
                        <Text style={{fontSize:17,fontWeight:"600",color:"white"}}>{cart.length} items | $ {total}</Text>
                        <Text style={{fontSize:15,fontWeight:"400",color:"white",marginVertical:6}}>extra charges may apply</Text>
                    </View>

                    <Pressable onPress={proceedToCart}>
                        <Text style={{fontSize:17,fontWeight:"600",color:"white"}}>Proceed to Cart</Text>
                    </Pressable>
                </Pressable>
            )}

        </>
    )
}

export default PickupScreen

const styles = StyleSheet.create({
    androidSafeArea: {
        paddingTop: Platform.OS === 'android' ? 28 : 0,
        backgroundColor: "#f0f0f0"
    },
})