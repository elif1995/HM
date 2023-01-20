import {useContext} from 'react'
import {View, Text, StyleSheet, Image} from 'react-native'


function HomeReviewsBox (props) {

  let uriImage = props.image

  
  switch (props.text){
    case 'תפוח':
      uriImage = "https://www.ynet.co.il/PicServer5/2019/07/28/9389856/9389853099094980684no.jpg";
      break;
    case 'בננה':
      uriImage = "https://www.egozhakfar.co.il/wp-content/uploads/2020/04/%D7%91%D7%A0%D7%A0%D7%95%D7%AA.jpg";
      break;
    case 'עגבנייה':
      uriImage =  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Bright_red_tomato_and_cross_section02.jpg/1200px-Bright_red_tomato_and_cross_section02.jpg";
      break;
    case 'מלפפון':
      uriImage = "https://www.agogo.co.il/wp-content/uploads/2013/05/%D7%9E%D7%9C%D7%A4%D7%A4%D7%95%D7%9F-%D7%99%D7%AA%D7%A8%D7%95%D7%A0%D7%95%D7%AA.jpg";
      break;
    default:
      uriImage = props.image  
  }

  // if(props.text === 'בננה'){
  //   uriImage = "https://www.lemonana.co.il/cache/w_1500/%D7%91%D7%A0%D7%A0%D7%94(1).jpg"
  // }
  // if(props.text === 'תפוח'){
  //   uriImage = "https://www.ynet.co.il/PicServer5/2019/07/28/9389856/9389853099094980684no.jpg"
  // }
  
 

  

return(
  <View style={styles.container}>
    <View style={{ backgroundColor:'green', color:'white', width: 35, height: 35, alignItems:'center', justifyContent: 'center', borderRadius: 100, margin: -15, zIndex: 2}}>    
      <Text style={{color:'white'}} >{props.number === undefined ? 0 : props.number}</Text>
    </View>
    <View style={styles.category}>
      <Text style={{color:'black', fontSize:20, fontWeight:'bold'}} >{props.text}</Text>
      {uriImage && <Image source={{uri: uriImage}} style={styles.image} />}

    </View>
  </View>
)
}

export default HomeReviewsBox

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15
  },
  category: {
    textAlign: 'center',
    
    justifyContent: 'center',
    alignItems: 'center',
    
    width: 120,
    height:150,
    
    borderColor:'lightgreen',
    fontWeight: 'bold',
    elevation: 10,
    fontSize:20,
    backgroundColor:'white',
    padding: 5,
    borderRadius:6,

    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
  image: {
    width:100,
    height: 90,
    borderRadius:5,
    marginTop:15
  },
})