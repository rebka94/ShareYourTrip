//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
<MaterialIcons name="notifications-active" size={24} color="black" />
// create a component
class Notifications extends Component {
    constructor(props) {
        super(props)
        this.state = {
            notifications: []
        }
    }
    _render() {
        if (this.state.notifications.length===0) {
            return (
                <View style={{justifyContent:"center", alignItems:"center", flex:1}}>
                    <MaterialIcons name="notifications-active" size={100} color="purple" />
                    <Text style={{fontSize:20, fontWeight:"bold"}}>
                        Vous n'avez aucune notification
                    </Text>
                </View>
            )
        }

    }
    render() {
        return (
            <View style={styles.container}>
                {this._render()}
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

//make this component available to the app
export default Notifications;
