import { BottomNavigation, BottomNavigationTab } from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const handleTabPress = (index) => {
    const { routeName } = state.routes[index];
    navigation.navigate(routeName);
  };

  return (
    <BottomNavigation
      navigationState={state}
      onIndexChange={handleTabPress}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel || options.title || route.name;

        return (
          <BottomNavigationTab
            key={route.key}
            label={label}
            // Add your desired icon prop based on the route
          />
        );
      })}
    </BottomNavigation>
  );
};

export default CustomTabBar