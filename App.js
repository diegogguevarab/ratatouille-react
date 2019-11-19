import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

// import the different screens
import LoadingScreen from './src/screens/Loading'
import SignUpScreen from './src/screens/SignUp'
import LoginScreen from './src/screens/Login'
import MainScreen from './src/screens//Main'


// create our app's navigation stack
const App = createStackNavigator(
	{
		Loading: {
			screen: LoadingScreen,
			navigationOptions: {
				header: null
			}
		},
		SignUp: {
			screen: SignUpScreen,
			navigationOptions: {
				header: null
			}
		},
		Login: {
			screen: LoginScreen,
			navigationOptions: {
				header: null
			}
		},
		Main: {
			screen: MainScreen,
			navigationOptions: {
				header: null
			}
		}
	},
	{
		initialRouteName: 'Loading',
	},
)

export default createAppContainer(App)
