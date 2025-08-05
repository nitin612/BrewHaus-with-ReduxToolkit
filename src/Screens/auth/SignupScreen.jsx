import { useNavigation } from '@react-navigation/native';
import React, { memo, useState } from 'react';
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
import { signUpUser } from '../../features/authSlice';
import { COLORS } from '../../theme/theme';
import { moderateScale } from 'react-native-size-matters';

const { width, height } = Dimensions.get('window');

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

  const [focusedField, setFocusedField] = useState(null);

  const handleSignUp = async () => {
    // Basic validation
    if (!form.fullname || !form.username || !form.email || !form.password) {
      Alert.alert('Missing Information', 'Please fill in all required fields');
      return;
    }

    try {
      dispatch(signUpUser(form))
        .unwrap()
        .then(res => {
          Alert.alert(
            'Success!',
            'Account created successfully. Please login.',
          );
          navigation.replace('LoginScreen');
          console.log('signup successful', res);
        })
        .catch(err => {
          Alert.alert(
            'Signup Failed',
            'Please try again or check your information',
          );
          console.log('signup error', err);
        });
    } catch (err) {
      console.log('handleError', err);
    }
  };

  const updateForm = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const getInputStyle = fieldName => {
    return [styles.input, focusedField === fieldName && styles.inputFocused];
  };

  const getLabelStyle = fieldName => {
    return [
      styles.inputLabel,
      focusedField === fieldName && styles.inputLabelFocused,
    ];
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logoContainer}
              source={require('../../assets/images/splash.png')}
            />
          </View>
          <Text style={styles.welcomeText}>Join Us</Text>
          <Text style={styles.subtitle}>
            Create your account to start your coffee adventure
          </Text>
        </View>

        {/* Form Section */}
        <View style={styles.formContainer}>
          {/* Full Name */}
          <View style={styles.inputContainer}>
            <Text style={getLabelStyle('fullname')}>Full Name *</Text>
            <TextInput
              style={getInputStyle('fullname')}
              placeholder="Enter your full name"
              placeholderTextColor="#666"
              value={form.fullname}
              onChangeText={text => updateForm('fullname', text)}
              onFocus={() => setFocusedField('fullname')}
              onBlur={() => setFocusedField(null)}
            />
          </View>

          {/* Username */}
          <View style={styles.inputContainer}>
            <Text style={getLabelStyle('username')}>Username *</Text>
            <TextInput
              style={getInputStyle('username')}
              placeholder="Choose a username"
              placeholderTextColor="#666"
              autoCapitalize="none"
              value={form.username}
              onChangeText={text => updateForm('username', text)}
              onFocus={() => setFocusedField('username')}
              onBlur={() => setFocusedField(null)}
            />
          </View>

          {/* Email */}
          <View style={styles.inputContainer}>
            <Text style={getLabelStyle('email')}>Email *</Text>
            <TextInput
              style={getInputStyle('email')}
              placeholder="Enter your email"
              placeholderTextColor="#666"
              keyboardType="email-address"
              autoCapitalize="none"
              value={form.email}
              onChangeText={text => updateForm('email', text)}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
            />
          </View>

          {/* Phone Number */}
          <View style={styles.inputContainer}>
            <Text style={getLabelStyle('phoneNumber')}>Phone Number</Text>
            <TextInput
              style={getInputStyle('phoneNumber')}
              placeholder="Enter your phone number (optional)"
              placeholderTextColor="#666"
              keyboardType="phone-pad"
              value={form.phoneNumber}
              onChangeText={text => updateForm('phoneNumber', text)}
              onFocus={() => setFocusedField('phoneNumber')}
              onBlur={() => setFocusedField(null)}
            />
          </View>

          {/* Password */}
          <View style={styles.inputContainer}>
            <Text style={getLabelStyle('password')}>Password *</Text>
            <TextInput
              style={getInputStyle('password')}
              placeholder="Create a strong password"
              placeholderTextColor="#666"
              secureTextEntry
              value={form.password}
              onChangeText={text => updateForm('password', text)}
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField(null)}
            />
          </View>

          <TouchableOpacity
            style={[
              styles.signupButton,
              loading && styles.signupButtonDisabled,
            ]}
            onPress={handleSignUp}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <Text style={styles.signupButtonText}>Creating Account...</Text>
            ) : (
              <Text style={styles.signupButtonText}>Create Account</Text>
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

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity
              onPress={() => navigation.replace('LoginScreen')}
              activeOpacity={0.7}
            >
              <Text style={styles.loginLink}>Log In</Text>
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
    justifyContent: 'center',
    paddingHorizontal: moderateScale(24),
    paddingVertical: moderateScale(60),
    minHeight: height - 80,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: moderateScale(20),
    marginTop: moderateScale(8),
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
      height: 6,
    },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
  },
  logoText: {
    fontSize: moderateScale(36),
    color: COLORS.primaryWhiteHex,
  },
  welcomeText: {
    fontSize: moderateScale(28),
    fontWeight: 'bold',
    color: COLORS.primaryWhiteHex,
    marginBottom: moderateScale(10),
    textAlign: 'center',
  },
  subtitle: {
    fontSize: moderateScale(16),
    color: '#999',
    textAlign: 'center',
    lineHeight: moderateScale(22),
    maxWidth: width * 0.85,
  },
  formContainer: {
    width: '100%',
    maxWidth: moderateScale(400),
    alignSelf: 'center',
    marginBottom: moderateScale(30),
  },
  inputContainer: {
    marginBottom: moderateScale(12),
  },
  inputLabel: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: COLORS.primaryWhiteHex,
    marginBottom: moderateScale(8),
    marginLeft: moderateScale(4),
  },
  inputLabelFocused: {
    color: COLORS.primaryOrangeHex,
  },
  input: {
    backgroundColor: COLORS.primaryDarkGreyHex,
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(12),
    borderRadius: moderateScale(12),
    fontSize: moderateScale(16),
    color: COLORS.primaryWhiteHex,
    borderWidth: moderateScale(2),
    borderColor: '#333',
  },
  inputFocused: {
    borderColor: COLORS.primaryOrangeHex,
    backgroundColor: COLORS.primaryDarkGreyHex,
    shadowColor: COLORS.primaryOrangeHex,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  signupButton: {
    backgroundColor: COLORS.primaryOrangeHex,
    paddingVertical: moderateScale(12),
    borderRadius: moderateScale(12),
    alignItems: 'center',
    marginTop: moderateScale(20),
    shadowColor: COLORS.primaryOrangeHex,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  signupButtonDisabled: {
    opacity: 0.7,
  },
  signupButtonText: {
    color: COLORS.primaryWhiteHex,
    fontSize: moderateScale(18),
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  bottomContainer: {
    marginTop: 'auto',
    paddingTop: moderateScale(10),
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(2),
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
    fontWeight: '500',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: moderateScale(4),
  },
  loginText: {
    color: '#999',
    fontSize: moderateScale(16),
  },
  loginLink: {
    color: COLORS.primaryOrangeHex,
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
});

export default SignupScreen;
