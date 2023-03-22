import dayjs from "dayjs";
import { Box, Flex, HStack, Text, View } from "native-base";
import React, { useEffect, useMemo, useState } from "react";
import { RefreshControl } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { FetchByDate, FetchByMonth, FetchByYear } from "../../API/dashboard";
import TableHeader from "../../Components/Table/TableHeader";
import {
  borderBottomTableStyle,
  borderTableStyle,
} from "../../Components/Table/TableStyle";
import { logger } from "../../utils/logger";
export default function FilterByYear(props: any) {
  let { route } = props;
  const { values } = route.params;

  const [state, setState] = useState<any>([]);
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

    FetchByYear({
      year: values.date
        ? dayjs(values.date).format("YYYY")
        : dayjs(new Date()).format("YYYY"),
      authorId: 0,
      bullID: 408,
    })
      .then((r) => {
        setState([...state, ...r.data]);
        setFetching(false);
      })
      .catch((e) => {
        logger.error(e);
      });
  }
  console.log(state);

  const onRefersh = () => {};
  return (
    <>
      <TableHeader
        Header={[
          { label: "S.no", space: 0.5, style: { alignItems: "center" } },

          { label: "Month", space: 0.6, style: { alignItems: "center" } },
          {
            label: "No of Ejaculates collected",
            space: 0.6,
            style: { alignItems: "center" },
          },
          {
            label: "No of Ejaculates accepted",
            space: 0.6,
            style: { alignItems: "center" },
          },
          {
            label: "Ejaculates accepted (%)",
            space: 0.8,
            style: { alignItems: "center" },
          },
        ]}
      />
      <FlatList
        data={state}
        ListEmptyComponent={state.length ? null : <Text>No Data found</Text>}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRefersh} />
        }
        onEndReachedThreshold={0.02}
        onEndReached={() => {
          if (!fetching) setPage((pre) => pre + 1);
        }}
        renderItem={({ item, index }: { item: any; index: any }) => {
          let lastItem = state.length - 1 === index;
          console.log(item);

          return (
            <Container
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
  item,
  index,
  lastItem,
}: {
  item: {
    bullID: string;
    month: number;
    ejac_collected: string;
    ejac_accepted: string;
    ejac_percent: string;
  };
  index: number;
  lastItem: boolean;
}) {
  return (
    <View key={index} pb={lastItem ? "32" : 0}>
      <HStack
        key={index}
        // {...borderBottomTableStyle(data.length - 1 === index)}
      >
        <Flex flex={0.5} alignItems={"center"} {...borderTableStyle}>
          <Text>{index + 1}</Text>
        </Flex>
        <Flex flex={0.6} alignItems={"center"} {...borderTableStyle}>
          <Text>{dayjs().month(item.month - 1).format("MMM")}</Text>
        </Flex>
        <Flex flex={0.6} alignItems={"center"} {...borderTableStyle}>
          <Text>{item.ejac_collected}</Text>
        </Flex>
        <Flex flex={0.6} alignItems={"center"} {...borderTableStyle}>
          <Text>{item.ejac_accepted}</Text>
        </Flex>
        <Flex flex={0.6} alignItems={"center"} {...borderTableStyle}>
          <Text>{item.ejac_percent}</Text>
        </Flex>
        {/* <Flex flex={0.8} alignItems={"center"} {...borderTableStyle}>
          <Text color={item.isAccept ? "green.600" : "red.600"}>
            {item.isAccept ? "Accept" : "Reject"}
          </Text>
        </Flex> */}
      </HStack>
    </View>
  );
}
