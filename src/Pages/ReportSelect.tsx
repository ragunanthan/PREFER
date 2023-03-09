import { Formik } from "formik";
import {
  Box,
  Checkbox,
  Flex,
  Pressable,
  ScrollView,
  Text,
  Button,
} from "native-base";
import React, { useState } from "react";
import MonthPicker from "react-native-month-year-picker";
import { style } from "../Components/Container";
import { DatePicker } from "../Components/Form/DatePicker";
import { Inputs } from "../Components/Form/InputForm";
import { SelectFormFormik } from "../Components/Form/SelectForm";
import { RadioGroupFormik } from "../Components/Form/RadioGroup";
const ReportSelect = () => {
  const [selectedReport, setSelectedReport] = useState(0);
  return (
    <ScrollView
      {...style}
      width={"100%"}
      p={5}
      borderRadius={0}
      contentContainerStyle={{
        flexGrow: 1,
      }}
    >
      <Text fontWeight={"normal"} fontSize={"xl"}>
        Reports
      </Text>
      <Flex flex={1} mt={3} height={"100%"}>
        {[
          {
            label: "By Date",
            value: 1,
          },
          {
            label: "Monthly",
            value: 2,
          },
          {
            label: "Yearly",
            value: 3,
          },
        ].map(({ label, value }) => (
          <Box flex={selectedReport === value ? 1 : 0}>
            <Pressable
              bg={"lightgrey"}
              my={3}
              onPress={() => setSelectedReport(value)}
              borderRadius={2}
            >
              {({ isHovered, isFocused, isPressed }) => {
                return (
                  <Flex
                    p={4}
                    flexDir={"row"}
                    bg={isFocused ? "red" : "green"}
                    justifyContent={"space-between"}
                  >
                    <Text>{label}</Text>
                    <Checkbox
                      rounded={"full"}
                      isChecked={selectedReport === value}
                      color="green"
                      value={`${value}`}
                    />
                  </Flex>
                );
              }}
            </Pressable>
            {selectedReport === value && <FilterComponent />}
          </Box>
        ))}
      </Flex>
    </ScrollView>
  );
};

export default ReportSelect;

function FilterComponent() {
  // const [user, setUser] = useState([]);
  // const [filter, setFilter] = useState({});
  // const isFocused = useIsFocused();

  // useEffect(() => {
  //   const unsubscribe = props.navigation.addListener("focus", () => {
  //     if (userState === null) {
  //       props.navigation.navigate("Login");
  //     }
  //   });
  //   fetcher.get(ENDPOINTS.ALLUSER).then((e) => {
  //     setUser(e.data);
  //   });
  //   return unsubscribe;
  // }, [userState]);
  return (
    <Formik
      initialValues={{
        bullID: "",
        date: "1",
        checkAll : "0",
        user: "",
      }}
      onSubmit={() => {}}
    >
      {({ values }) => (
        <Flex flex={1} m={3} my={2} alignItems={"center"} >
          <Box flex={1} width={"100%"}>
            <Inputs name={"bullID"} title={"Bull ID"} />
            <Box my={2}>
            <RadioGroupFormik title={""} name={"checkAll"} option={[{label : "All Date", value : "0"}, {label : "By date", value : "1"}]} />
            </Box>
            {values.checkAll === "1" && <DatePicker name={"date"} label={"Date"} placeholder={"All Date"} />}
          </Box>
          {/* <SelectFormFormik
            options={[{ value: "", label: "All" }, ...user]}
            title="By User"
            placeholder={"Select User"}
            name={"user"}              />
                */}
          <Button width={"40"} onPress={() => {

          }}>Filter</Button>
        </Flex>
      )}
    </Formik>
  );
}
