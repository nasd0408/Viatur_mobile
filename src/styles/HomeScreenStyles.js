import { Dimensions, StyleSheet } from 'react-native';
import colors from '../utils/ColorScheme';

const styles = StyleSheet.create({
  container: {},
  welcomeContainer: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    height: Dimensions.get('window').height - 100,
    justifyContent:'center'
  },
  title: {
    fontWeight: 'bold',
    color: colors.OffWhite,
    marginTop: 20,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: colors.OffWhite,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: colors.OffWhite,
    textAlign: 'center',
    lineHeight: 22,
  },
  comoViajarContainer: {
    backgroundColor: colors.OffWhite,
    padding: 30,
    borderRadius: 8,
  },
  comoViajarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  comoViajarDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  comoViajarStep: {
    fontSize: 16,
    marginBottom: 8,
  },
  carouselContainer: {
    paddingTop: 10,
    backgroundColor:colors.Cambridge,
  },
  carouselTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 10,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the opacity and color as needed
  },
});

export default styles;
