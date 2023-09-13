import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation, useIsFocused, useRoute} from '@react-navigation/native';
import {openDatabase} from 'react-native-sqlite-storage';
let db = openDatabase({name: 'UserDatabase.db'});

const EditUser = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const isFocused = useIsFocused();

  useEffect(() => {
    setName(route.params.data.name);
    setEmail(route.params.data.email);
    setAddress(route.params.data.address);
  }, []);

  const updateData = () => {
    db.transaction(txn => {
      txn.executeSql(
        'UPDATE table_user SET user_name=?, user_email=?, user_address=? WHERE user_id=?',
        [name, email, address, route.params.data.id],
        (txn, res) => {
          navigation.goBack();
        },
      );
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <>
        <View
          style={{
            justifyContent: 'center',
            width: '70%',
            alignSelf: 'center',
            marginVertical: 60,
          }}>
          <TextInput
            style={{
              borderWidth: 1,
              padding: 10,
              borderRadius: 10,
              marginVertical: 7,
            }}
            placeholder="Enter User Name"
            value={name}
            onChangeText={text => setName(text)}
          />
          <TextInput
            style={{
              borderWidth: 1,
              padding: 10,
              borderRadius: 10,
              marginVertical: 7,
            }}
            placeholder="Enter User Email"
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <TextInput
            style={{
              borderWidth: 1,
              padding: 10,
              borderRadius: 10,
              marginVertical: 7,
            }}
            value={address}
            onChangeText={text => setAddress(text)}
            placeholder="Enter User Address"
          />

          <TouchableOpacity
            onPress={() => {
              updateData();
            }}
            style={{
              marginVertical: 14,
              padding: 13,
              backgroundColor: '#5837e9',
              alignItems: 'center',
              borderRadius: 10,
            }}>
            <Text style={{fontSize: 20, color: '#fff'}}>Edit User</Text>
          </TouchableOpacity>
        </View>
      </>
    </SafeAreaView>
  );
};

export default EditUser;

const styles = StyleSheet.create({});
