import { Right } from 'native-base';
import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    StyleSheet, FlatList
} from 'react-native';

function Item({ item }) {
  return (
    <View>
        <Card>
        <CardItem style={{height: 78,borderBottomWidth:1,borderColor: '#dadddf'}}>
        <Left>
            <Text style={{fontWeight:"bold"}}>{item.firstname} {item.lastname}  </Text>
        </Left>
        <Right>
         <Muunnin item={item}/>
        </Right>
        </CardItem>
        </Card>
    </View>
  );
}
function Muunnin({ item }) {
    if (item.status == "alarm" ) {    
        <Text style={[styles.textFlatlistStyle, {backgroundColor: "red"}]}> {item.receiver_location}</Text>
    
  }
  else if (item.location_type == "go check" ) {
    <Text style={[styles.textFlatlistStyle, {backgroundColor: "yellow"}]}> {item.receiver_location}</Text>
}
 else if (item.location_type == "ok" ) {
  <Text style={[styles.textFlatlistStyle, {backgroundColor: "green"}]}> {item.receiver_location}</Text>  
}
}

export default function Locations_info() {

  const [tieto, setTieto] = useState([]);


  useEffect (() => {
      // Put your Ipv4 address here for example http://000.000.0.0:4000/beacon_info
      fetch('https://www.vanhusmonitorointi.tk/statuses')
          .then((response) => response.json())
          .then(responseJson => {
              setTieto(...tieto, responseJson)
              console.log(tieto)
          })
  }, []);


      return (
          <View style={styles.container}>
          <FlatList
            style={{flex:1}}
            data={tieto}
            renderItem={({ item }) => <Item item={item}/>}
            keyExtractor={item => item.tenant_id}
          />   
          </View>
    );
  }


const styles = StyleSheet.create({
  container: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      paddingTop: 50,
      backgroundColor:'rgb(178, 223, 219)'
  },

  
  listItem:{
      margin:10,
      padding:10,
      backgroundColor:"#FFF",
      width:"80%",
      flex:1,
      alignSelf:"center",
      flexDirection:"row",
      borderRadius:5
    }
})
