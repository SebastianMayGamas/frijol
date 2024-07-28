import { StatusBar, View, Text, StyleSheet, ImageBackground, Image } from 'react-native';
import React from 'react';
import { Button, TextInput } from 'react-native-paper';
import { Auth } from '../../firebaseConfig'; // Ajusta la ruta a tu archivo de configuración de Firebase
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = ({ navigation }) => {
  // Estados
  const [verpw, setVerpw] = React.useState(true);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  // Funciones
  const verPass = () => {
    setVerpw(!verpw);
  };

  const handlePress = async () => {
    try {
      await signInWithEmailAndPassword(Auth, email, password);
      console.log("Button pressed!");
      navigation.navigate('Navegation'); // Asegúrate de que el nombre de la pantalla coincida
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ImageBackground
      source={require('./assets/nose.jpeg')}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <Image
              style={styles.logo}
              source={require('./assets/logofrijol.png')}
            />
            <Text style={styles.title}>Login</Text>
            <StatusBar style="auto" />

            <View>
              <Text style={styles.label}>Email</Text>
              <TextInput
                mode='outlined'
                style={styles.input}
                placeholder='Email'
                value={email}
                onChangeText={setEmail}
                keyboardType='email-address'
                autoCapitalize='none'
              />
            </View>

            <View>
              <Text style={styles.label}>Contraseña</Text>
              <TextInput
                mode='outlined'
                style={styles.input}
                placeholder='Contraseña'
                value={password}
                onChangeText={setPassword}
                secureTextEntry={verpw}
                autoCapitalize='none'
                right={<TextInput.Icon icon={verpw ? "eye-off" : "eye"} onPress={verPass} />}
              />
            </View>

            <View>
              <Text style={styles.label}>Repetir contraseña</Text>
              <TextInput
                mode='outlined'
                style={styles.input}
                placeholder='Repetir contraseña'
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={verpw}
                autoCapitalize='none'
                right={<TextInput.Icon icon={verpw ? "eye-off" : "eye"} onPress={verPass} />}
              />
            </View>
            
            <View>
              <Text
                style={styles.link}
                onPress={() => navigation.navigate('Registro')}
              >
                No tienes cuenta? Regístrate aquí.
              </Text>
            </View>

            <View>
              <Button
                mode="contained"
                onPress={handlePress}
                style={styles.button}
                labelStyle={styles.buttonLabel}
              >
                Submit
              </Button>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Login;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    alignItems: 'center',
    marginTop: -50, // Ajusta este valor para mover todo el contenido hacia arriba
  },
  title: {
    marginBottom: 10,
    fontSize: 25,
    color: "#365e32",
    textAlign: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 183, 77, 0.7)', // Fondo con transparencia
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  input: {
    marginBottom: 15,
    width: 270,
    backgroundColor: 'white',
    borderRadius: 20
  },
  label: {
    color: '#365e32',
    marginLeft: 10,
    marginBottom: 5,
  },
  button: {
    marginTop: 5,
    alignContent: 'center',
    backgroundColor: '#365e32', // Color del botón
    color: '#e7d37f',
    width: 170,
    padding: 10,
    height: 60
  },
  buttonLabel: {
    color: '#e7d37f',
  },
  logo: {
    width: 250,
    height: 250,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 10,
    marginBottom: 15,
  },
});
