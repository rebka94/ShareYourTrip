import React, { Component } from 'react';
import { View, Text } from 'react-native';

 class AirportSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={st}>
        <View style={styles.header_modal}>
                        <TextInput 
                                style={styles.input_Search} 
                                underlineColorAndroid="transparent"
                                autoCapitalize="none"
                                placeholder=" Aéroport Orly ou Charles d...  "
                                onChangeText={departure => this.handleSearch(departure)} 
                                ></TextInput>
                    </View>
                    <FlatList 
                        style={styles.feed}
                        data= {this.state.fullDataAirport}
                        renderItem={(item)=>this._renderItem(item)}
                        keyExtractor= {(item )=> item.code}/>
      </View>
    );
  }
}
export default DepartureLocation
