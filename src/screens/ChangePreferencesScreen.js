import { StyleSheet, View } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { Button, Chip, Divider, Text, Portal, Snackbar, Title } from 'react-native-paper';
import axios from 'axios';
import { API_BASE_URL } from '../utils/dev';
import { useEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import styles from '../styles/LoginScreenStyles'
import ColorScheme from '../utils/ColorScheme';
import { AlgoritmoContext } from '../context/AlgoritmoContext';
import { useContext } from 'react';

const ChangePreferencesScreen = ({navigation}) => {
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


  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false)
  const [isloadingFetch, setIsloadingFetch] = useState(false)

  const {fetchAlgoritmo} = useContext(AlgoritmoContext)
  const renderCategoryChips = (categoryName, chipsData, selectedState, setSelectedState) => {
    return (
      <View>
        <Text style={styles.categoryName}>{categoryName}</Text>
        <View style={styles.chipsContainer}>
          {chipsData.map((chip) => (
            <Chip
             rippleColor={ColorScheme.Verdigris}
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
  useEffect(() => {
    const fetchUserPreferences = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/preferencias/mis-preferencias`);
        const userPreferences = response.data.data;
  
        // Actualiza los estados con las preferencias del usuario
        setSelectedBioma(userPreferences.bioma?.id || null);
        setSelectedClima(userPreferences.clima?.id || null);
        setSelectedGastronomia(userPreferences.gastronomia?.id || null);
        setSelectedBelleza(userPreferences.bellezaNatural?.id || null);
        setSelectedCultura(userPreferences.culturaLocal?.id || null);
        setSelectedBiodiversidad(userPreferences.diversidad?.id || null);
        setSelectedTemporadas(userPreferences.temporada?.id || null);
        setselectedAreaGeografica(userPreferences.areaGeografica?.id || null);
        setselectedCategoria(userPreferences.categoria?.id || null);
        setselectedTipoServicioProd(userPreferences.tipoProdServ?.id || null);
        setSelectedActividadesTuristicas(userPreferences.actividadTuristica?.id || null);
        setSelectedInfraestructura(userPreferences.infraestructuraTuristica?.id || null);
        setSelectedActividadesCulturales(userPreferences.actividadCultural?.id || null);
      } catch (error) {
        console.error('Error fetching user preferences:', error);
      }
    };
  
    fetchUserPreferences();
  }, []);
  
  const handleChipSelection = (selectedItem, setSelectedItem) => {
    setSelectedItem(selectedItem);
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
 
  const handleSubmit = async () => {
    // Crea un objeto con las preferencias seleccionadas
    setIsLoadingSubmit(true)
    const selectedPreferences = {
      bioma: selectedBioma || null,
      clima: selectedClima || null,
      gastronomia: selectedGastronomia || null,
      bellezaNatural: selectedBelleza || null,
      culturaLocal: selectedCultura || null,
      diversidad: selectedBiodiversidad || null,
      temporada: selectedTemporadas || null,
      areaGeografica: selectedAreaGeografica || null,
      categoria: selectedCategoria || null,
      tipoProdServ: selectedTipoServicioProd || null,
      actividadTuristica: selectedActividadesTuristicas || null,
      infraestructuraTuristica: selectedInfraestructura || null,
      actividadCultural: selectedActividadesCulturales || null,
    };
    try {
        // Realiza la solicitud PUT para actualizar las preferencias del usuario
        await axios.put(`${API_BASE_URL}/preferencias`, selectedPreferences);
    
        // Muestra una Snackbar de éxito
        setSuccess('Preferencias actualizadas con éxito');
        setIsLoadingSubmit(false)
        fetchAlgoritmo()
      } catch (error) {
        console.error('Error al actualizar las preferencias:', error);
    
        // Muestra una Snackbar de error
        setError('No se pudieron actualizar las preferencias');
      }
    };
    
  


  return (

      <View style={styles.overlay} >
        <ScrollView keyboardShouldPersistTaps="always" >
          <View style={styles.container} >
            <Title style={styles.appName} >Editar preferencias</Title>

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
                onPress={() => navigation.goBack()}
                style={{ marginBottom: 15, flex: 1, marginRight: 10 }}
              >
                Regresar
              </Button>
              <Button
                icon="wrench"
                onPress={handleSubmit}
                mode='contained'
                style={{ marginBottom: 15, flex: 1, marginLeft: 10 }}
                loading={isLoadingSubmit}
              >
                Cambiar!
              </Button>
            </View>
          </View>
        </ScrollView>
        <Portal>
  <Snackbar
    visible={error !== null}
    onDismiss={() => setError(null)}
    action={{
      onPress: () => setError(null),
      icon: 'close',
    }}
    style={{
      backgroundColor: ColorScheme.Primary,
      borderRadius: 10,
      padding: 10,
    }}
  >
    <Text style={{ color: ColorScheme.OffWhite }}>{error}</Text>
  </Snackbar>
  <Snackbar
    visible={success !== null}
    onDismiss={() => setSuccess(null)}
    style={{
      backgroundColor: ColorScheme.Primary,
      borderRadius: 10,
      padding: 10,
    }}
    
  >
    <Text style={{ color: ColorScheme.OffWhite }}>{success}</Text>
  </Snackbar>
</Portal>
      </View>
  )
}


export default ChangePreferencesScreen

