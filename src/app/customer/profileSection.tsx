import React from "react"
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import { router } from "expo-router"

const ProfilePage = () => {
  const handleLogout = () => {
    // Add logout logic here
    // router.replace("/login")
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity style={styles.menuButton}>
            <Icon name="menu-outline" size={24} color="#8B4513" />
          </TouchableOpacity>
        </View>

        <View style={styles.curvedBackground}>
          <View style={styles.profileImageContainer}>
            <Image source={require("../../assets/images/customer.png")} style={styles.profileImage} />
          </View>
        </View>

        <View style={styles.profileInfo}>
          <Text style={styles.name}>Yashdeep Singh</Text>
          <Text style={styles.subtitle}>Premium Member</Text>

          <View style={styles.infoSection}>
            <View style={styles.infoItem}>
              <Icon name="location-outline" size={20} color="#8B4513" />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Location</Text>
                <Text style={styles.infoValue}>Mohali, India</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <Icon name="call-outline" size={20} color="#8B4513" />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Phone</Text>
                <Text style={styles.infoValue}>+91 **********</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <Icon name="calendar-outline" size={20} color="#8B4513" />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Age</Text>
                <Text style={styles.infoValue}>28 years</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <Icon name="mail-outline" size={20} color="#8B4513" />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Email</Text>
                <Text style={styles.infoValue}>gmail@example.com</Text>
              </View>
            </View>
          </View>

          <View style={styles.menuSection}>
            <TouchableOpacity style={styles.menuItem}>
              <Icon name="person-outline" size={24} color="#8B4513" />
              <Text style={styles.menuText}>Edit Profile</Text>
              <Icon name="chevron-forward-outline" size={20} color="#8B4513" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <Icon name="notifications-outline" size={24} color="#8B4513" />
              <Text style={styles.menuText}>Notifications</Text>
              <Icon name="chevron-forward-outline" size={20} color="#8B4513" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <Icon name="settings-outline" size={24} color="#8B4513" />
              <Text style={styles.menuText}>Settings</Text>
              <Icon name="chevron-forward-outline" size={20} color="#8B4513" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Icon name="log-out-outline" size={24} color="#FFF" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5DC", // Beige background
  },
  header: {
    padding: 16,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  menuButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  curvedBackground: {
    height: 200,
    backgroundColor: "#8B4513", // Brown color
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 60,
  },
  profileImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#FFF",
    padding: 3,
    marginBottom: -60,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 60,
  },
  profileInfo: {
    paddingTop: 70,
    paddingHorizontal: 24,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#8B4513",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#A0522D",
    textAlign: "center",
    marginTop: 4,
  },
  infoSection: {
    marginTop: 32,
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5DC",
  },
  infoTextContainer: {
    marginLeft: 12,
  },
  infoLabel: {
    fontSize: 12,
    color: "#666",
  },
  infoValue: {
    fontSize: 16,
    color: "#8B4513",
    marginTop: 2,
  },
  menuSection: {
    marginTop: 24,
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
  },
  menuText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: "#8B4513",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8B4513",
    marginHorizontal: 24,
    marginBottom: 24,
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoutText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
})

export default ProfilePage

