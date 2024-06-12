import { Formik } from "formik";
import {
  Box,
  Checkbox,
  Flex,
  Pressable,
  ScrollView,
  Text,
  Button,
  HStack,
  KeyboardAvoidingView,
} from "native-base";
import React, { useEffect, useState } from "react";
import { style } from "../Components/Container";
import { DatePicker } from "../Components/Form/DatePicker";
import { Inputs } from "../Components/Form/InputForm";
import SelectForm from "../Components/Form/SelectForm";
import { RadioGroupFormik } from "../Components/Form/RadioGroup";
import { FetchByDate, FetchByMonth, FetchByYear } from "../API/dashboard";
import { ENDPOINTS, fetcher } from "../API/Fetcher";
import { DashboardProp } from "./Dashboard";
import { Path } from "../utils/Const";
import { useAppContext } from "../provider/AppContext";
import * as yup from "yup";
import dayjs from "dayjs";
import { Platform } from "react-native";

enum TYPES {
  DATE = 1,
  MONTHLY = 2,
  YEARLY = 3,
}
const ReportSelect = ({ navigation }: DashboardProp) => {
  const { userState } = useAppContext();
  const [selectedReport, setSelectedReport] = useState(0);
  let admin = userState?.isAdmin ?? false;
  const [selectedUser, setSelectedUser] = useState(admin ? "All" : `${userState?.email}` ?? "");
  return (
    <KeyboardAvoidingView h={{
      base: "full",
      lg: "auto"
    }}  behavior={Platform.OS === "ios" ? "padding" : "height"}>
    <ScrollView
      {...style}
      width={"100%"}
      p={5}
      borderRadius={0}
      contentContainerStyle={{
        flex: 1
      }}
    >
      <HStack alignItems={"center"} justifyContent={"space-between"}>
        <Text fontWeight={"normal"} fontSize={"xl"}>
          Reports
        </Text>
        {/* {admin && <Box flex={0.5}>
          <UserDropDown
            value={selectedUser}
            onChange={(e) => {
              setSelectedUser(e);
            }}
          />
        </Box>} */}
      </HStack>
      <Flex flex={1} mt={3} height={"100%"}>
        {[
          {
            label: "By Date",
            value: TYPES.DATE,
            Component: DateFilter,
          },
          {
            label: "By Month",
            value: TYPES.MONTHLY,
            Component: MonthFilter,
          },
          {
            label: "By Yearly",
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
                      <Checkbox
                        rounded={"full"}
                        isChecked={selectedReport === value}
                        color="green"
                        arial-label={value}
                        value={`${value}`}
                        onChange={() => setSelectedReport(value)}
                      />
                    </Flex>
                  );
                }}
              </Pressable>
              {selectedReport === value && (
                <FilterComponent navigation={navigation} selectedUser={selectedUser} />
              )}
            </Box>
          );
        })}
      </Flex>
    </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ReportSelect;

type FilterProp  = {
  selectedUser : any
}
function DateFilter({ navigation, selectedUser }: DashboardProp & FilterProp) {
  return (
    <Formik
      initialValues={{
        bullID: "",
        date: dayjs().format(),
        checkAll: "0",
      }}
      onSubmit={(values) => {
        navigation.navigate(`${Path.FilterByDate}`, {
          values :{ ...values,
          viewAllDate : values.checkAll === "0" ? true : false,
          date :  dayjs(values.date).format(),
          user : selectedUser === "All" ? null : selectedUser}
        });
      }}
    >
      {({ values, handleSubmit }) => (
        <Flex flex={1} m={3} my={2} alignItems={"center"}>
          <Box flex={1} width={"100%"}>
            <Inputs name={"bullID"} title={"Bull ID"} required={false} />
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

function MonthFilter({ navigation,selectedUser }: DashboardProp & FilterProp) {
  return (
    <Formik
      initialValues={{
        date: new Date(),
      }}
      onSubmit={(values) => {
        navigation.navigate(`${Path.FilterByMonth}`, {
          values :{ ...values,
            user : selectedUser === "All" ? null : selectedUser}
        });
      }}
    >
      {({ values, handleSubmit }) => (
        <FilterWrapper handleSubmit={handleSubmit}>
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

function YearFilter({ navigation, selectedUser }: DashboardProp & FilterProp) {
  return (
    <Formik
      initialValues={{
        bullID: "",
        date: new Date(),
      }}
      onSubmit={(values) => {
        navigation.navigate(`${Path.FilterByYear}`, {
          values :{ ...values,
            user : selectedUser === "All" ? null : selectedUser}
        });
      }}
      validationSchema={yup.object().shape({
        bullID: yup.string().required("Required"),
      })}
    >
      {({ values, handleSubmit }) => (
        <FilterWrapper handleSubmit={handleSubmit}>
          <Inputs name={"bullID"} title={"Bull ID"} required={true} />
          <DatePicker
            name={"month"}
            label={"By year"}
            type={"year"}
            placeholder={"All Date"}
          />
        </FilterWrapper>
      )}
    </Formik>
  );
}

const UserDropDown = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: any) => void;
}) => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    fetcher.get(ENDPOINTS.ALLUSER).then((e) => {
      setUser(e.data);
    });
  }, []);

  return (
    <SelectForm
      options={[{ value: "All", label: "All user" }, ...user]}
      title=""
      placeholder={"Select User"}
      onChage={onChange}
      value={value}
    />
  );
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


