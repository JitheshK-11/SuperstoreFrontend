import React, { useState } from 'react';
import {
  Image,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

const COLORS = {
  background: '#EEF1EF',
  card: '#FFFFFF',
  primary: '#2E8B57',
  textDark: '#1F2937',
  textLight: '#6B7280',
  divider: '#E5E7EB',
  logout: '#E57373',
};

type ListItemProps = {
  icon: string;
  label: string;
  color: string;
};

const ListItem = ({ icon, label, color, onPress }: any) => (
  <>
    <TouchableOpacity style={styles.listItem} onPress={onPress}>
      <View style={[styles.iconWrapper, { backgroundColor: color + '20' }]}>
        <Icon name={icon} size={18} color={color} />
      </View>
      <Text style={styles.listText}>{label}</Text>
      <Icon name="chevron-right" size={18} color="#9CA3AF" />
    </TouchableOpacity>
    <View style={styles.divider} />
  </>
);


const ProfileScreen = () => {
  const navigation = useNavigation<any>();
  const [addressOpen, setAddressOpen] = useState(false);
  const [address, setAddress] = useState({
    name: 'Home',
    line1: '12, MG Road',
    area: 'Andheri East',
    city: 'Mumbai',
    pincode: '400001',
  });
  const [editOpen, setEditOpen] = useState(false);
  const [name, setName] = useState('Priya Sharma');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [email, setEmail] = useState('priya.sharma@gmail.com');
  const [pincode, setPincode] = useState('400001');
  const [photo, setPhoto] = useState('https://i.pravatar.cc/150?img=5');
  const handleLogout = () => {
    navigation.replace('Login');
  };

  return (
    
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={20} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
        <View style={{ width: 20 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View style={styles.profileCard}>
          <View style={styles.profileRow}>
            <View style={styles.avatarWrapper}>
              <Image source={{ uri: photo }} style={styles.avatar} />
              <View style={styles.onlineDot} />
            </View>

            <View style={{ flex: 1, marginLeft: 14 }}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.subText}>{phone}</Text>
              <Text style={styles.subText}>{email}</Text>
              <Text style={styles.subText}>Pincode: {pincode}</Text>

              <View style={styles.verifiedBadge}>
                <Text style={styles.verifiedText}>Verified Member</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setEditOpen(true)}
          >
            <Icon name="edit-2" size={16} color="#FFF" />
            <Text style={styles.editText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <Modal
          visible={editOpen}
          transparent
          animationType="slide"
          onRequestClose={() => setEditOpen(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.editCard}>
              <View style={styles.editHeader}>
                <Text style={styles.editTitle}>Edit Profile</Text>
                <TouchableOpacity onPress={() => setEditOpen(false)}>
                  <Text style={styles.close}>X</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.avatarEdit}
                onPress={() => setPhoto('https://i.pravatar.cc/150?img=8')}
              >
                <Image source={{ uri: photo }} style={styles.avatarLarge} />
                <Text style={styles.changePhoto}>Change Photo</Text>
              </TouchableOpacity>

              <Text style={styles.label}>Full Name</Text>
              <TextInput style={styles.input} value={name} onChangeText={setName} />

              <Text style={styles.label}>Phone</Text>
              <TextInput style={styles.input} value={phone} onChangeText={setPhone} />

              <Text style={styles.label}>Email</Text>
              <TextInput style={styles.input} value={email} onChangeText={setEmail} />

              <Text style={styles.label}>Pincode</Text>
              <TextInput
                style={styles.input}
                value={pincode}
                onChangeText={setPincode}
                keyboardType="number-pad"
              />

              <View style={styles.editActions}>
                <TouchableOpacity
                  style={styles.cancelBtn}
                  onPress={() => setEditOpen(false)}
                >
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.saveBtn}
                  onPress={() => setEditOpen(false)}
                >
                  <Text style={styles.saveText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
<Modal
  visible={addressOpen}
  transparent
  animationType="slide"
  onRequestClose={() => setAddressOpen(false)}
>
  <View style={styles.modalOverlay}>
    <View style={styles.editCard}>

      {/* Header */}
      <View style={styles.editHeader}>
        <Text style={styles.editTitle}>Edit Address</Text>
        <TouchableOpacity onPress={() => setAddressOpen(false)}>
          <Text style={styles.close}>✕</Text>
        </TouchableOpacity>
      </View>

      {/* Address Name */}
      <Text style={styles.label}>Address Type</Text>
      <TextInput
        style={styles.input}
        value={address.name}
        onChangeText={(v) => setAddress({ ...address, name: v })}
      />

      {/* Address Line */}
      <Text style={styles.label}>Address Line</Text>
      <TextInput
        style={styles.input}
        value={address.line1}
        onChangeText={(v) => setAddress({ ...address, line1: v })}
      />

      {/* Area */}
      <Text style={styles.label}>Area</Text>
      <TextInput
        style={styles.input}
        value={address.area}
        onChangeText={(v) => setAddress({ ...address, area: v })}
      />

      {/* City */}
      <Text style={styles.label}>City</Text>
      <TextInput
        style={styles.input}
        value={address.city}
        onChangeText={(v) => setAddress({ ...address, city: v })}
      />

      {/* Pincode */}
      <Text style={styles.label}>Pincode</Text>
      <TextInput
        style={styles.input}
        value={address.pincode}
        keyboardType="number-pad"
        onChangeText={(v) => setAddress({ ...address, pincode: v })}
      />

      {/* Actions */}
      <View style={styles.editActions}>
        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={() => setAddressOpen(false)}
        >
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.saveBtn}
          onPress={() => setAddressOpen(false)}
        >
          <Text style={styles.saveText}>Save Address</Text>
        </TouchableOpacity>
      </View>

    </View>
  </View>
</Modal>

        <Text style={styles.sectionTitle}>ACTIVITY & QUICK LINKS</Text>
        <View style={styles.card}>
         <ListItem
  icon="shopping-bag"
  label="My Orders"
  color="#34D399"
  onPress={() => navigation.navigate('Orders')}
/>

          <ListItem
  icon="map-pin"
  label="Saved Addresses"
  color="#FB923C"
  onPress={() => setAddressOpen(true)}
/>

          <ListItem icon="credit-card" label="Payment Methods" color="#60A5FA" />
          <ListItem icon="bell" label="Notifications" color="#FBBF24" />
          <ListItem icon="help-circle" label="Help & Support" color="#A78BFA" />
        </View>

        <Text style={styles.sectionTitle}>APPLICATION SETTINGS</Text>
        <View style={styles.card}>
          <ListItem icon="globe" label="Language Settings" color="#10B981" />
          <ListItem icon="shield" label="Privacy Policy" color="#6366F1" />
          <ListItem icon="file-text" label="Terms & Conditions" color="#F59E0B" />
          <ListItem icon="info" label="About Smart Bazzar" color="#8B5CF6" />
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Icon name="log-out" size={16} color={COLORS.logout} />
          <Text style={styles.logoutText}>Logout Account</Text>
        </TouchableOpacity>

        <Text style={styles.version}>SMART BAZZAR V2.4.1</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  profileCard: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    elevation: 3,
  },
  profileRow: { flexDirection: 'row' },
  avatarWrapper: { position: 'relative' },
  avatar: { width: 70, height: 70, borderRadius: 35 },
  onlineDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#22C55E',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  name: { fontSize: 16, fontWeight: '700', color: COLORS.textDark },
  subText: { fontSize: 13, color: COLORS.textLight, marginTop: 2 },
  verifiedBadge: {
    marginTop: 6,
    backgroundColor: '#D1FAE5',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  verifiedText: {
    fontSize: 11,
    color: '#059669',
    fontWeight: '600',
  },
  editButton: {
    marginTop: 18,
    backgroundColor: COLORS.primary,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  editText: { color: '#FFF', fontWeight: '600', marginLeft: 6 },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94A3B8',
    marginBottom: 10,
    marginLeft: 4,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    marginBottom: 24,
    overflow: 'hidden',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  listText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textDark,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.divider,
    marginLeft: 66,
  },
  logoutButton: {
    borderWidth: 1,
    borderColor: '#FECACA',
    backgroundColor: '#FEE2E2',
    paddingVertical: 14,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  logoutText: {
    color: COLORS.logout,
    fontWeight: '600',
    marginLeft: 6,
  },
  version: {
    textAlign: 'center',
    fontSize: 11,
    color: '#9CA3AF',
    marginBottom: 30,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  editCard: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
  },
  editHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  editTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  close: {
    fontSize: 20,
    color: '#6B7280',
  },
  avatarEdit: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarLarge: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  changePhoto: {
    marginTop: 8,
    color: '#2E8B57',
    fontWeight: '600',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
  },
  editActions: {
    flexDirection: 'row',
    marginTop: 24,
  },
  cancelBtn: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  cancelText: {
    fontWeight: '600',
  },
  saveBtn: {
    flex: 1,
    backgroundColor: '#2E8B57',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  saveText: {
    color: '#FFF',
    fontWeight: '700',
  },
  
});
