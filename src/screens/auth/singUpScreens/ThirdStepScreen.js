import React, { useState, useEffect } from 'react';
import { View, ImageBackground } from 'react-native';
import styles from '../../../styles/LoginScreenStyles';
import { Button, Text, Chip, Divider } from 'react-native-paper';
import { useAuth } from '../../../context/AuthContext';
import { ScrollView } from 'react-native-gesture-handler';
import { useSignupContext } from '../../../context/SignUpContext';
import { API_BASE_URL } from '../../../utils/dev';
import axios from 'axios';


const ThirdStepScreen = ({ navigation }) => {
  const { onRegister } = useAuth();
  const { formData, setFormData } = useSignupContext(); // Obtiene los datos del contexto


  //Preferencias
  const [selectedBelleza, setSelectedBelleza] = useState();
  const [selectedBioma, setSelectedBioma] = useState();
  const [selectedClima, setSelectedClima] = useState();
  const [selectedCultura, setSelectedCultura] = useState();
  const [selectedBiodiversidad, setSelectedBiodiversidad] = useState();
  const [selectedGastronomia, setSelectedGastronomia] = useState();
  const [selectedTemporadas, setSelectedTemporadas] = useState();

  const [selectedActividadesCulturales, setSelectedActividadesCulturales] = useState();
  const [selectedActividadesTuristicas, setSelectedActividadesTuristicas] = useState()
  const [selectedAreaGeografica, setselectedAreaGeografica] = useState()
  const [selectedInfraestructura, setSelectedInfraestructura] = useState();
  const [selectedTipoServicioProd, setselectedTipoServicioProd] = useState()
  const [selectedCategoria, setselectedCategoria] = useState()
  //
  const [bellezaChipsData, setBellezaChipsData] = useState([])
  const [biomaChipsData, setBiomaChipsData] = useState([])
  const [climaChipsData, setClimaChipsData] = useState([])
  const [culturaChipsData, setCulturaChipsData] = useState([])
  const [biodiversidadChipsData, setBiodiversidadChipsData] = useState([])
  const [gastronomiaChipsData, setGastronomiaChipsData] = useState([])
  const [temporadasChipsData, setTemporadasChipsData] = useState([])

  const [actividadesCulturalesChipsData, setActividadesCulturalesChipsData] = useState([])
  const [actividadesTuristicasChipsData, setActividadesTuristicasChipsData] = useState([])
  const [areaGeograficaChipsData, setAreaGeograficaChipsData] = useState([])
  const [infraestructuraChipsData, setInfraestructuraChipsData] = useState([])
  const [tipoServicioProdChipsData, setTipoServicioProdChipsData] = useState([])
  const [categoriaChipsData, setCategoriaChipsData] = useState([])


  const renderCategoryChips = (categoryName, chipsData, selectedState, setSelectedState) => {
    return (
      <View>
        <Text style={styles.categoryName}>{categoryName}</Text>
        <View style={styles.chipsContainer}>
          {chipsData.map((chip) => (
            <Chip
              key={chip.id}
              style={styles.chip}
              onPress={() => handleChipSelection(chip.id, setSelectedState)}
              selected={selectedState === chip.id} // Use strict comparison for selectedState
            >
              {chip.descripcion} {/* Render the descripcion property */}
            </Chip>
          ))}
        </View>
        <Divider style={styles.divider} />
      </View>
    );
  };
  
  // Define the Axios function to fetch category data
  async function fetchCategoryData(categoryName, setSelectedCategory) {
    try {
      const response = await axios.get(`${API_BASE_URL}/${categoryName}`);
      const descriptions = response.data.data.map((item) => ({
        descripcion: item.descripcion,
        id: item.id,
      }));
      setSelectedCategory(descriptions)
      
    } catch (error) {
      console.error(`Error fetching ${categoryName}:`, error);
    }
  }
  // ...

  // UseEffect to fetch data when the component mounts
  useEffect(() => {
    fetchCategoryData('biomas', setBiomaChipsData);
    fetchCategoryData('climas', setClimaChipsData);
    fetchCategoryData('temporada', setTemporadasChipsData);
    fetchCategoryData('diversidad', setBiodiversidadChipsData);
    fetchCategoryData('gastronomia', setGastronomiaChipsData);
    fetchCategoryData('belleza-natural', setBellezaChipsData);
    fetchCategoryData('cultura-local', setCulturaChipsData);

    fetchCategoryData('tipo-prod-servs', setTipoServicioProdChipsData);
    fetchCategoryData('infraestructuras-turisticas', setInfraestructuraChipsData);
    fetchCategoryData('actividades-turisticas', setActividadesTuristicasChipsData);
    fetchCategoryData('area-geografica', setAreaGeograficaChipsData);
    fetchCategoryData('categorias', setCategoriaChipsData);
    fetchCategoryData('actividades-culturales', setActividadesCulturalesChipsData);
  }, []);

  const handleChipSelection = (selectedItem, setSelectedItem) => {
    setSelectedItem(selectedItem);
  };

  const handleRegister = async () => {
    setFormData("bioma",selectedBioma||null)
    setFormData("clima", selectedClima)
    setFormData("gastronomia",selectedGastronomia)
    setFormData("bellezaNatural", selectedBelleza)
    setFormData("culturaLocal",selectedCultura)
    setFormData("diversidad",selectedBiodiversidad)
    setFormData("temporada",selectedTemporadas)
    setFormData("areaGeografica",selectedAreaGeografica)
    setFormData("categoria", selectedCategoria)
    setFormData("tipoProdServ",selectedTipoServicioProd)
    setFormData("actividadTuristica",selectedActividadesTuristicas)
    setFormData("infraestructuraTuristica",selectedInfraestructura)
    setFormData("actividadCultural", selectedActividadesCulturales)
    //everything else
    try {
      const result = await onRegister(formData);

      if (result && result.error) {
        console.error('Registration error:', result.msg || 'Unknown error');
      } else {
        console.log('Registration successful');
        navigation.navigate('Login');
      }
    } catch (error) {
      console.error('Error during registration:', error.message || 'Unknown error');
    }
  };

  const biomaChips = renderCategoryChips(
    "Cual de estos lugares te llama mas la atencion?",
    biomaChipsData,
    selectedBioma,
    setSelectedBioma
  );
  const climasChips = renderCategoryChips(
    "Si tuvieras que elegir un clima favorito, cual seria?",
    climaChipsData,
    selectedClima,
    setSelectedClima
  )
  const diversidadChips = renderCategoryChips(
    "Con cual de estas opciones te sientes mas comodo?",
    biodiversidadChipsData,
    selectedBiodiversidad,
    setSelectedBiodiversidad
  )
  const gastronomiaChips = renderCategoryChips(
    "Cual es tu comida favorita?",
    gastronomiaChipsData,
    selectedGastronomia,
    setSelectedGastronomia
  )
  const temporadaChips = renderCategoryChips(
    "En que temporada eres mas propenso a hacer turismo",
    temporadasChipsData,
    selectedTemporadas,
    setSelectedTemporadas
  )
  const culturaChips = renderCategoryChips(
    "Cual de estas opciones te interesa mas?",
    culturaChipsData,
    selectedCultura,
    setSelectedCultura
  )
  const bellezaChips = renderCategoryChips(
    "Cual de estas opciones te gustaria visitar proximamente?",
    bellezaChipsData,
    selectedBelleza,
    setSelectedBelleza
  )
  const tipoProdServsChips = renderCategoryChips(
    "Que prefieres que te ofrezcamos?",
    tipoServicioProdChipsData,
    selectedTipoServicioProd,
    setselectedTipoServicioProd
  )
  const infraestructuraChips = renderCategoryChips(
    "Donde te sientes mas comodo?",
    infraestructuraChipsData,
    selectedInfraestructura,
    setSelectedInfraestructura
  )
  const areaGeograficaChips = renderCategoryChips(
    "Que lugar va mas contigo?",
    areaGeograficaChipsData,
    selectedAreaGeografica,
    setselectedAreaGeografica
  )
  const categoriaChips = renderCategoryChips(
    "Que estas buscando en Laraventur?",
    categoriaChipsData,
    selectedCategoria,
    setselectedCategoria
  )
  const actividadesCulturalesChips = renderCategoryChips(
    "Selecciona una actividad de la que te gustaria ser parte",
    actividadesCulturalesChipsData,
    selectedActividadesCulturales,
    setSelectedActividadesCulturales
  )
  const actividadesTuristicasChips = renderCategoryChips(
    "Cuando viajo, quiero: ",
    actividadesTuristicasChipsData,
    selectedActividadesTuristicas,
    setSelectedActividadesTuristicas
  )
 



  return (

    <ImageBackground
      source={require('../../../../assets/Img/LoginScreenBkg.jpg')}
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
              {climasChips}
              {temporadaChips}
              {diversidadChips}
              {gastronomiaChips}
              {culturaChips}
              {bellezaChips}

              {tipoProdServsChips}
              {infraestructuraChips}
              {actividadesTuristicasChips}
              {areaGeograficaChips}
              {categoriaChips}
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

export default ThirdStepScreen
