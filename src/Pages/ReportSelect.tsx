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
import React, { useEffect, useState } from "react";
import MonthPicker from "../Components/Form/MonthPicker";
import { style } from "../Components/Container";
import { DatePicker } from "../Components/Form/DatePicker";
import { Inputs } from "../Components/Form/InputForm";
import { SelectFormFormik } from "../Components/Form/SelectForm";
import { RadioGroupFormik } from "../Components/Form/RadioGroup";
import { FetchByDate, FetchByMonth, FetchByYear } from "../API/dashboard";
import { ENDPOINTS, fetcher } from "../API/Fetcher";
import { DashboardProp } from "./Dashboard";
import { Path } from "../utils/Const";

enum TYPES {
  DATE = 1,
  MONTHLY = 2,
  YEARLY = 3,
}
const ReportSelect = ({ navigation }: DashboardProp) => {
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
            value: TYPES.DATE,
            Component: DateFilter,
          },
          {
            label: "Monthly",
            value: TYPES.MONTHLY,
            Component: MonthFilter,
          },
          {
            label: "Yearly",
            value: TYPES.YEARLY,
            Component: YearFilter,
          },
        ].map(({ label, value, Component }) => {
          let FilterComponent = Component;
          return (
            <Box flex={selectedReport === value ? 1 : 0} key={value}>
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
                      borderRadius={3}
                    >
                      <Text>{label}</Text>
                      {/* <Checkbox
                        rounded={"full"}
                        isChecked={selectedReport === value}
                        color="green"
                        arial-label={value}
                        value={`${value}`}
                        onChange={() => setSelectedReport(value)}
                      /> */}
                    </Flex>
                  );
                }}
              </Pressable>
              {selectedReport === value && (
                <FilterComponent navigation={navigation} />
              )}
            </Box>
          );
        })}
      </Flex>
    </ScrollView>
  );
};

export default ReportSelect;

function DateFilter({ navigation }: DashboardProp) {
  const { UserDropDown } = useUserDropDown({ withBullID: true });
  return (
    <Formik
      initialValues={{
        bullID: "",
        date: "1",
        checkAll: "0",
        user: "",
      }}
      onSubmit={(values) => {
        navigation.navigate(`${Path.FilterByDate}`, {
          values,
        });
      }}
    >
      {({ values, handleSubmit }) => (
        <Flex flex={1} m={3} my={2} alignItems={"center"}>
          <Box flex={1} width={"100%"}>
            <UserDropDown />
            <Box my={2}>
              <RadioGroupFormik
                title={""}
                name={"checkAll"}
                option={[
                  { label: "All Date", value: "0" },
                  { label: "By date", value: "1" },
                ]}
              />
            </Box>
            {values.checkAll === "1" && (
              <DatePicker
                name={"date"}
                label={"Date"}
                placeholder={"All Date"}
              />
            )}
          </Box>

          <Button width={"40"} onPress={handleSubmit}>
            Filter
          </Button>
        </Flex>
      )}
    </Formik>
  );
}

function MonthFilter({ navigation }: DashboardProp) {
  const { UserDropDown } = useUserDropDown({ withBullID: false });
  return (
    <Formik
      initialValues={{
        bullID: "",
        date: new Date(),
        checkAll: "0",
        user: "",
      }}
      onSubmit={(values) => {
        navigation.navigate(`${Path.FilterByMonth}`, {
          values,
        });
      }}
    >
      {({ values, handleSubmit }) => (
        <FilterWrapper handleSubmit={handleSubmit}>
          <UserDropDown />
          <DatePicker
                name={"date"}
                label={"By month"}
                type={"month"}
                placeholder={"All Date"}
              />
        </FilterWrapper>
      )}
    </Formik>
  );
}

function YearFilter({ navigation }: DashboardProp) {
  const { UserDropDown } = useUserDropDown({
    withBullID: true,
    withBullIDReq: true,
  });
  return (
    <Formik
      initialValues={{
        bullID: "",
        date: new Date(),
        user: "",
      }}
      onSubmit={(values) => {
        console.log("", values);
        navigation.navigate(`${Path.FilterByYear}`, {
          values,
        });
      }}
    >
      {({ values, handleSubmit }) => (
        <FilterWrapper handleSubmit={handleSubmit}>
          <UserDropDown />
          <DatePicker
                name={"month"}
                label={"By year"}
                type={"month"}
                placeholder={"All Date"}
              />
       
        </FilterWrapper>
      )}
    </Formik>
  );
}

const useUserDropDown = ({
  withBullID,
  withBullIDReq = false,
}: {
  withBullID: boolean;
  withBullIDReq?: boolean;
}) => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    fetcher.get(ENDPOINTS.ALLUSER).then((e) => {
      setUser(e.data);
    });
  }, []);
  const UserDropDown = () => (
    <>
      <SelectFormFormik
        options={[{ value: "", label: "All" }, ...user]}
        title="By User"
        placeholder={"Select User"}
        name={"user"}
      />
      {withBullID && (
        <Inputs name={"bullID"} title={"Bull ID"} required={withBullIDReq} />
      )}
    </>
  );

  return { UserDropDown };
};

const FilterWrapper = ({
  children,
  handleSubmit,
}: {
  children: any;
  handleSubmit: () => void;
}) => {
  return (
    <Flex flex={1} m={3} my={2} alignItems={"center"}>
      <Box flex={1} width={"100%"}>
        {children}
      </Box>

      <Button width={"40"} onPress={handleSubmit}>
        Filter
      </Button>
    </Flex>
  );
};
