import MainNavigator from './src/navigation/MainNavigator';
import { SiteProvider } from './src/context/SiteContext';
import { PaperProvider, DefaultTheme } from 'react-native-paper';
import { AuthProvider } from './src/context/AuthContext';
import { ServicioTuristicoProvider } from './src/context/ServiciosContext';
import { PromocionProvider } from './src/context/PromocionContext';
import { RutasProvider } from './src/context/RutasContext';
import { SignupProvider } from './src/context/SignUpContext';
import { UserProvider } from './src/context/UserContext';
import { AlgoritmoProvider } from './src/context/AlgoritmoContext';
import colors from './src/utils/ColorScheme';
export default function App() {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: colors.Primary,
      accent: colors.OffWhite,
      secondary: colors.Secondary,
      onPrimary: colors.OffWhite,
      surfaceVariant:colors.OffWhite,
    
      
      
    },
  };
  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <SignupProvider>
          <UserProvider>
            <ServicioTuristicoProvider>
              <PromocionProvider>
                <SiteProvider>
                  <AlgoritmoProvider>
                    <RutasProvider>
                      <MainNavigator />
                    </RutasProvider>
                  </AlgoritmoProvider>
                </SiteProvider>
              </PromocionProvider>
            </ServicioTuristicoProvider>
          </UserProvider>
        </SignupProvider>
      </AuthProvider>
    </PaperProvider>
  );
}

