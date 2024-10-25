import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import database from '@react-native-firebase/database';
const windowWidth = Dimensions.get('window').width;
const RoomsScreen = ({navigation}) => {
  const [roomName, setRoomName] = useState('');
  const [rooms, setRooms] = useState([]);

  // Yeni Oda Ekle
  const addRoom = () => {
    if (roomName.trim().length > 0) {
      const roomRef = database().ref('/rooms').push();
      roomRef.set({name: roomName}).then(() => setRoomName('')); // Oda eklendikten sonra input temizlenir
    }
  };

  // Firebase'den Oda Listesini Al
  useEffect(() => {
    const roomRef = database().ref('/rooms');
    roomRef.on('value', snapshot => {
      const roomData = snapshot.val();
      if (roomData) {
        const roomList = Object.keys(roomData).map(key => ({
          id: key,
          ...roomData[key],
        }));
        setRooms(roomList);
      }
    });

    // Aboneliği temizle
    return () => roomRef.off('value');
  }, []);

  // Odaları Listeleme
  const renderRoom = ({item}) => (
    <TouchableOpacity
      style={styles.roomContainer}
      onPress={() =>
        navigation.navigate('Chat', {roomId: item.id, roomName: item.name})
      }>
      <Text style={styles.roomText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sohbet Odaları</Text>
      <TextInput
        placeholder="Yeni oda adı"
        value={roomName}
        onChangeText={setRoomName}
        style={styles.input}
      />
      <TouchableOpacity onPress={addRoom}>
        <View
          style={{
            marginTop: windowWidth * 0.03,
            width: windowWidth * 0.3,
            height: windowWidth * 0.15,
            borderRadius: 10,
            borderColor: 'white',
            borderWidth: 1,
            borderColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', fontSize: windowWidth * 0.05}}>
            oda ekle
          </Text>
        </View>
      </TouchableOpacity>

      <FlatList
        data={rooms}
        keyExtractor={item => item.id}
        renderItem={renderRoom}
        style={styles.list}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#332B5A',
    alignItems: 'center',
  },
  title: {
    fontSize: windowWidth * 0.5,
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  input: {
    width: windowWidth * 0.9,
    height: windowWidth * 0.15,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    color: 'white',
  },
  list: {
    marginTop: 20,
  },
  roomContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
    borderRadius: 10,
    width: windowWidth * 0.4,
    height: windowWidth * 0.4,
    backgroundColor: '#ff9f31',
    margin: windowWidth * 0.03,
  },
  roomText: {
    fontSize: windowWidth * 0.09,
    fontWeight: '800',
    fontStyle: 'italic',
    color: 'white',
  },
});

export default RoomsScreen;
