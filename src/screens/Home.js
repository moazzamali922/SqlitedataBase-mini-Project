import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Alert,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {openDatabase} from 'react-native-sqlite-storage';
import {useIsFocused, useNavigation} from '@react-navigation/native';
let db = openDatabase({name: 'UserDatabase.db', location: 'default'});

const Home = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused;
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, [isFocused]);

  const fetchUsers = () => {
    db.transaction(txn => {
      txn.executeSql('SELECT * FROM table_user', [], (tx, res) => {
        let temp = [];
        for (let i = 0; i < res.rows.length; i++) {
          temp.push(res.rows.item(i));
        }
        setUserList(temp);
      });
    });
  };

  const deleteUser = userId => {
    Alert.alert('Delete User', 'Are you sure you want to delete this user?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => {
          db.transaction(txn => {
            txn.executeSql(
              'DELETE FROM table_user WHERE user_id = ?',
              [userId],
              (tx, res) => {
                if (res.rowsAffected > 0) {
                  fetchUsers();
                }
              },
            );
          });
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <FlatList
          data={userList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.item}>
              <Text style={styles.text}>Name: {item.user_name}</Text>
              <Text style={styles.text}>Email: {item.user_email}</Text>
              <Text style={styles.text}>Address: {item.user_address}</Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('EditUser', {
                      data: {
                        name: item.name,
                        email: item.email,
                        address: item.address,
                        id: item.user_id,
                      },
                    });
                  }}>
                  <Image
                    style={{width: 25, height: 25}}
                    source={require('../images/editing.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    deleteUser(item.user_id);
                  }}>
                  <Image
                    style={{width: 25, height: 25}}
                    source={require('../images/trash.png')}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={styles.addButtonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddUser')}
          style={styles.addButton}>
          <Text style={styles.addButtonLabel}>Add User</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  item: {
    backgroundColor: '#ffffff',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 16,
    borderRadius: 5,
    borderWidth: 3.5,
    borderColor: '#ccc',
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
    color: '#000',
  },
  addButtonContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    padding: 16,
    backgroundColor: '#fff',
  },
  addButton: {
    padding: 15,
    backgroundColor: '#5837e9',
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 'auto',
  },
  addButtonLabel: {
    fontSize: 20,
    color: '#fff',
  },
});

export default Home;
