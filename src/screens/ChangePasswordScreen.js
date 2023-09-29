import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput, Snackbar, Text, Portal } from 'react-native-paper';
import axios from 'axios';
import { API_BASE_URL } from '../utils/dev';
import ColorScheme from '../utils/ColorScheme';

const ChangePasswordScreen = ({navigation}) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const handleChangePassword = async () => {
        if (newPassword !== confirmNewPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        setIsLoading(true);
        try {
            await axios.post(`${API_BASE_URL}/auth/change-password`, {
                oldContrasena: currentPassword,
                newContrasena: newPassword
            });
            setSuccess('Contraseña cambiada con éxito');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
            navigation.goBack()
        } catch (err) {
            console.log(err)
            setError('No se pudo cambiar la contraseña. Verifica la contraseña actual.');
        }
        setIsLoading(false);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.inputContainer}
                label="Contraseña actual"
                placeholder="Contraseña actual"
                value={currentPassword}
                onChangeText={(text) => setCurrentPassword(text)}
                secureTextEntry={!showPassword}
                right={
                    <TextInput.Icon
                        name={showPassword ? 'eye-off' : 'eye'}
                        onPress={togglePasswordVisibility}
                    />
                }
            />
            <TextInput
                style={styles.inputContainer}
                label="Nueva contraseña"
                placeholder="Nueva contraseña"
                value={newPassword}
                onChangeText={(text) => setNewPassword(text)}
                secureTextEntry={!showPassword}
                right={
                    <TextInput.Icon
                        name={showPassword ? 'eye-off' : 'eye'}
                        onPress={togglePasswordVisibility}
                    />
                }
            />
            <TextInput
                style={styles.inputContainer}
                label="Confirmar nueva contraseña"
                placeholder="Confirmar nueva contraseña"
                value={confirmNewPassword}
                onChangeText={(text) => setConfirmNewPassword(text)}
                secureTextEntry={!showPassword}
                right={
                    <TextInput.Icon
                        name={showPassword ? 'eye-off' : 'eye'}
                        onPress={togglePasswordVisibility}
                    />
                }
            />
            <Button
                loading={isLoading}
                style={{ marginTop: 10 }}
                onPress={handleChangePassword}
                mode="contained"
                icon={'key'}
            >
                Cambiar Contraseña
            </Button>
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
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    inputContainer: {
        marginBottom: 16,
    },
});

export default ChangePasswordScreen;
