import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { Switch } from 'react-native-paper';
import { database, ref, onValue, update } from '../../firebaseConfig'; // Asegúrate de que la ruta sea correcta

const Dash = () => {
  const [autotemperatura, setAutotemperatura] = useState(false);
  const [autohumedad, setAutohumedad] = useState(false);

  useEffect(() => {
    // Crear una referencia a la base de datos
    const dbRef = ref(database, '/invernader');

    // Suscribirse a los cambios en los datos
    const unsubscribe = onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setAutotemperatura(data.ventilado || false);
        setAutohumedad(data.agua || false);
      }
    });

    // Cleanup: cancelar suscripción cuando el componente se desmonte
    return () => {
      // No es necesario llamar a `off` directamente; la función `unsubscribe` se encarga de esto
      unsubscribe();
    };
  }, []);

  const handleSwitchChange = (key, value) => {
    update(ref(database, '/invernader'), { [key]: value })
      .then(() => {
        console.log(`Successfully updated ${key} to ${value}`);
      })
      .catch((error) => {
        console.error(`Error updating ${key}:`, error);
      });
  };

  return (
    <ImageBackground
      style={styles.background}
      source={require('./assets/nose.jpeg')}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View>
            <Text style={styles.title}>Temperatura</Text>
            <Text style={styles.mostrar}>38.8</Text>
          </View>
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Manual control de Temperatura</Text>
            <Switch
              value={autotemperatura}
              onValueChange={() => handleSwitchChange('ventilado', !autotemperatura)}
            />
          </View>

          <View>
            <Text style={styles.title}>Humedad</Text>
            <Text style={styles.mostrar}>38.8</Text>
          </View>
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Manual control de humedad</Text>
            <Switch
              value={autohumedad}
              onValueChange={() => handleSwitchChange('agua', !autohumedad)}
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Dash;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 183, 77, 0.7)', // Fondo con transparencia
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  container: {
    height: 350,
    backgroundColor: '#81a263',
    width: 300,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  mostrar: {
    backgroundColor: '#fff',
    fontSize: 15,
    padding: 5,
    alignItems: 'center',
    width: 130,
    borderRadius: 15,
    alignContent: 'center',
    textAlign: 'center',
    borderColor: '#000000',
    marginBottom: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  switchLabel: {
    fontSize: 16,
  },
});
