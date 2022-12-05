import { Box, Flex, Image , Text} from "native-base";
import { View,  } from "react-native";
import { images } from "../Assests";
import { Footer } from "../Components/Footer";

export function Home() {
    return (
      <Flex style={{ flex: 1, alignItems: "center", justifyContent: "center" }} position="relative">
        <Image source={images.homeImage} alt="sma" resizeMode="cover"  width={"100%"}/>
        <Box position={"absolute"} left="4" bottom="10">
          <Footer />
        </Box>
      </Flex>
    );
  }
  