import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  Platform,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// ---- THEME ----
const COLORS = {
  primary: '#FFC107',
  secondary: '#1E8F66',
  accent: '#FF3D00',
  background: '#FFFFFF',
  surface: '#FFFFFF',
  text: '#333333',
  textLight: '#757575',
  border: '#EEEEEE',
  shadow: '#000000',
};

// ---- OPTION ITEM COMPONENT ----
const OptionItem = ({
  label,
  onPress,
  isDestructive = false,
}: {
  label: string;
  onPress?: () => void;
  isDestructive?: boolean;
}) => (
  <TouchableOpacity
    style={styles.optionItem}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Text
      style={[
        styles.optionText,
        isDestructive && { color: COLORS.accent },
      ]}
    >
      {label}
    </Text>
    <Text style={styles.chevron}>›</Text>
  </TouchableOpacity>
);

const ProfileScreen = () => {
  const navigation = useNavigation<any>();

  // ---- STATE ----
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('Rahul Sharma');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [email, setEmail] = useState('rahul@gmail.com');
  const [pincode, setPincode] = useState('600001');
  const [photo, setPhoto] = useState(
    'https://i.pravatar.cc/150?img=11'
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.headerIcon}>←</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>My Profile</Text>

        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* PROFILE CARD */}
        <View style={styles.profileCard}>

          {!isEditing ? (
            <>
              <View style={styles.profileRow}>
                <Image source={{ uri: photo }} style={styles.avatar} />

                <View style={styles.userInfo}>
                  <Text style={styles.userName}>{name}</Text>
                  <Text style={styles.userPhone}>{phone}</Text>
                  <Text style={styles.userStatus}>
                    {email}
                  </Text>
                  <Text style={styles.userStatus}>
                    Pincode: {pincode}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.editButton}
                onPress={() => setIsEditing(true)}
              >
                <Text style={styles.editButtonText}>
                  Edit Profile
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={styles.editAvatarContainer}
                onPress={() =>
                  setPhoto('https://i.pravatar.cc/150?img=5')
                }
              >
                <Image source={{ uri: photo }} style={styles.avatar} />
                <Text style={styles.changePhotoText}>
                  Change Photo
                </Text>
              </TouchableOpacity>

              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
              />

              <Text style={styles.label}>Phone</Text>
              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
              />

              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
              />

              <Text style={styles.label}>Pincode</Text>
              <TextInput
                style={styles.input}
                value={pincode}
                onChangeText={setPincode}
                keyboardType="numeric"
              />

              <View style={styles.editButtonsRow}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setIsEditing(false)}
                >
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={() => setIsEditing(false)}
                >
                  <Text style={styles.saveText}>Save</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>

        {/* ACTIVITY SECTION */}
        <Text style={styles.sectionHeader}>ACTIVITY & QUICK LINKS</Text>
        <View style={styles.card}>
          <OptionItem label="My Orders" />
          <View style={styles.divider} />
          <OptionItem label="Saved Addresses" />
          <View style={styles.divider} />
          <OptionItem label="Payment Methods" />
          <View style={styles.divider} />
          <OptionItem label="Wishlist" />
          <View style={styles.divider} />
          <OptionItem label="Notifications" />
          <View style={styles.divider} />
          <OptionItem label="Help & Support" />
        </View>

        {/* SETTINGS SECTION */}
        <Text style={styles.sectionHeader}>APPLICATION SETTINGS</Text>
        <View style={styles.card}>
          <OptionItem label="Language Settings" />
          <View style={styles.divider} />
          <OptionItem label="Privacy Policy" />
          <View style={styles.divider} />
          <OptionItem label="Terms & Conditions" />
          <View style={styles.divider} />
          <OptionItem label="About Super Store" />
        </View>

        {/* LOGOUT */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => navigation.replace('Login')}
        >
          <Text style={styles.logoutText}>Logout Account</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>
          SUPER STORE V2.4.1 (STABLE BUILD)
        </Text>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

// ---- STYLES ----
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scrollContent: { padding: 16 },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  headerTitle: { fontSize: 18, fontWeight: '700', color: COLORS.text },
  headerIcon: { fontSize: 20, color: COLORS.text },

  profileCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: { elevation: 4 },
    }),
  },

  profileRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: COLORS.primary,
  },

  userInfo: { marginLeft: 16 },

  userName: { fontSize: 18, fontWeight: '700', color: COLORS.text },
  userPhone: { fontSize: 14, color: COLORS.textLight, marginTop: 4 },
  userStatus: { fontSize: 13, color: COLORS.primary, marginTop: 4 },

  editButton: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },

  editButtonText: { color: '#FFF', fontWeight: '700' },

  label: { marginTop: 16, marginBottom: 6, fontWeight: '600', color: COLORS.text },

  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    padding: 14,
    backgroundColor: '#F9F9F9',
  },

  editAvatarContainer: { alignItems: 'center', marginBottom: 20 },
  changePhotoText: { marginTop: 8, color: COLORS.primary, fontWeight: '600' },

  editButtonsRow: { flexDirection: 'row', marginTop: 24 },
  cancelButton: {
    flex: 1,
    marginRight: 10,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },

  cancelText: { fontWeight: '600', color: COLORS.text },

  saveButton: {
    flex: 1,
    backgroundColor: COLORS.secondary,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },

  saveText: { color: '#FFF', fontWeight: '700' },

  sectionHeader: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textLight,
    marginBottom: 10,
    marginLeft: 4,
  },

  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 24,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: { elevation: 2 },
    }),
  },

  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },

  optionText: { fontSize: 15, color: COLORS.text, fontWeight: '500' },
  chevron: { fontSize: 18, color: '#C4C4C4' },
  divider: { height: 1, backgroundColor: COLORS.border },

  logoutButton: {
    backgroundColor: COLORS.accent,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 20,
  },

  logoutText: { color: '#FFF', fontWeight: '700' },

  versionText: {
    textAlign: 'center',
    fontSize: 11,
    color: '#999',
    letterSpacing: 1,
  },
});
