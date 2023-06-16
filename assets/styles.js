
const styles = StyleSheet.create({
    layout: {
        display: 'flex',
        justifyContent: 'center',
        padding: 30,
        height: D.height -  120,
    },
    nav:{
        display:'flex',
        flexDirection:'row',
        width:D.width,
    },
    pressable:{
        height:50,
        backgroundColor:Colors.primary,
        display:'flex',
        justifyContent: 'center',
        width:D.width/2,
    },
    menuBtn:{
        fontSize:15,
        fontWeight:'bold',
        textAlign:'center',       
        color:Colors.white,
    },
    btn:{
        padding:15,
        width:D.width-60,
        textAlign:'center',
        backgroundColor:Colors.btn,
        color:Colors.white,
        borderRadius:8,
    }, 
    input:{
        fontSize:16,
        height: 50,
        width:'100%',
        borderWidth: 1,
        borderColor:Colors.border,
        color:Colors.white,
        padding: 10,
        borderRadius:8,
        marginBottom:30,
        marginTop:10,
        backgroundColor:'#00838fb3'
    },
    label:{
        fontSize:20,
        fontWeight:'400',
        color: Colors.white
    },
    user:{
        backgroundColor: Colors.primaryPressed,
        padding: 30,
        display: 'flex',
        alignItems: 'center',
    },
    name:{
        fontSize:30,
        fontWeight:'bold',
        textAlign:'center',       
        color:Colors.white,
    },
    msg:{
        fontSize:20,
        marginBottom:30
    }
});

export default styles;