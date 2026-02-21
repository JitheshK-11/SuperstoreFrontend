import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screen/Home/HomeScreen';
import LoginScreen from './src/screen/auth/LoginScreen';
import RegisterScreen from './src/screen/auth/RegisterScreen';
import CartScreen from './src/screen/Cart/CartScreen';
import CategoriesScreen from './src/screen/Categories/CategoriesScreen';
import OrdersScreen from './src/screen/Orders/OrdersScreen';
import OrderDetailsScreen from './src/screen/Orders/OrderDetailsScreen';
import { CartProvider } from './src/context/CartContext';
import ProfileScreen from './src/screen/Profile/ProfileScreen';
import ProductDetailsScreen from './src/screen/Product/ProductDetailsScreen';
import CheckoutScreen from './src/screen/Checkout/CheckoutScreen';
import SplashScreen from './src/screen/IntroScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SplashScreen"
          screenOptions={{
            headerShown: false,
          }}
        ><Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="Categories" component={CategoriesScreen} />
          <Stack.Screen name="Orders" component={OrdersScreen} />
          <Stack.Screen name="OrderDetails" component={OrderDetailsScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
          <Stack.Screen name="Checkout" component={CheckoutScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}
