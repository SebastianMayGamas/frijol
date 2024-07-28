import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native';
import React from 'react';
import { Button } from 'react-native-paper';
import { getAuth } from 'firebase/auth';

export default function User({ navigation }) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [image, setImage] = React.useState(null);

  React.useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setEmail(user.email);
      setName(user.displayName || 'No username'); // Asegurarse de que displayName esté configurado
      setImage(user.photoURL || null); // Asumiendo que tienes una propiedad photoURL
    }
  }, []);

  function handleChange() {
    navigation.navigate('UserChange'); // Asumiendo que tienes una pantalla UserChange
  }

  return (
    <ImageBackground
      source={require('./assets/nose.jpeg')}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Image
            style={styles.imageuser}
            source={image ? { uri: image } : require('./assets/nose.jpeg')}
          />
          <Text style={styles.userInfo}>
            Username: {name}
          </Text>
          <Text style={styles.userInfo}>
            E-mail: {email}
          </Text>
          <Button
            icon="account-edit"
            buttonColor="#365e32"
            textColor="#81a263"
            onPress={handleChange}
            mode="contained"
            style={styles.button}
          >
            Editar usuario
          </Button>
        </View>
      </View>
    </ImageBackground>
  );
}

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
    alignItems: 'center',
    justifyContent: 'center', // Asegura que el contenido esté centrado verticalmente
  },
  imageuser: {
    height: 150,
    width: 150,
    borderRadius: 75, // Asegura que la imagen sea redonda
    marginBottom: 20,
  },
  userInfo: {
    fontSize: 20,
    marginBottom: 10,
    color: '#fff', // Asegura que el texto sea visible sobre el fondo
  },
  button: {
    marginTop: 20, // Espacio arriba del botón
    padding: 10, // Asegura un buen tamaño para el botón
  },
});
