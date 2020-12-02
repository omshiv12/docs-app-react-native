import { Entypo } from '@expo/vector-icons';
export default function headerIcon(){
    return(
      <Entypo name="menu" size={30} color="black" style={{marginLeft:20}} onPress={()=>props.navigation.openDrawer()}/>
    );
  };