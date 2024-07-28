import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ImageBackground, Image, ScrollView, Alert } from 'react-native';
import { getAuth, updateProfile, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';

const Userchange = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [image, setImage] = useState(null);
  const [currentPassword, setCurrentPassword] = useState(''); // Para la reautenticación

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setUsername(user.displayName || '');
      setImage(user.photoURL || null);
    }
  }, [user]);

  const handleSave = async () => {
    if (!user) return;

    try {
      // Reautenticación
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);

      // Actualizar perfil
      await updateProfile(user, {
        displayName: username,
        photoURL: image,
      });
      console.log('Profile updated successfully');

      // Actualizar contraseña si se proporciona una nueva
      if (newPassword) {
        await updatePassword(user, newPassword);
        console.log('Password updated successfully');
      }

      navigation.goBack(); // Navegar de regreso a la pantalla anterior

    } catch (error) {
      console.error('Error updating profile or password:', error);
      Alert.alert('Error', 'No se pudo actualizar la información. Asegúrate de haber ingresado la contraseña actual correctamente.');
    }
  };

  return (
    <ImageBackground
      source={require('./assets/nose.jpeg')}
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.overlay}>
          <View style={styles.container}>
            <Image
              style={styles.imageuser}
              source={image ? { uri: image } : require('./assets/nose.jpeg')}
            />
            <Text style={styles.label}>Username:</Text>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              placeholder="Enter your username"
            />
            <Text style={styles.label}>Email:</Text>
            <TextInput
              style={styles.input}
              value={email}
              editable={false} // No permitir editar el email
            />
            <Text style={styles.label}>Current Password:</Text>
            <TextInput
              style={styles.input}
              value={currentPassword}
              onChangeText={setCurrentPassword}
              secureTextEntry={true} // Para ocultar la contraseña
              placeholder="Enter your current password"
            />
            <Text style={styles.label}>New Password:</Text>
            <TextInput
              style={styles.input}
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry={true} // Para ocultar la contraseña
              placeholder="Enter new password"
            />
            <View style={styles.buttonContainer}>
              <Button title="Save Changes" onPress={handleSave} color="#365e32" />
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Userchange;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
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
    minHeight: 450,
    backgroundColor: '#81a263',
    width: 300,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageuser: {
    height: 150,
    width: 150,
    borderRadius: 70,
    marginBottom: 20,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '100%',
    backgroundColor: '#fff',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
  },
});
