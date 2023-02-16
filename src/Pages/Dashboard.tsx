import {
  Box,
  createIcon,
  Flex,
  HStack,
  IconButton,
  Image,
  ScrollView,
  Text,
  View,
  VStack,
} from "native-base";
import React, { useEffect, useState } from "react";
import { ENDPOINTS, fetcher } from "../API/Fetcher";
import { logger } from "../utils/logger";
import { Table, TableWrapper, Row, Rows } from "../Components/Table";
import { StyleSheet } from "react-native";
import { RadioGroupFormik } from "../Components/Form/RadioGroup";
import { Button, Actionsheet, useDisclose } from "native-base";
import { images } from "../Assests";
import { useAppContext } from "../provider/AppContext";
import { DrawerActions } from "@react-navigation/native";
import { Inputs } from "../Components/Form/InputForm";
import { Formik } from "formik";
import SelectForm from "../Components/Form/SelectForm";
import { Fab, Icon } from "native-base";
import { Circle, Path } from "react-native-svg";
import dayjs from "dayjs";

export default function Dashboard(props: any) {
  const { isOpen, onOpen, onClose } = useDisclose();
  const { userState } = useAppContext();
  const [user, setUser] = useState([]);
  const [filter, setFilter] = useState({});
  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      if (userState === null) {
        props.navigation.navigate("Login");
      }
    });
    fetcher.get(ENDPOINTS.ALLUSER).then((e) => {
      setUser(e.data);
    });
    return unsubscribe;
  }, [userState]);

  if (userState?.userId)
    return (
      <ScrollView contentContainerStyle={{ backgroundColor: "white" }}>
        <Fab
          placement="bottom-right"
          onPress={onOpen}
          backgroundColor={"black"}
          icon={<Example />}
        />
      
        <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content>
            <Formik
              initialValues={{
                byUser: "",
                Filter: "1",
                bullID: "",
              }}
              onSubmit={(values) => {
                console.log(values);

                setFilter(values);
                onClose();
              }}
              enableReinitialize
            >
              {({ handleSubmit }) => (
                <VStack height={"sm"} justifyContent={"space-between"}>
                  <Box>
                    <RadioGroupFormik
                      name={"Filter"}
                      option={[
                        { value: "1", label: "by date" },
                        { value: "2", label: "by month" },
                      ]}
                      title="Filter by"
                    />
                    <HStack>
                      <Inputs
                        title="By Bull ID"
                        name={"bullID"}
                        keyboardType={"numeric"}
                        form={true}
                      />
                    </HStack>
                    <HStack>
                      <SelectForm
                        options={[{ value: "", label: "All" }, ...user]}
                        title="By User"
                        name={"byUser"}
                        placeholder={"Select User"}
                      />
                    </HStack>
                  </Box>
                  <Button onPress={handleSubmit}>Filter</Button>
                </VStack>
              )}
            </Formik>
          </Actionsheet.Content>
        </Actionsheet>

        <ShowData {...props} filter={filter} />
      </ScrollView>
    );
  else return null;
}

export function LoginPlease(props: any) {
  const { setShowLogin } = useAppContext();
  return (
    <Flex alignItems="center" justifyContent={"center"} flex={1}>
      <Button
        colorScheme="indigo"
        onPress={() => {
          props.navigation.dispatch(DrawerActions.closeDrawer());
          setShowLogin(true);
        }}
        fontWeight={"600"}
        fontSize={"xl"}
      >
        Login Please...
      </Button>
    </Flex>
  );
}

function ShowData(props: any) {
  const [state, setState] = useState({
    data: [],
    isAdmin: false,
  });

  let isAdmin = state.isAdmin;

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      FetchData();
    });

    return unsubscribe;
  }, [props.navigation.isFocused]);

  useEffect(() => {
    FetchData();
  }, [props.filter]);

  function FetchData() {
    console.log(props.filter.byUser);

    let filterBy: string[] = [];
    if (props.filter.Filter) {
      filterBy.push(`byMonth=${props.filter.Filter}`);
    }
    if (props.filter.byUser) {
      filterBy.push(`user=${props.filter.byUser}`);
    }
    if (props.filter.bullID !== 1) {
      filterBy.push(`byMonth=${props.filter.bullID}`);
    }

    fetcher
      .get(`${ENDPOINTS.PREFER}?${filterBy.join("&")}`)
      .then((r) => {
        console.log(r);
        setState(r.data);
      })
      .catch((e) => {
        logger.error(e);
      });
  }

  let flexArr = [1, 1, isAdmin ? 2 : false, 2, 2, 2, 2].filter(Boolean);
  return (
    <ScrollView px="2">
      <Table borderStyle={{ borderWidth: 1 }}>
        <Row
          data={["S.no", "Bull ID", "Created At",isAdmin ? "User" : false, "Result"].filter(
            Boolean
          )}
          flexArr={flexArr}
          style={styles.head}
          textStyle={styles.text}
        />
        <TableWrapper style={styles.wrapper}>
          {/* <Col data={state.tableTitle} style={styles.title} heightArr={[28,28]} textStyle={styles.text}/> */}
          <Rows
            data={state.data.map((i: any, index) => {
              let arr = isAdmin ? [i?.author?.name] : [];
              return [
                `${index + 1} .`,
                i.bullID,
                dayjs(i.createdAt).format("DD-MMM-YYYY"),
                ...arr,
                i.isAccept ? "Accept" : "Reject",
              ];
            })}
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

const Example = () => {
  const CustomIcon = createIcon({
    viewBox: "0 0 24 24",
    // d: 'M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0',
    path: [
      <Path
        d="M4.45,4.66,10,11V21l4-2V11l5.55-6.34A1,1,0,0,0,18.8,3H5.2A1,1,0,0,0,4.45,4.66Z"
        strokeWidth={"1"}
        strokeLinecap="round"
        fill="none"
        stroke="white"
      />,
    ],
  });
  return <CustomIcon size={8} />;
};
