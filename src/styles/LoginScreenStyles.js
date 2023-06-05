import { StyleSheet } from 'react-native';

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
    color: '#007BFF',
    fontWeight: 'bold',
  },
});
