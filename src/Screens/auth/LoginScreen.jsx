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
  StatusBar,
  Dimensions,
  Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logInUser } from '../../features/authSlice';
import { COLORS } from '../../theme/theme';
import { moderateScale } from 'react-native-size-matters';

const { width } = Dimensions.get('window');

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const { loading } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert(
        'Missing Information',
        'Please enter both email and password',
      );
      return;
    }
    try {
      dispatch(logInUser({ email, password }))
        .unwrap()
        .then(res => {
          Alert.alert('Welcome Back!', 'Login successful');
          navigation.navigate('bottomTabNavigation');
        })
        .catch(err => {
          Alert.alert('Login Failed', 'Please check your credentials');
          console.log('error while logging in', err);
        });
    } catch (err) {
      console.log('login error', err);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logoContainer}
              source={require('../../assets/images/splash.png')}
            />
          </View>
          <Text style={styles.welcomeText}>Welcome Back</Text>
          <Text style={styles.subtitle}>
            Sign in to continue your coffee journey
          </Text>
        </View>

        {/* Form Section */}
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={[styles.input, emailFocused && styles.inputFocused]}
              placeholder="Enter your email"
              placeholderTextColor="#666"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              style={[styles.input, passwordFocused && styles.inputFocused]}
              placeholder="Enter your password"
              placeholderTextColor="#666"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
            />
          </View>

          <TouchableOpacity
            style={[styles.loginButton, loading && styles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <Text style={styles.loginButtonText}>Signing in...</Text>
            ) : (
              <Text style={styles.loginButtonText}>Sign In</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Bottom Section */}
        <View style={styles.bottomContainer}>
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <TouchableOpacity
              onPress={() => navigation.replace('SignupScreen')}
            >
              <Text style={styles.signupLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: moderateScale(24),
    paddingTop: moderateScale(140),
    paddingBottom: moderateScale(30),
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: moderateScale(40),
  },
  logoContainer: {
    width: moderateScale(80),
    height: moderateScale(80),
    borderRadius: moderateScale(40),
    backgroundColor: COLORS.primaryOrangeHex,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primaryOrangeHex,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logoText: {
    fontSize: moderateScale(36),
    color: COLORS.primaryWhiteHex,
  },
  welcomeText: {
    fontSize: moderateScale(28),
    fontWeight: 'bold',
    color: COLORS.primaryWhiteHex,
    marginBottom: moderateScale(8),
    textAlign: 'center',
  },
  subtitle: {
    fontSize: moderateScale(16),
    color: '#999',
    textAlign: 'center',
    lineHeight: moderateScale(22),
  },
  formContainer: {
    marginBottom: moderateScale(40),
  },
  inputContainer: {
    marginBottom: moderateScale(20),
  },
  inputLabel: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: COLORS.primaryWhiteHex,
    marginBottom: moderateScale(8),
    marginLeft: moderateScale(4),
  },
  input: {
    backgroundColor: COLORS.primaryDarkGreyHex,
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(16),
    borderRadius: moderateScale(12),
    fontSize: moderateScale(16),
    color: COLORS.primaryWhiteHex,
    borderWidth: 1,
    borderColor: '#333',
  },
  inputFocused: {
    borderColor: COLORS.primaryOrangeHex,
    shadowColor: COLORS.primaryOrangeHex,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  loginButton: {
    backgroundColor: COLORS.primaryOrangeHex,
    paddingVertical: moderateScale(18),
    borderRadius: moderateScale(12),
    alignItems: 'center',
    marginTop: moderateScale(20),
    shadowColor: COLORS.primaryOrangeHex,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    color: COLORS.primaryWhiteHex,
    fontSize: moderateScale(18),
    fontWeight: '700',
  },
  forgotPassword: {
    alignItems: 'center',
    marginTop: moderateScale(16),
  },
  forgotPasswordText: {
    color: COLORS.primaryOrangeHex,
    fontSize: moderateScale(16),
    fontWeight: '500',
  },
  bottomContainer: {
    marginTop: 'auto',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(30),
  },
  dividerLine: {
    flex: 1,
    height: moderateScale(1),
    backgroundColor: '#333',
  },
  dividerText: {
    color: '#666',
    fontSize: moderateScale(14),
    marginHorizontal: moderateScale(16),
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    color: '#999',
    fontSize: moderateScale(16),
  },
  signupLink: {
    color: COLORS.primaryOrangeHex,
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
});

export default LoginScreen;
