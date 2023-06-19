import { StyleSheet, Text, View, SafeAreaView, Platform, ScrollView } from 'react-native'
import React, { useId } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Pressable } from 'react-native';
import { cleanCart, decrementQuantity, incrementQuantity } from '../redux/cartReducer';
import { decrementQty, incremetQty } from '../redux/productReducer';
import { auth, db } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';


const CartScreen = () => {
    const cart = useSelector((state) => state.cart.cart);
    const total = cart.map((item) => item.quantity * item.price).reduce((curr, prev) => curr + prev, 0);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const route = useRoute();
    const userID = auth.currentUser.uid;


    const placeOrder = async() =>{
      navigation.navigate("orderScreen")
      dispatch(cleanCart());
      await setDoc(doc(db,"users",`${userID}`),{
        orders:{...cart},
        picupDetails:route.params
      },
      {
        merge:true
      }
      );
      console.log("placeOrder fun")
    };

    return (
        <>
        <ScrollView style={styles.androidSafeArea}>
            {total === 0 ? (
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <Text>Your Cart is Empty</Text>
                </View>
            ) : (
                <>
                    <View style={{ padding: 10, flexDirection: "row", alignItems: "center" }}>
                        <Ionicons onPress={() => navigation.goBack()} name="arrow-back" size={30} color="black" />
                        <Text>Your Bucket</Text>
                    </View>
                    <Pressable style={{backgroundColor:"white",borderRadius:12,marginHorizontal:10,padding:14}}>
                        {cart.map((item,index)=>(
                            <View key={index} style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginVertical:12}} >
                                <Text style={{width:100,fontSize:16,fontWeight:"600"}}>{item.name}</Text>
                                <Pressable
                      style={{
                        flexDirection: "row",
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                      }}
                    >
                      <Pressable

                        onPress={()=>{
                            dispatch(decrementQty(item)); //product
                            dispatch(decrementQuantity(item));  //cart
                        }}

                        style={{
                          width: 26,
                          height: 26,
                          borderRadius: 13,
                          borderColor: "#BEBEBE",
                          backgroundColor: "#E0E0E0",
                          justifyContent: "center",
                          alignContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 20,
                            color: "#088F8F",
                            paddingHorizontal: 6,
                            fontWeight: "600",
                            textAlign: "center",
                          }}
                        >
                          -
                        </Text>
                      </Pressable>
          
                      <Pressable>
                        <Text
                          style={{
                            fontSize: 19,
                            color: "#088F8F",
                            paddingHorizontal: 8,
                            fontWeight: "600",
                          }}
                        >
                          {item.quantity}
                        </Text>
                      </Pressable>
          
                      <Pressable
                            onPress={()=>{
                                dispatch(incrementQuantity(item));
                                dispatch(incremetQty(item));
                            }}
                        style={{
                          width: 26,
                          height: 26,
                          borderRadius: 13,
                          borderColor: "#BEBEBE",
                          backgroundColor: "#E0E0E0",
                          justifyContent: "center",
                          alignContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 20,
                            color: "#088F8F",
                            paddingHorizontal: 6,
                            fontWeight: "600",
                            textAlign: "center",
                          }}
                        >
                          +
                        </Text>
                      </Pressable>
                    </Pressable>
                                <Text style={{fontSize:16,fontWeight:"600"}}>${item.price * item.quantity}</Text>
                            </View>
                        ))}
                    </Pressable>
                    <View style={{ marginHorizontal: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 30 }}>
                Billing Details
              </Text>
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 7,
                  padding: 10,
                  marginTop: 15,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: "400", color: "gray" }}
                  >
                    Item Total
                  </Text>
                  <Text style={{ fontSize: 18, fontWeight: "400" }}>
                    ${total}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: 8,
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: "400", color: "gray" }}
                  >
                    Delivery Fee | 1.2KM
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "400",
                      color: "#088F8F",
                    }}
                  >
                    FREE
                  </Text>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    style={{ fontSize: 18, fontWeight: "500", color: "gray" }}
                  >
                    Free Delivery on Your order
                  </Text>
                </View>

                <View
                  style={{
                    borderColor: "gray",
                    height: 1,
                    borderWidth: 0.5,
                    marginTop: 10,
                  }}
                />

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: 10,
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: "500", color: "gray" }}
                  >
                    selected Date
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "400",
                      color: "#088F8F",
                    }}
                  >
                    {/* {route.params.pickUpDate} */}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: "500", color: "gray" }}
                  >
                    No Of Days
                  </Text>

                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "400",
                      color: "#088F8F",
                    }}
                  >
                    {route.params.no_Of_days}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: 10,
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: "500", color: "gray" }}
                  >
                    selected Pick Up Time
                  </Text>

                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "400",
                      color: "#088F8F",
                    }}
                  >
                    {route.params.selectedTime}
                  </Text>
                </View>
                <View
                  style={{
                    borderColor: "gray",
                    height: 1,
                    borderWidth: 0.5,
                    marginTop: 10,
                  }}
                />

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: 8,
                  }}
                >
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    To Pay
                  </Text>
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    {/* {total + 95} */}
                  </Text>
                </View>
              </View>
            </View>
                </>
            )}
        </ScrollView>

        {total == 0 ? (null) : (
                <Pressable style={{ backgroundColor: "#088F8F", padding: 10,marginTop:"auto", marginBottom: 30, margin: 15, borderRadius: 7, flexDirection: "row", alignItems: "center", justifyContent: "space-between",marginBottom:40 }}>
                    <View>
                        <Text style={{fontSize:17,fontWeight:"600",color:"white"}}>{cart.length} items | $ {total}</Text>
                        <Text style={{fontSize:15,fontWeight:"400",color:"white",marginVertical:6}}>extra charges may apply</Text>
                    </View>

                    <Pressable  onPress={placeOrder} >
                        <Text style={{fontSize:17,fontWeight:"600",color:"white"}}>Place Order</Text>
                    </Pressable>
                </Pressable>

            )}

        </>
    )
}

export default CartScreen

const styles = StyleSheet.create({
    androidSafeArea: {
        paddingTop: Platform.OS === 'android' ? 28 : 0,
        backgroundColor: "#f0f0f0",
        flex: 1,
        paddingHorizontal: Platform.OS === 'android' ? 5 : 0
    },
})