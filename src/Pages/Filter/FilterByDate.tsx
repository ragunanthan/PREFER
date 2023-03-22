import dayjs from "dayjs";
import { Box, Flex, HStack, Text, View } from "native-base";
import React, { useEffect, useMemo, useState } from "react";
import { RefreshControl } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { FetchByDate } from "../../API/dashboard";
import TableHeader from "../../Components/Table/TableHeader";
import {
  borderBottomTableStyle,
  borderTableStyle,
} from "../../Components/Table/TableStyle";
import { logger } from "../../utils/logger";

export default function FilterByDate(props: any) {
  let { route } = props;
  const { values } = route.params;
  console.log(values);

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
  }, [values, page]);

  function FetchData() {
    setFetching(true);

    FetchByDate({
      bullID: values?.bullID ?? null,
      date: values?.checkAll ? null : values?.date,
      authorId: values?.user ?? null,
    })
      .then((r) => {
        setState({
          data: [...state.data, ...r.data],
          isAdmin: true,
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

  const onRefersh = () => {};
  return (
    <>
      <TableHeader
        Header={[
          { label: "S.no", space: 0.5, style: { alignItems: "center" } },
          isAdmin && !values.user ? { label: "User", space: 1 } : false,
          { label: "Bull ID", space: 0.6, style: { alignItems: "center" } },
          {
            label: "Ejakulation No",
            space: 0.6,
            style: { alignItems: "center" },
          },
          { label: "Result", space: 0.8, style: { alignItems: "center" } },
        ]}
      />
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
            <Container
              isAdmin={isAdmin}
              data={data}
              item={item}
              key={index}
              index={index}
              lastItem={lastItem}
            />
          );
        }}
      />
    </>
  );
}

function Container({
  data,
  item,
  index,
  lastItem,
  isAdmin,
}: {
  isAdmin: boolean;
  data: any;
  item: string;
  index: number;
  lastItem: boolean;
}) {
  return (
    <View key={index} pb={lastItem ? "32" : 0}>
      <Box {...borderBottomTableStyle} {...borderBottomTableStyle(true)}>
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
}
