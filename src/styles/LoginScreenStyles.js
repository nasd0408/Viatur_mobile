import { StyleSheet } from 'react-native';
import ColorScheme from '../utils/ColorScheme';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the opacity and color as needed
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    alignSelf:'center',
    color: '#fff', // Text color for better visibility on top of the image
  },
  
  inputContainer: {
    marginBottom: 15,
  },
  button: {
    marginTop: 20,
    
  },
  footer: {
    marginTop: 20,
  },
  footerText: {
    textAlign: 'center',

    marginBottom: 10,
    color: '#fff', // Adjust the text color for better visibility
  },
  link: {
    color: ColorScheme.OffWhite,
    fontWeight: 'bold',
    textDecorationStyle:'dashed',
    textDecorationLine:'underline'
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chipGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  chip: {
    margin: 4,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginLeft: 16,
    color:ColorScheme.OffWhite
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    marginLeft: 16,
    marginRight: 16,
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
  },
  divider: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
});
