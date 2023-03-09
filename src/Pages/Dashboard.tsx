import {
  Box,
  createIcon,
  FlatList,
  Flex,
  HStack,
  ScrollView,
  Text,
  View,
  VStack,
} from "native-base";
import React, { useEffect, useMemo, useState } from "react";
import { ENDPOINTS, fetcher } from "../API/Fetcher";
import { logger } from "../utils/logger";
import { RefreshControl, StyleSheet } from "react-native";
import { Button, Actionsheet, useDisclose } from "native-base";
import { useAppContext } from "../provider/AppContext";
import { DrawerActions, useIsFocused } from "@react-navigation/native";
import { Fab } from "native-base";
import dayjs from "dayjs";
import { FilterIcon } from "../Components/FilterIcon";
import { Filter } from "../Components/Filter";
import SelectForm from "../Components/Form/SelectForm";
import ReportSelect from "./ReportSelect";

export default function Default() {
  return <ReportSelect />
}


function Dashboard(props: any) {
  const { isOpen, onOpen, onClose } = useDisclose();
  const { userState } = useAppContext();
  const [user, setUser] = useState([]);
  const [filter, setFilter] = useState({});
  const isFocused = useIsFocused();

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
      <View backgroundColor={"white"}>
       {isFocused && <Fab
          placement="bottom-right"
          onPress={onOpen}
          backgroundColor={"black"}
          icon={<FilterIcon />}
        />}

        <Filter
          isOpen={isOpen}
          onClose={(values: any) => {
            setFilter(values);
            onClose();
          }}
          user={user}
        />
                <HStack>
                    <SelectForm
            options={[{ value: "", label: "All" }, ...user]}
            title="By User"
            placeholder={"Select User"}
            value={""}
            onChage={() => []} error={""} touched={false}                    />
                  </HStack>
        <ShowData {...props} filter={filter} />
      </View>
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
  const [state, setState] = useState<any>({
    data: [],
    isAdmin: false,
  });

  let isAdmin = state.isAdmin;
  const [fetching, setFetching] = useState(false);
  const [page, setPage] = useState(1);
  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      FetchData();
    });

    return unsubscribe;
  }, [props.navigation.isFocused]);

  useEffect(() => {
    FetchData();
  }, [props.filter, page]);

  function FetchData() {
    setFetching(true);
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
      .get(`${ENDPOINTS.PREFER}/${page}?${filterBy.join("&")}`)
      .then((r) => {
        setState({
          data: [...state.data, ...r.data.data],
          isAdmin: r.data.isAdmin,
        });
        setFetching(false);
      })
      .catch((e) => {
        logger.error(e);
      });
  }

  let ViewData = useMemo(
    () =>
      state
        ? {
            ...state,
            data: state.data.reduce((pre: any, curr: any) => {
              let date = dayjs(curr.createdAt).format("DD-MMM-YYYY");
              pre[date] = pre[date] ? [...pre[date], curr] : [curr];
              return pre;
            }, {}),
          }
        : { data: [] },
    [state]
  );


  let borderBottomTableStyle: any = (ifAdded: any) =>
    ifAdded
      ? {
          borderBottomColor: "coolGray.200",
          borderBottomStyle: "solid",
          borderBottomWidth: "1",
        }
      : {};

  let borderTableStyle: any = {
    borderRightStyle: "solid",
    borderRightColor: "coolGray.200",
    borderRightWidth: 1,
    justifyContent: "center",
    height: 9,
    ...borderBottomTableStyle(true),
  };

  const onRefersh = () => {};
  return (
    <>
      <HStack space={3} bg={"blue.300"}>
        {[
          { label: "S.no", space: 0.5, style: { alignItems: "center" } },
          isAdmin && !props.filter.byUser ? { label: "User", space: 1 } : false,
          { label: "Bull ID", space: 0.6, style: { alignItems: "center" } },
          { label: "Ejakulation No", space: 0.6, style: { alignItems: "center" } },
          { label: "Result", space: 0.8, style: { alignItems: "center" } },
        ]
          .filter(Boolean)
          .map(({ space, label, style }: any, index) => (
            <Box key={index} flex={space} {...borderTableStyle} {...style}>
              <Text fontWeight={"bold"}>{label}</Text>
            </Box>
          ))}
      </HStack>
      <FlatList
        data={Object.keys(ViewData.data)}
        ListEmptyComponent={
          Object.keys(ViewData.data).length ? null : <Text>No Data found</Text>
        }
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRefersh} />
        }
        onEndReachedThreshold={0.02}
        onEndReached={() => {
          if (!fetching) setPage((pre) => pre + 1);
        }}
        renderItem={({ item, index }: { item: any; index: any }) => {
          let data: any[] = ViewData.data[item];
          let lastItem = Object.keys(ViewData.data).length - 1 === index;
          return (
            <View key={index} pb={lastItem ? "32" : 0}>
              <Box
                {...borderBottomTableStyle}
                {...borderBottomTableStyle(true)}
              >
                <Text fontSize={"md"} fontWeight={"medium"} px={2} py={3}>
                  {item}
                </Text>
              </Box>
              {data.map((val: any, index: number) => (
                <HStack
                  key={index}
                  {...borderBottomTableStyle(data.length - 1 === index)}
                >
                  <Flex flex={0.5} alignItems={"center"} {...borderTableStyle}>
                    <Text>{index + 1}</Text>
                  </Flex>
                  {isAdmin && val?.author?.name ? (
                    <Flex flex={1} pl={1} {...borderTableStyle}>
                      <Text>{val.author.name}</Text>
                    </Flex>
                  ) : null}
                  <Flex flex={0.6} alignItems={"center"} {...borderTableStyle}>
                    <Text>{val.bullID}</Text>
                  </Flex>
                  <Flex flex={0.6} alignItems={"center"} {...borderTableStyle}>
                    <Text>{val.ejakulationNo}</Text>
                  </Flex>

                  <Flex flex={0.8} alignItems={"center"} {...borderTableStyle}>
                    <Text color={val.isAccept ? "green.600" : "red.600"}>
                      {val.isAccept ? "Accept" : "Reject"}
                    </Text>
                  </Flex>
                </HStack>
              ))}
            </View>
          );
        }}
      />
    </>
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

 