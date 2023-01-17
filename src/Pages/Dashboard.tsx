import {
  Box,
  HStack,
  Icon,
  Image,
  InfoIcon,
  Input,
  ScrollView,
  Text,
} from "native-base";
import React, { useEffect, useState } from "react";
import { ENDPOINTS, fetcher } from "../API/Fetcher";
import { logger } from "../utils/logger";
import { Table, TableWrapper, Row, Rows } from "../Components/Table";
import { StyleSheet } from "react-native";
import { RadioGroup } from "../Components/Form/RadioGroup";
import { Button, Actionsheet, useDisclose } from "native-base";
import { images } from "../Assests";
import { style } from "../Components/Container";
export default function Dashboard(props: any) {
  const { isOpen, onOpen, onClose } = useDisclose();
  return (
    <ScrollView  contentContainerStyle={{ backgroundColor : "white"}}>

        <Button
         
          width={"56"}
          onPress={onOpen}
        >
          <HStack><Image
            source={images.filter}
            alt="sma"
            width={"20px"}
            height={"100%"}
          />
          <Text> Filter</Text></HStack>
        </Button>

        <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content minHeight={"xl"}>
            <Input />
            <RadioGroup
              value="by date"
              onChange={(e) => {}}
              option={[
                { value: "by date", label: "by date" },
                { value: "by month", label: "by month" },
              ]}
              title="Filter by"
            />
          </Actionsheet.Content>
        </Actionsheet>
      
      <ShowData {...props} />
     
    </ScrollView>
  );
}
function ShowData(props: any) {
  const [state, setState] = useState([]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      fetcher
        .get(ENDPOINTS.PREFER)
        .then((r) => {
          logger.info(r.data);

          setState(r.data);
        })
        .catch((e) => {
          logger.error(e);
        });
    });

    return unsubscribe;
  }, [props.navigation.isFocused]);

  let flexArr = [1, 1, 2, 2, 2, 2];
  return (
    <ScrollView px="2">
      <Table borderStyle={{ borderWidth: 1 }}>
        <Row
          data={[
            "S.no",
            "Bull ID",
            "Month",
            "No. of ejaculates collected",
            "No. of ejaculates accepted",
            "Ejaculates accepted (%)",
          ]}
          flexArr={flexArr}
          style={styles.head}
          textStyle={styles.text}
        />
        <TableWrapper style={styles.wrapper}>
          {/* <Col data={state.tableTitle} style={styles.title} heightArr={[28,28]} textStyle={styles.text}/> */}
          <Rows
            data={state.map((i: any, index) => [
              `${index + 1} .`,
              i.bullID,
              i.createdAt.slice(0, 10),
              i.calculation,
              i.calculation,
              i.isAccept,
            ])}
            flexArr={flexArr}
            style={styles.row}
            textStyle={styles.text}
          />
        </TableWrapper>
      </Table>
    </ScrollView>
  );
}

function List({ title, value }: any) {
  return (
    <HStack space={"3"}>
      <Text>{title} : </Text>
      <Text>{value} </Text>
    </HStack>
  );
}

const styles = StyleSheet.create({
  head: { height: 40, backgroundColor: "#f1f8ff", color: "black" },
  wrapper: { flexDirection: "row" },
  title: { flex: 1, backgroundColor: "#f6f8fa", color: "black" },
  row: { height: 28 },
  text: { textAlign: "center", color: "black" },
});
