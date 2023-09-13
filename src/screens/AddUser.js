import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput, 
} from 'react-native';
import React, {useState, useEffect} from 'react';
import { useNavigation,useIsFocused } from '@react-navigation/native';
import {openDatabase} from 'react-native-sqlite-storage';
 let db = openDatabase({name: 'UserDatabase.db'});

const AddUser = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const isFocused  = useIsFocused()

  useEffect(() => {
    db.transaction(txn => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        (tx, res) => {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user (user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_email VARCHAR(50), user_address VARCHAR(255))',
              [],
            );
          } else {
            console.log(' already table Created');
          }
        },
      );
    });
  }, [isFocused]);

  const saveData = () => {
    db.transaction(txn => {
      txn.executeSql(
        'INSERT INTO table_user( user_name , user_email , user_address) VALUES (?,?,?)',
        [email, address, name], 
        (tex, res) => {
          if (res.rowsAffected == 1) {
            navigation.navigate('Home');
          } else {
            console.log(res);
          }
        },
        erorr => {
          console.log(erorr);
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
            saveData();
          }}
          style={{
            marginVertical:14,  
            padding: 13,
            backgroundColor: '#5837e9',
            alignItems: 'center',
            borderRadius: 10,
          }}>
          <Text style={{fontSize: 20,color:"#fff"}}>Save User</Text>
        </TouchableOpacity>
      </View>
      </>
    </SafeAreaView>
  );
};

export default AddUser;

const styles = StyleSheet.create({});
