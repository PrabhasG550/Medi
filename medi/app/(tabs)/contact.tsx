import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StyleSheet, Image } from 'react-native';
import React, { useState } from 'react';
import { EmergencyButton } from '../EmergencyButton';
import { 
  View, 
  Text, 
  TextInput, 
  ScrollView, 
  Pressable, 
  KeyboardAvoidingView, 
  Platform,
  SafeAreaView 
} from 'react-native';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function DoctorChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const scrollViewRef = React.useRef<ScrollView>(null);

  const sendMessage = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText.trim(),
        isUser: true,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, newMessage]);
      setInputText('');

      // Scroll to bottom after message is sent
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <EmergencyButton/>
      <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#E0E0E0' }}>
        <Text style={{ fontSize: 24, fontWeight: '600' }}>Message your doctor</Text>
      </View>

      <KeyboardAwareScrollView
        ref={scrollViewRef}
        extraScrollHeight={90} // Adjust based on nav height
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1, padding: 16, paddingBottom: 100 }}
      >
        {messages.map((message) => (
          <View
            key={message.id}
            style={{
              flexDirection: 'row',
              justifyContent: message.isUser ? 'flex-end' : 'flex-start',
              marginBottom: 8,
            }}
          >
            {!message.isUser && (
              <View
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  backgroundColor: '#6B7280',
                  marginRight: 8,
                }}
              />
            )}
            <View
              style={{
                backgroundColor: message.isUser ? '#000000' : '#F3F4F6',
                padding: 12,
                borderRadius: 16,
                maxWidth: '70%',
              }}
            >
              <Text
                style={{
                  color: message.isUser ? 'white' : 'black',
                  fontSize: 16,
                }}
              >
                {message.text}
              </Text>
            </View>
          </View>
        ))}
      </KeyboardAwareScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 70} // Adjust as needed
      >
        <View
          style={{
            flexDirection: 'row',
            padding: 16,
            borderTopWidth: 1,
            borderTopColor: '#E0E0E0',
            backgroundColor: 'white',
          }}
        >
          <TextInput
            style={{
              flex: 1,
              padding: 12,
              backgroundColor: '#F3F4F6',
              borderRadius: 20,
              marginRight: 8,
              fontSize: 16,
            }}
            placeholder="Message..."
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={500}
          />
          <Pressable
            onPress={sendMessage}
            style={({ pressed }) => ({
              backgroundColor: pressed ? '#667' : '#000',
              padding: 12,
              borderRadius: 20,
              justifyContent: 'center',
            })}
          >
            <Text style={{ color: 'white', fontWeight: '600' }}>Send</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}