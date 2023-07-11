import React, { useState } from 'react';
import { View, ImageBackground, StatusBar } from 'react-native';
import styles from '../../styles/LoginScreenStyles';
import { Button, Text, TextInput, List, Provider, Portal, Modal, RadioButton, Avatar, Chip, Divider } from 'react-native-paper';
import { useAuth } from '../../context/AuthContext';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { ScrollView } from 'react-native-gesture-handler';

const Tab = createMaterialTopTabNavigator();

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('')
  const [password, setPassword] = useState('');
  const [direccion, setDireccion] = useState('')
  const [telefono, setTelefono] = useState('')
  const [fechaNacimiento, setFechaNacimiento] = useState(new Date())
  const [sexo, setSexo] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const { onRegister } = useAuth();
  const [sexModalVisible, setSexModalVisible] = useState(false);
  const [dateModalVisible, setDateModalVisible] = useState(false)
  const [datePickerVisible, setDatePickerVisible] = useState(false)
  const [profilePicture, setProfilePicture] = useState(null);

  //Preferencias
  const [selectedBioma, setSelectedBioma] = useState([]);
  const [selectedClima, setSelectedClima] = useState([]);
  const [selectedTemporadas, setSelectedTemporadas] = useState([]);
  const [selectedAtracciones, setSelectedAtracciones] = useState([]);
  const [selectedCultura, setSelectedCultura] = useState([]);
  const [selectedHistoria, setSelectedHistoria] = useState([]);
  const [selectedGastronomia, setSelectedGastronomia] = useState([]);
  const [selectedBelleza, setSelectedBelleza] = useState([]);
  const [selectedBiodiversidad, setSelectedBiodiversidad] = useState([]);
  const [selectedActividades, setSelectedActividades] = useState([]);
  const [selectedInfraestructura, setSelectedInfraestructura] = useState([]);
  const [selectedActividadesCulturales, setSelectedActividadesCulturales] = useState([]);

  const renderCategoryChips = (categoryName, chipsData, selectedState, handleSelection) => {
    return (
      <View>
        <Text style={styles.categoryName}>{categoryName}</Text>
        <View style={styles.chipsContainer}>
          {chipsData.map((chip) => (
            <Chip
              key={chip}
              style={styles.chip}
              onPress={() => handleSelection(chip)}
              selected={selectedState.includes(chip)}
            >
              {chip}
            </Chip>
          ))}
        </View>
        <Divider style={styles.divider} />
      </View>
    );
  };
  const handleChipSelection = (selectedItem, setSelectedItem, selectedState) => {
    if (selectedState.includes(selectedItem)) {
      setSelectedItem(selectedState.filter((item) => item !== selectedItem));
    } else {
      setSelectedItem([...selectedState, selectedItem]);
    }
  };
  const biomaChipsData = ['Selva tropical', 'Desierto', 'Bosque templado', 'Tundra', 'Pradera', 'Manglar'];
  const handleBiomaSelection = (selected) => {
    handleChipSelection(selected, setSelectedBioma, selectedBioma);
  };
  const biomaChips = renderCategoryChips('Bioma', biomaChipsData, selectedBioma, handleBiomaSelection);

  // Categoría: Clima
  const climaChipsData = ['Tropical', 'Subtropical', 'Árido', 'Húmedo', 'Templado', 'Frío', 'Continental', 'Mediterráneo'];
  const handleClimaSelection = (selected) => {
    handleChipSelection(selected, setSelectedClima, selectedClima);
  };
  const climaChips = renderCategoryChips('Clima', climaChipsData, selectedClima, handleClimaSelection);
  // Categoría: Temporadas
  const temporadasChipsData = ['Alta temporada', 'Baja temporada', 'Temporada seca', 'Temporada de lluvias', 'Temporada de nieve'];
  const handleTemporadasSelection = (selected) => {
    handleChipSelection(selected, setSelectedTemporadas, selectedTemporadas);
  };
  const temporadasChips = renderCategoryChips('Temporadas', temporadasChipsData, selectedTemporadas, handleTemporadasSelection);

  // Categoría: Atracciones turísticas
  const atraccionesChipsData = ['Monumentos históricos', 'Museos', 'Parques nacionales', 'Playas', 'Cascadas', 'Montañas', 'Sitios arqueológicos'];
  const handleAtraccionesSelection = (selected) => {
    handleChipSelection(selected, setSelectedAtracciones, selectedAtracciones);
  };
  const atraccionesChips = renderCategoryChips('Atracciones turísticas', atraccionesChipsData, selectedAtracciones, handleAtraccionesSelection);

  // Categoría: Cultura local
  const culturaChipsData = ['Tradiciones', 'Festivales', 'Gastronomía', 'Música', 'Danzas típicas', 'Artesanías', 'Arquitectura'];
  const handleCulturaSelection = (selected) => {
    handleChipSelection(selected, setSelectedCultura, selectedCultura);
  };
  const culturaChips = renderCategoryChips('Cultura local', culturaChipsData, selectedCultura, handleCulturaSelection);

  // Categoría: Historia
  const historiaChipsData = [
    'Antigüedad del lugar',
    'Eventos históricos importantes',
    'Sitios históricos',
    'Patrimonio cultural',
  ];
  const handleHistoriaSelection = (selected) => {
    handleChipSelection(selected, setSelectedHistoria, selectedHistoria);
  };
  const historiaChips = renderCategoryChips('Historia', historiaChipsData, selectedHistoria, handleHistoriaSelection);

  // Categoría: Gastronomía
  const gastronomiaChipsData = [
    'Platos típicos',
    'Restaurantes tradicionales',
    'Opciones vegetarianas/veganas',
    'Influencias culinarias',
  ];
  const handleGastronomiaSelection = (selected) => {
    handleChipSelection(selected, setSelectedGastronomia, selectedGastronomia);
  };
  const gastronomiaChips = renderCategoryChips('Gastronomía', gastronomiaChipsData, selectedGastronomia, handleGastronomiaSelection);

  // Categoría: Belleza natural
  const bellezaChipsData = [
    'Paisajes impresionantes',
    'Vistas panorámicas',
    'Costas escarpadas',
    'Montañas majestuosas',
    'Ríos',
    'Lagos',
  ];
  const handleBellezaSelection = (selected) => {
    handleChipSelection(selected, setSelectedBelleza, selectedBelleza);
  };
  const bellezaChips = renderCategoryChips('Belleza natural', bellezaChipsData, selectedBelleza, handleBellezaSelection);
  // Categoría: Biodiversidad
  const biodiversidadChipsData = ['Especies endémicas', 'Hábitats naturales', 'Conservación', 'Áreas protegidas'];
  const handleBiodiversidadSelection = (selected) => {
    handleChipSelection(selected, setSelectedBiodiversidad, selectedBiodiversidad);
  };
  const biodiversidadChips = renderCategoryChips('Biodiversidad', biodiversidadChipsData, selectedBiodiversidad, handleBiodiversidadSelection);

  // Categoría: Actividades
  const actividadesChipsData = ['Senderismo', 'Observación de aves', 'Buceo', 'Pesca', 'Deportes acuáticos', 'Excursiones'];
  const handleActividadesSelection = (selected) => {
    handleChipSelection(selected, setSelectedActividades, selectedActividades);
  };
  const actividadesChips = renderCategoryChips('Actividades', actividadesChipsData, selectedActividades, handleActividadesSelection);

  // Categoría: Infraestructura
  const infraestructuraChipsData = ['Alojamiento', 'Transporte', 'Restaurantes', 'Servicios turísticos'];
  const handleInfraestructuraSelection = (selected) => {
    handleChipSelection(selected, setSelectedInfraestructura, selectedInfraestructura);
  };
  const infraestructuraChips = renderCategoryChips('Infraestructura', infraestructuraChipsData, selectedInfraestructura, handleInfraestructuraSelection);

  // Categoría: Actividades Culturales
  const actividadesCulturalesChipsData = ['Festivales', 'Eventos culturales', 'Artes escénicas', 'Exposiciones', 'Talleres'];
  const handleActividadesCulturalesSelection = (selected) => {
    handleChipSelection(selected, setSelectedActividadesCulturales, selectedActividadesCulturales);
  };
  const actividadesCulturalesChips = renderCategoryChips('Actividades Culturales', actividadesCulturalesChipsData, selectedActividadesCulturales, handleActividadesCulturalesSelection);
  //end of preferencias 

  const showSexModal = () => setSexModalVisible(true);
  const hideSexModal = () => setSexModalVisible(false);

  const showDateModal = () => setDateModalVisible(true);
  const hideDateModal = () => setDateModalVisible(false);

  const showDatePicker = () => setDatePickerVisible(true);
  const hideDatePicker = () => setDatePickerVisible(false);

  const handleDateChange = (event, date) => {
    if (date) {
      setFechaNacimiento(date);
    }
    hideDatePicker();
  };


  const handleGenderSelect = (gender) => {
    setSexo(gender);
    hideSexModal()
  }
    ;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = async () => {
    const result = await onRegister(email, password);
    if (result && result.error) {
      alert(result.msg);
    };
  }

  const pickProfilePicture = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.granted === false) {
        alert('Permission to access the camera roll is required!');
        return;
      }

      const imageResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!imageResult.canceled) {
        setProfilePicture(imageResult.uri);
      }
    } catch (error) {
      console.log('Error picking profile picture:', error);
    }
  };


 

  const FirstStep = () => {
    return (
      <ImageBackground
        source={require('../../../assets/Img/LoginScreenBkg.jpg')}
        resizeMode='cover'
        style={styles.backgroundImage}
      >
        <View style={styles.overlay} >
          <View style={styles.container} >
            <Text style={styles.appName} variant='titleLarge'>Laraventur</Text>
            <Text style={styles.footerText}>Datos de cuenta </Text>
            <TextInput
              style={styles.inputContainer}
              label="Nombre"
              value={nombre}
              onChangeText={text => setNombre(text)}
              activeUnderlineColor='purple'
            />
            <TextInput
              style={styles.inputContainer}
              label="Apellido"
              value={apellido}
              onChangeText={text => setApellido(text)}
              activeUnderlineColor='purple'
            />
            <TextInput
              style={styles.inputContainer}
              label="Email"
              placeholder='Soyun@ejemplo.com'
              value={email}
              onChangeText={text => setEmail(text)}
              activeUnderlineColor='purple'
              keyboardType='email-address'
            />
            <TextInput
              style={styles.inputContainer}

              label="Contraseña"
              placeholder='Ejemplo'

              value={password}
              onChangeText={text => setPassword(text)}
              activeUnderlineColor='purple'
              secureTextEntry={!showPassword}
              right={<TextInput.Icon onPress={togglePasswordVisibility} icon={showPassword ? "eye-off" : "eye"} />}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Button
                icon="login"

                mode='contained'
                onPress={() => navigation.navigate("Login")}
                style={{ marginBottom: 15, flex: 1, marginLeft: 10 }}
              >
                Inicia sesion
              </Button>
              <Button
                icon="arrow-right-bold"
                mode='contained'
                onPress={() => navigation.navigate("Second")}
                style={{ marginBottom: 15, flex: 1, marginRight: 10 }}
              >
                Siguiente paso
              </Button>
            </View>
          </View>
        </View>
      </ImageBackground>
    )
  }

  const SecondStep = () => {
    return (
      <ImageBackground
        source={require('../../../assets/Img/LoginScreenBkg.jpg')}
        resizeMode='cover'
        style={styles.backgroundImage}
      >
        <View style={styles.overlay} >
          <View style={styles.container} >
            <Text style={styles.appName} variant='titleLarge'>Laraventur</Text>
            <Text style={styles.footerText}>Datos personales </Text>
            <TextInput
              style={styles.inputContainer}
              label="Dirección"
              value={direccion}
              onChangeText={text => setDireccion(text)}
              activeUnderlineColor='purple'
            />
            <TextInput
              style={styles.inputContainer}
              label="Telefono"
              value={telefono}
              onChangeText={text => setTelefono(text)}
              activeUnderlineColor='purple'
              keyboardType='phone-pad'
            />


            <Button
              mode='contained'
              style={{ marginBottom: 15 }}
              onPress={showSexModal}
              icon={"format-list-bulleted"}
            >
              {sexo ? `Genero Seleccionado: ${sexo}` : 'Seleccionar Genero'}
            </Button>

            <Button
              mode='contained'
              style={{ marginBottom: 15 }}
              onPress={showDatePicker}
              icon={"calendar"}
            >
              {fechaNacimiento ? `Fecha: ${fechaNacimiento.getDate()}/${fechaNacimiento.getMonth() + 1}/${fechaNacimiento.getFullYear()}` : 'Seleccionar fecha de nacimiento'}
            </Button>

            <Button
              mode="contained"
              onPress={pickProfilePicture}
              style={{ marginBottom: 15 }}
              icon={"camera"}>
              Select Profile Picture
            </Button>

            {profilePicture ? (
              <Avatar.Image source={{ uri: profilePicture }} size={100} style={{ alignSelf: "center", marginBottom: 15 }} />
            ) : (
              <Avatar.Icon icon="account" size={100} style={{ alignSelf: "center", marginBottom: 15 }} />
            )}

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Button
                icon="arrow-left-bold"
                mode='contained'
                onPress={() => navigation.navigate("First")}
                style={{ marginBottom: 15, flex: 1, marginRight: 10 }}
              >
                Paso anterior
              </Button>
              <Button
                icon="arrow-right-bold"

                mode='contained'
                onPress={() => navigation.navigate("Third")}
                style={{ marginBottom: 15, flex: 1, marginLeft: 10 }}
              >
                Siguiente paso
              </Button>
            </View>
          </View>
        </View>
      </ImageBackground>
    )
  }

  const ThirdStep = () => {
    return (

      <ImageBackground
        source={require('../../../assets/Img/LoginScreenBkg.jpg')}
        resizeMode='cover'
        style={styles.backgroundImage}
      >
        <View style={styles.overlay} >
          <ScrollView keyboardShouldPersistTaps="always" >
            <View style={styles.container} >
              <Text style={styles.appName} variant='titleLarge'>Laraventur</Text>
              <Text style={styles.footerText}>Preferencias </Text>

              <Divider></Divider>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>

                {biomaChips}
                {climaChips}
                {temporadasChips}
                {atraccionesChips}
                {culturaChips}
                {historiaChips}
                {gastronomiaChips}
                {bellezaChips}
                {biodiversidadChips}
                {actividadesChips}
                {infraestructuraChips}
                {actividadesCulturalesChips}

              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Button
                  icon="arrow-left-bold"
                  mode='contained'
                  onPress={() => navigation.navigate("Second")}
                  style={{ marginBottom: 15, flex: 1, marginRight: 10 }}
                >
                  Paso anterior
                </Button>
                <Button
                  icon="account-check"

                  mode='contained'
                  onPress={handleRegister}
                  style={{ marginBottom: 15, flex: 1, marginLeft: 10 }}
                >
                  Registrate!
                </Button>
              </View>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    )
  }
  return (
    <Provider>
      <StatusBar translucent />
      <Tab.Navigator initialRouteName='First'

        screenOptions={{
          swipeEnabled: false,
          tabBarStyle: { marginTop: StatusBar.currentHeight }
        }}
      >
        <Tab.Screen name="First" component={FirstStep}
          options={{
            title: "Informacion de cuenta"
          }}></Tab.Screen>
        <Tab.Screen name="Second" component={SecondStep}
          options={{
            title: "Informacion personal"
          }}></Tab.Screen>
        <Tab.Screen name="Third" component={ThirdStep}
          options={{
            title: "Preferencias"
          }}></Tab.Screen>
      </Tab.Navigator>
      <Portal>
        <Modal visible={sexModalVisible} onDismiss={hideSexModal} contentContainerStyle={styles.modalContainer}>
          <Text style={styles.modalTitle}>Selecciona tu genero:</Text>
          <RadioButton.Group onValueChange={handleGenderSelect} value={sexo}>
            <RadioButton.Item label="Masculino" value="Masculino" />
            <RadioButton.Item label="Femenino" value="Femenino " />
            <RadioButton.Item label="Otro" value="Otro" />
          </RadioButton.Group>
          <Button onPress={hideSexModal}>Cerrar</Button>
        </Modal>
        <Modal visible={dateModalVisible} onDismiss={hideDateModal} contentContainerStyle={styles.modalContainer}>
          <Button onPress={showDatePicker}>Open Date Picker</Button>
          {/* Additional modals and their contents */}
        </Modal>
        <Modal visible={datePickerVisible} onDismiss={hideDatePicker} contentContainerStyle={styles.modalContainer}>
          <DateTimePicker
            value={fechaNacimiento}
            mode="date"
            display="spinner"
            onChange={handleDateChange}
          />
          <Button onPress={hideDatePicker}>Done</Button>
        </Modal>
      </Portal>
    </Provider>
  );
};

export default SignupScreen;
