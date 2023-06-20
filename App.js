import 'react-native-gesture-handler'
import MainNavigator from './src/navigation/MainNavigator';
import { SiteProvider } from './src/context/SiteContext';
import { PaperProvider } from 'react-native-paper';
import { AuthProvider } from './src/context/AuthContext';
import { ServicioTuristicoProvider } from './src/context/ServiciosContext';

export default function App() {
  return (
    <PaperProvider>
      <ServicioTuristicoProvider>
        <SiteProvider>
          <AuthProvider>
            <MainNavigator />
          </AuthProvider>
        </SiteProvider>
      </ServicioTuristicoProvider>
    </PaperProvider>
  );
}

