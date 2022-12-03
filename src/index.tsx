import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider, Box } from "native-base";
import { StackBar } from "./Stack";
import 'react-native-gesture-handler';

function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <StackBar />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default App;
