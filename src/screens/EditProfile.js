import React from 'react';
import {View, StyleSheet, ScrollView, Text, TextInput, Image, TouchableOpacity} from 'react-native';
import {FormBuilder} from 'react-native-paper-form-builder';
import {useForm} from 'react-hook-form';
import {Button} from 'react-native-paper';
import {ProfileScreen} from './ProfileScreen'
import { user } from "../utils/dev";
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import CustomDatePicker from '../components/shared/CustomDatePicker';

function EditProfile({navigation}) {
  const {control, setFocus, handleSubmit, props} = useForm({
    defaultValues: {
      email: '',
      password: '',
      NewPassword: '',
      name: '',
      last: '',
      address: '',
      gender: '',
      phoneNumber: '',
    },
    mode: 'onChange',
  });
  
  const handleBackProfile = () => {
    navigation.navigate('Profile');
  }

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContentContainer}>
    <View style={styles.containerStyle}>
      <ScrollView contentContainerStyle={styles.scrollViewStyle}>
      <Image style={styles.profileImage} source={{ uri: user.FotoDePerfil }} />
        <Text style={styles.headingStyle}>Editar Perfil</Text>
        <FormBuilder
          control={control}
          setFocus={setFocus}
          formConfigArray={[
            {
              type: 'text',
              name: 'name',

              rules: {
                required: {
                  value: true,
                  message: 'name is required',
                },
              },
              textInputProps: {
                label: 'name',
              },
            },
            {
              type: 'text',
              name: 'address',

              rules: {
                required: {
                  value: true,
                  message: 'Address is required',
                },
              },
              textInputProps: {
                label: 'Address',
              },
            },
            {
              name: 'rememberMe',
              type: 'custom',
              JSX: CustomDatePicker,
            },
            {
              type: 'text',
              name: 'phoneNumber',
              rules: {
                required: {
                  value: true,
                  message: 'Phone Number is required',
                },
                pattern: {
                  value: /^[0-9]+$/,
                  message: 'Phone Number should contain only numbers',
                },
              },
              textInputProps: {
                label: 'Phone Number',
              },
            },            
            {
              name: 'gender',
              type: 'select',
              textInputProps: {
                label: 'Gender',
               label: <Ionicons name="chevron-down-outline" size={18} color={colors.black}> Gender </Ionicons>,
              },
              rules: {
                required: {
                  value: true,
                  message: 'Gender is required',
                },
              },
              options: [
                {
                  value: 0,
                  label: 'Female',
                },
                {
                  value: 1,
                  label: 'Male',
                },
                {
                  value: 2,
                  label: 'Others',
                },
              ],
            },
            {
              type: 'text',
              name: 'last',

              rules: {
                required: {
                  value: true,
                  message: 'Last name is required',
                },
              },
              textInputProps: {
                label: 'Last name',
              },
            },
            {
              type: 'password',
              name: 'Newpassword',

              rules: {
                required: {
                  value: true,
                  message: 'New Password is required',
                },
              },
              textInputProps: {
                label: 'password',
              },
            },
            {
              type: 'password',
              name: 'password',
              rules: {
                required: {
                  value: true,
                  message: 'Password is required',
                },
              },
              textInputProps: {
                label: 'New Password',
              },
            },
          ]}
        />
         <View style={styles.buttonContainer}>
        <TouchableOpacity  style={styles.editSubmit}
          mode={'contained'}
          onPress={handleSubmit}>
         <Text style={styles.editButtonText}>Submit</Text> 
       </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.editButton} onPress={handleBackProfile}>
          <Text style={styles.editButtonText}>Back Profile</Text>
      </TouchableOpacity>
      </View>
      </ScrollView>
    </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  contained: {
    backgroundColor: colors.Primary
  },
  buttonContainer: {
    marginTop: 0,
    alignItems: "center",
    marginBottom: 5,
  },
  editSubmit: {
    backgroundColor: colors.Primary,
    paddingVertical: 10,
    paddingHorizontal: 90,
    borderRadius: 5,
    marginTop: 5
  },
  editButton: {
    backgroundColor: colors.Primary,
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 5,
    marginTop: 5
  },
  editButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  containerStyle: {
    flex: 1,
  },
  scrollViewStyle: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
  },
  headingStyle: {
    backgroundColor: colors.Primary,
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 40,
    color: "#fff",
    borderRadius: 5,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    marginLeft: 90
  },
});

export default EditProfile;