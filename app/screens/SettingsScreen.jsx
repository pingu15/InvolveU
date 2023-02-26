import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking } from 'react-native';

function Profile() {
  return (
    <View style={styles.profile}>
      <Text style={{fontSize: 20, fontWeight: 'bold', color: '#000000', marginHorizontal: '7%', marginTop: '6%', marginBottom: '3%'}}>Noob Wong</Text>
      <Text style={{fontSize: 12, color: '#a6a6a6', marginHorizontal: '7%', marginBottom: '6%'}}>username</Text>
    </View>
  );
}

function Separator() {
  return (
    <View style={{ width: '85%', borderBottomColor: '#d1d1d1', borderBottomWidth: 0.5}}>
  </View>
  );
}

function ToggleableContent({option, content}) {
  const [visible, setVisible] = useState(false);

  function toggleVisibility() {
    setVisible(!visible);
  }

  return (
    <View style={styles.togglecontent}>
      <TouchableOpacity onPress={toggleVisibility}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#000000'}}>{option}</Text>
      </TouchableOpacity>
      {visible && (
        <View style={{ flexGrow: visible ? 1 : 0 }}>
          {content}
        </View>
      )}
    </View>
  );
}

function TermsButton() {
  const handleOpenTerms = () => {
    Linking.openURL('https://example.com/');
  }
  return (
    <TouchableOpacity style={styles.bottombutton} onPress={handleOpenTerms}>
      <Text style={{fontSize: 16, color: '#2280ff'}}>Terms and Privacy Policy</Text>
    </TouchableOpacity>
  );
}

export default function SettingsScreen({ navigation }) {
  const handleLogout = () => {
    nagivation.navigate('Login');
  }
  
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.overview}>
          <Profile />
          <Separator />
          
          <View style={styles.togglecontentcontainer}>
            <ToggleableContent option={"How to Use"} content={<Text>a</Text>} />
            <ToggleableContent option={"Change Grade"} content={<Text>a</Text>} />
            <ToggleableContent option={"About the Developers"} content={<Text>a</Text>} />
          </View>
          <Separator />

          <View style={styles.bottombuttonscontainer}>
            <TermsButton />
            <TouchableOpacity style={styles.bottombutton} onPress={handleLogout}>
              <Text style={{fontSize: 16, color: '#ff5555'}}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  bottombuttonscontainer: {
    width: '85%',
    overflow: 'hidden',
  },
  bottombutton: {
    marginTop: '8%',
  },
  container: {
    flexGrow: 1,
    backgroundColor: '#fafafa',
  },
  overview: {
    flexGrow: 1,
    margin: '5%',
    width: '90%',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  profile: {
    margin: '8%',
    width: '85%',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fafafa',
  },
  togglecontentcontainer: {
    width: '85%',
    marginBottom: '8%',
    overflow: 'hidden',
  },
  togglecontent: {
    marginTop: '8%',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});