import 'react-native-gesture-handler'
import MainNavigator from './src/navigation/MainNavigator';
import { SiteProvider } from './src/context/SiteContext';
import { UserProvider } from './src/context/UserContext';

export default function App() {
  return (
    <UserProvider>
      <SiteProvider>
        <MainNavigator/>
      </SiteProvider>
    </UserProvider>
  );
}

