import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import IntroScreen from './src/screen/IntroScreen';
import LoginScreen from './src/screen/auth/LoginScreen';
import HomeScreen from './src/screen/Home/HomeScreen';
import RegisterScreen from './src/screen/auth/RegisterScreen';
import CategoriesScreen from './src/screen/Categories/CategoriesScreen';
import OrdersScreen from './src/screen/Orders/OrdersScreen';
import ProfileScreen from './src/screen/Profile/ProfileScreen';
import ProductDetailsScreen from './src/screen/Product/ProductDetailsScreen';
import CartScreen from './src/screen/Cart/CartScreen';
import CheckoutScreen from './src/screen/Checkout/CheckoutScreen';
import { CartProvider } from './src/context/CartContext';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="IntroScreen" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="IntroScreen" component={IntroScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Categories" component={CategoriesScreen} />
          <Stack.Screen name="Orders" component={OrdersScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="Checkout" component={CheckoutScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}
