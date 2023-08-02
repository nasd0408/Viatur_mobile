import MainNavigator from './src/navigation/MainNavigator';
import { SiteProvider } from './src/context/SiteContext';
import { PaperProvider } from 'react-native-paper';
import { AuthProvider } from './src/context/AuthContext';
import { ServicioTuristicoProvider } from './src/context/ServiciosContext';
import { PromocionProvider } from './src/context/PromocionContext';
import { RutasProvider } from './src/context/RutasContext';

export default function App() {
  return (
      <PaperProvider>
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
      </PaperProvider>
  );
}

