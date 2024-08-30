import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import EditProfileForm from "./EditProfileForm";
import ChangePasswordForm from "./ChangePasswordForm";

const ScreenEditProfile = () => {
  const handleSaveProfile = (profileData) => {
    console.log("Profile updated:", profileData);
    // Lakukan proses penyimpanan data profil di sini
  };

  const handleChangePassword = (currentPassword, newPassword) => {
    console.log("Password change request:", { currentPassword, newPassword });
    // Lakukan proses perubahan password di sini
  };

  return (
    <ScrollView style={styles.container}>
      <EditProfileForm onSave={handleSaveProfile} />
      <ChangePasswordForm onChangePassword={handleChangePassword} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
});

export default ScreenEditProfile;
