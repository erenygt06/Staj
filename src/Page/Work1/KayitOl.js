import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
const windowWidth = Dimensions.get('window').width;
const KayitOl = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurunuz.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Hata', 'Şifreler eşleşmiyor.');
      return;
    }

    setLoading(true);

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert('Başarılı', 'Kayıt başarılı!');
        navigation.navigate('Sayfa1'); // Kayıt başarılı olunca giriş ekranına yönlendir
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('Hata', 'Bu e-posta adresi zaten kullanılıyor.');
        }

        if (error.code === 'auth/invalid-email') {
          Alert.alert('Hata', 'Geçersiz e-posta adresi.');
        }

        if (error.code === 'auth/weak-password') {
          Alert.alert('Hata', 'Şifre çok zayıf.');
        }

        console.error(error);
      })
      .finally(() => setLoading(false));
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Kayıt Ol</Text>
      </View>
      <TextInput
        placeholder="E-posta"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Şifre"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <TextInput
        placeholder="Şifreyi Onayla"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={styles.input}
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSignUp}
        disabled={loading}>
        <View style={styles.vieww}>
          <Text style={styles.buttonText}>
            {loading ? 'Kayıt Oluyor...' : 'Kayıt Ol'}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#332B5A',
  },
  title: {
    color: 'white',
    fontSize: windowWidth * 0.15,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: '800',
  },
  input: {
    marginTop: windowWidth * 0.03,
    width: windowWidth * 0.8,
    height: windowWidth * 0.15,
    borderWidth: 3,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    color: 'white',
  },
  vieww: {
    marginTop: windowWidth * 0.03,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 3,
    borderColor: '#ccc',
    width: windowWidth * 0.5,
    height: windowWidth * 0.15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default KayitOl;
