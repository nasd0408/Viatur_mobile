import 'react-native-gesture-handler'
import MainNavigator from './src/navigation/MainNavigator';
import { SiteProvider } from './src/context/SiteContext';
import { PaperProvider } from 'react-native-paper';
import { AuthProvider } from './src/context/AuthContext';
import { ServicioTuristicoProvider } from './src/context/ServiciosContext';
import { AppProvider } from './src/context/AppContext';
import { PromocionProvider } from './src/context/PromocionContext';
import { RutasProvider } from './src/context/RutasContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

MaterialCommunityIcons.loadFont();


export default function App() {
  return (
    <PaperProvider>
      <AppProvider>
        <ServicioTuristicoProvider>
          <PromocionProvider>
            <SiteProvider>
              <RutasProvider>
                <AuthProvider>
                  <MainNavigator />
                </AuthProvider>
              </RutasProvider>
            </SiteProvider>
          </PromocionProvider>
        </ServicioTuristicoProvider>
      </AppProvider>
    </PaperProvider>
  );
}

