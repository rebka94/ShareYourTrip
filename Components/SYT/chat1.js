<View style={styles.centeredView}>
<View style={{flex:1, width:"100%", 
backgroundColor:"#fff", borderTopRightRadius:50,
borderTopLeftRadius:50
}}>
    <View style={styles.container}>
<View style={{height:40, justifyContent:"center", alignItems:"flex-start"}}>

</View>
<View style={{flex:1}}>
 <Image 
    style={styles.image} 
    source={require('../../assets/images/time.png')}
    />

<View style={{flex:2/10}}>
    <Text style={{fontWeight:"bold", fontSize:35, marginTop:25, color:"#846D84", marginLeft:15}}>
        {"Quand est-ce que"}
    </Text>
    <Text style={{fontWeight:"bold", fontSize:35, color:"#846D84", marginLeft:15}}>
        {this.type=="departure"?"vous parter ?":"vous arriver ?"}
    </Text>
</View>  
<View style={{flex:8/10, justifyContent:"center", alignItems:"center"}}>
    <Text>{/*this.state.date*/}</Text>
    {/*this.showDataTimePic()*/}
    <View style={styles.date_time_content}>
        <TouchableOpacity style={styles.time_date} onPress={()=>{}}  >
            <Ionicons name="ios-time" size={50} color="purple" />
            <Text style={{fontWeight:"bold", color:"#846D84", fontSize:20}}>{"Heure du voyage:"}</Text>
            <Text style={{fontWeight:"bold", color:"#846D84", fontSize:22}}>
                {func.getTimeFormat(this.state.date)}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.time_date}   onPress={()=>this.showDatepicker()}>
            <FontAwesome5 name="calendar-day" size={50} color="purple"/>
            <Text style={{fontWeight:"bold",color:"#846D84", fontSize:20, alignSelf:'center'}}>{"Date du voyage"}</Text>
            <Text style={{fontWeight:"bold", color:"#846D84", fontSize:22, alignSelf:'center'}}>
             {func.getDateFormat(this.state.date)}
            </Text>
        </TouchableOpacity>
    </View>
        
    </View>
    <View style={styles.logo_container}>
        <Text style={{fontWeight:"bold", fontSize:35, marginLeft:17, 
        marginVertical:30, color:"purple", alignSelf:"center"}}>ShareYourTrip</Text>
    </View>
        <TouchableOpacity style={styles.button_next} onPress={()=>this.handleNext()}>
            <Text style={{fontSize:17, color:"#fff", fontWeight:"bold"}}>Valider</Text>
        </TouchableOpacity>
</View>
 </View>
</View>
<TouchableHighlight
    underlayColor={'transparent'}
    style={{ backgroundColor: "#fff", position:"absolute", top:20, left:10, }}
    onPress={() => {
    this.props._toggleSetDateTimeModal(false)
    }}
>
    <Entypo name="cross" size={40} color="purple" />
</TouchableHighlight>
</View>