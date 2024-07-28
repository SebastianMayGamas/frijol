import { StatusBar, View, Text, StyleSheet, ImageBackground, Image, Alert } from 'react-native';
import React from 'react';
import { Button, TextInput } from 'react-native-paper';
import { Auth } from '../../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import navegation from '../navegation/navegation';

const Register = () => {
  // estados
  const [verpw, setVerpw] = React.useState(true);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  // funciones
  const verPass = () => {
    setVerpw(!verpw);
  };

  const handlePress = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    try {
      const createUser = await createUserWithEmailAndPassword(Auth, email, password);
      console.log("Usuario creado:", createUser);
      navegation.navigate(navegation)
    } catch (error) {
      console.error("Error al crear usuario:", error);
      Alert.alert('Error', error.message);
    }

    console.log("Button pressed!");
  };

  return (
    <ImageBackground
      source={require('./assets/nose.jpeg')}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Image
            style={styles.logo}
            source={require('./assets/logofrijol.png')}
          />
          <Text style={styles.title}>Registro</Text>
          <StatusBar style="auto" />

          <View>
            <Text style={styles.label}>Username</Text>
            <TextInput
              mode='outlined'
              style={styles.input}
              placeholder='username'
              value={username}
              onChangeText={setUsername}
              autoCapitalize='none'
            />
          </View>

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
    </ImageBackground>
  );
}

export default Register;

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
    width: 250,
    backgroundColor: 'white',
  },
  label: {
    color: '#365e32',
    marginLeft: 10,
    marginBottom: 5,
  },
  button: {
    marginTop: 5,
    backgroundColor: '#365e32', // Color del botón
    color: '#e7d37f',
    width: 150,
  },
  buttonLabel: {
    color: '#e7d37f',
  },
  logo: {
    width: 250,
    height: 250,
  },
});
