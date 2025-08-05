import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { signUpUser } from '../../features/authSlice';

const SignupScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { loading } = useSelector(state => state.auth);

  const [form, setForm] = useState({
    fullname: '',
    username: '',
    password: '',
    email: '',
    phoneNumber: '',
  });

  const handleSignUp = async () => {
    try {
      dispatch(signUpUser(form))
        .unwrap()
        .then(res => {
          navigation.replace('LoginScreen');
          console.log('ok signup', res);
        })
        .catch(err => {
          console.log('signup error', err);
        });
    } catch (err) {
     
      console.log('handleError', err);

    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Signup</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={form.fullname}
        onChangeText={text => setForm({ ...form, fullname: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={form.username}
        onChangeText={text => setForm({ ...form, username: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={form.email}
        onChangeText={text => setForm({ ...form, email: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number (Optional)"
        keyboardType="phone-pad"
        value={form.phoneNumber}
        onChangeText={text => setForm({ ...form, phoneNumber: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={form.password}
        onChangeText={text => setForm({ ...form, password: text })}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <Text style={styles.buttonText}>Create Account</Text>
        )}
      </TouchableOpacity>
      <View
        style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 10 }}
      >
        <Text>Alredy have an account </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={{ color: 'blue' }}> Log In</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    flexGrow: 1,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 15,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SignupScreen;
