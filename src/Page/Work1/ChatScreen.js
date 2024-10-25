import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import database from '@react-native-firebase/database';
const windowWidth = Dimensions.get('window').width;
const ChatScreen = ({route, navigation}) => {
  // route.params'dan oda bilgilerini al
  const {roomId, roomName} = route.params;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  // Mesaj Gönder
  const sendMessage = () => {
    if (message.trim().length > 0) {
      const messageRef = database().ref(`/rooms/${roomId}/messages`).push();
      messageRef
        .set({text: message, timestamp: Date.now()})
        .then(() => setMessage('')); // Mesaj gönderildikten sonra input temizlenir
    }
  };

  // Firebase'den Mesajları Al
  useEffect(() => {
    const messageRef = database().ref(`/rooms/${roomId}/messages`);
    messageRef.on('value', snapshot => {
      const messageData = snapshot.val();
      if (messageData) {
        const messageList = Object.keys(messageData)
          .map(key => ({
            id: key,
            ...messageData[key],
          }))
          .sort((a, b) => a.timestamp - b.timestamp); // Mesajları zamana göre sırala
        setMessages(messageList);
      }
    });

    // Aboneliği temizle
    return () => messageRef.off('value');
  }, [roomId]);

  // Mesajları Listeleme
  const renderMessage = ({item}) => (
    <View style={styles.messageContainer}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{roomName} Odası</Text>
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderMessage}
        style={styles.messageList}
      />

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Mesajınızı yazın"
          value={message}
          onChangeText={setMessage}
          style={styles.input}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Gönder</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#332B5A',
    flex: 1,
    padding: 20,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: windowWidth * 0.05,
  },
  messageList: {
    flex: 1,
    marginBottom: 20,
  },
  messageContainer: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    marginBottom: 5,
    borderRadius: 5,
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
    color: 'white',
  },
  sendButton: {
    backgroundColor: '#white',
    padding: 10,
    borderRadius: 5,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  /* 
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: windowWidth * 0.9,
    height: windowWidth * 0.15,
    borderRadius: 5,
  },*/
});

export default ChatScreen;
