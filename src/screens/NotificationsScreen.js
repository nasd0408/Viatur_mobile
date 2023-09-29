import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Snackbar, Button } from 'react-native-paper';

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState([ {
    id: 1,
    message: 'Nueva actualización disponible',
  },
  {
    id: 2,
    message: 'Tu comentario ha sido respondido',
  },
  {
    id: 3,
    message: 'Descuento del 20% en productos seleccionados',
  },
  {
    id: 4,
    message: '¡Felicidades! Has ganado un premio',
  },
  {
    id: 5,
    message: 'Evento especial mañana a las 7 PM',
  },
  {
    id: 6,
    message: 'Recordatorio: Reunión importante a las 3 PM',
  },
  {
    id: 7,
    message: 'Nueva oferta exclusiva para suscriptores',
  },]);
  const [visible, setVisible] = useState(false);

  const showNotification = () => {
    const newNotification = {
      id: notifications.length + 1,
      message: `Notificación ${notifications.length + 1}`,
    };
    setNotifications([...notifications, newNotification]);
    setVisible(true);
  };

  const hideNotification = () => {
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      <Button onPress={showNotification}>Agregar Notificación</Button>
      <List.Section>
        <List.Subheader>Notificaciones</List.Subheader>
        {notifications.map((notification) => (
          <List.Item
            key={notification.id}
            title={notification.message}
            description="Detalles de la notificación"
            left={() => <List.Icon icon="bell" />}
          />
        ))}
      </List.Section>
      <Snackbar
        visible={visible}
        onDismiss={hideNotification}
        action={{
          label: 'Cerrar',
          onPress: hideNotification,
        }}
      >
        Notificación agregada
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default NotificationsScreen;
