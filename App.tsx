import * as React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import OnBoarding from './src/screens/OnBoarding';
import Login from './src/screens/auth/Login';
import SignUp from './src/screens/auth/SignUp';
import Home from './src/screens/Home';
import {useNavigation} from '@react-navigation/native';
import {STYLES} from './src/constants/styles';
import {COLORS} from './src/constants/theme';
import Explore from './src/screens/Explore';
import Favourites from './src/screens/Favourites';
import Orders from './src/screens/Orders';
import SingleProduct from './src/screens/product/SingleProduct';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

type MyTabBarProps = {
  state: any;
  descriptors: any;
  navigation: any;
};

function MyTabBar({state, descriptors, navigation}: MyTabBarProps) {
  console.log(descriptors);
  return (
    <View
      style={{
        flexDirection: 'row',
        height: 60,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'space-evenly',
      }}>
      {state.routes.map((route: any, index: number) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
            key={route.key}>
            {isFocused ? (
              <Image
                resizeMode="contain"
                style={{width: 25, height: 25}}
                source={
                  label == 'Home'
                    ? require('./assets/images/home-f.png')
                    : label == 'Favourites'
                    ? require('./assets/images/star-f.png')
                    : label == 'Explore'
                    ? require('./assets/images/search-f.png')
                    : require('./assets/images/profile-f.png')
                }
              />
            ) : (
              <Image
                resizeMode="contain"
                style={{width: 25, height: 25}}
                source={
                  label == 'Home'
                    ? require('./assets/images/home-u.png')
                    : label == 'Favourites'
                    ? require('./assets/images/star-u.png')
                    : label == 'Explore'
                    ? require('./assets/images/search-u.png')
                    : require('./assets/images/profile-u.png')
                }
              />
            )}
            {/* <Text
              style={[
                STYLES.text,
                {
                  color: isFocused ? '#ea9459' : COLORS.primary,
                  fontFamily: 'Poppins',
                },
              ]}>
              {label}
            </Text> */}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function HomeTabs() {
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen name="Home" component={Home} options={{headerShown: false}} />
      <Tab.Screen name="Explore" component={Explore} />
      <Tab.Screen
        name="Favourites"
        component={Favourites}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Orders"
        component={Orders}
        options={{headerShown: false}}
      />

      {/* <Tab.Screen
        name="Options"
        component={Home}
        options={{headerShown: false}}
      /> */}
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="HomeTabs" component={HomeTabs} />

        {/* <Stack.Screen name="OnBoarding" component={OnBoarding} /> */}
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="SingleProduct"
          component={SingleProduct as React.FC}
        />
        <Stack.Screen name="SignUp" component={SignUp} />
        {/* <Stack.Screen name="Home" component={Home} /> */}
        {/* <Stack.Screen name="Explore" component={Explore} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
