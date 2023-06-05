import { StyleSheet } from 'react-native';
import colors from '../utils/ColorScheme';

const styles = StyleSheet.create({
  container: {},
  welcomeContainer: {
    backgroundColor: colors.Cambridge,
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
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
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: colors.OffWhite,
    padding: 10,
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
    marginTop: 40,
  },
  carouselTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 10,
  },
});

export default styles;
