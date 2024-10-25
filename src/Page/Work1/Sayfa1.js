import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Sayfa1 = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurunuz.');
      return;
    }

    setLoading(true);

    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert('Başarılı', 'Giriş başarılı!');
        navigation.navigate('Anasayfa'); // Giriş başarılı olduğunda Anasayfa'ya yönlendir
      })
      .catch(error => {
        Alert.alert('Hata', 'Giriş sırasında bir hata oluştu.');
        console.error(error);
      })
      .finally(() => setLoading(false));
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../Assets/talk.png')} // Resmi yerel dosyadan göster
        style={styles.image}
      />
      <Text style={styles.title}>Talk</Text>
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

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}>
        <View style={styles.vieww}>
          <Text style={styles.buttonText}>
            {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
          </Text>
        </View>
      </TouchableOpacity>
      <Text
        style={styles.signupText}
        onPress={() => navigation.navigate('KayitOl')}>
        Hesabınız yok mu? Kayıt Ol
      </Text>
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
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: 'white',
    fontSize: windowWidth * 0.1,
    fontWeight: '900',
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
  signupText: {
    marginTop: 20,
    color: 'white',
    textAlign: 'center',
  },
  image: {
    width: windowWidth * 0.5,
    height: windowWidth * 0.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  vieww: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 3,
    borderColor: '#ccc',
    width: windowWidth * 0.5,
    height: windowWidth * 0.15,
  },
});

export default Sayfa1;
