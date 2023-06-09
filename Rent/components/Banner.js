import { Image } from "react-native";

function Banner(props) {
    return (
      <Image style={{ width: '100%', height: '100%', resizeMode: 'stretch' }} source={require(`../assets/${props.name}.png`)}>
      </Image>
    );
  }