import dayjs from "dayjs";
import {
  Box,
  Flex,
  HStack,
  Text,
  View,
  VStack,
  FlatList,
  Heading,
} from "native-base";
import React, { useEffect, useMemo, useState } from "react";
import { RefreshControl } from "react-native";
import {FetchByMonth } from "../../API/dashboard";
import { logger } from "../../utils/logger";

export default function FilterByMonth(props: any) {
  let { route } = props;
  const { values } = route.params;

  const [state, setState] = useState<any>([]);
  const [fetching, setFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      setState([]);
      setPage(1);
    });

    return unsubscribe;
  }, [props.navigation.isFocused]);

  useEffect(() => {
    FetchData();
  }, [values, page]);

  function FetchData() {
    setFetching(true);

    FetchByMonth({
      year: values.date
        ? dayjs(values.date).format("YYYY")
        : dayjs(new Date()).format("YYYY"),
      month: values.date
        ? dayjs(values.date).format("M")
        : dayjs(new Date()).format("M"),
        authorId: values?.user ?? null,
      page 
    })
      .then((r) => {
        if (r.data.length === 0) {
          setHasMore(false);
        } else {
        setState([...state, ...r.data]);
        }
        setFetching(false);
      })
      .catch((e) => {
        logger.error(e);
      });
  }

  const renderFooter = () => {
    if (!fetching) return null;

    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  };
  const Separator = () => <View m={2} />;

  return (
    <VStack flex={1}>
      <HStack justifyContent={"space-between"} pt={0} p={3}>
        <Heading size={"md"} fontWeight={"medium"}>
          {dayjs(values.date).format("MMM")} {dayjs(values.date).format("YYYY") ?? 0}
        </Heading>
      </HStack>
      <FlatList
        data={state}
        ListEmptyComponent={state.length ? null : <Text>No Data found</Text>}
        // refreshControl={
        //   <RefreshControl refreshing={false} onRefresh={onRefersh} />
        // }
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (!fetching && hasMore) setPage((pre) => pre + 1);
        }}
        ListFooterComponent={renderFooter}
        ItemSeparatorComponent={Separator}
        renderItem={({ item, index }: { item: any; index: any }) => {
          return <Container item={item} key={index} index={index} />;
        }}
      />
    </VStack>
  );
}

function Container({
  item,
  index,
}: {
  item: {
    bullID: string;
    month: number;
    ejac_collected: string;
    ejac_accepted: string;
    ejac_percent: string;
  };
  index: number;
}) {
  return (
    <VStack space={"2"} borderRadius={4} shadow="4" bg={"white"} p={3} mx={3}>
      <HStack justifyContent={"space-between"}>
        <Text fontSize={"md"} fontWeight={"normal"}>
          {index + 1}.
        </Text>
        <Text fontSize={"md"} fontWeight={"semibold"}>
          {" "}
          Bull : {item.bullID}
        </Text>
      </HStack>
      <VStack pl={3} space={1}>
        <HStack>
          <Text flex={0.6}>No of ejaculates : </Text>
          <Text>{item.ejac_collected}</Text>
        </HStack>
        <HStack>
          <Text flex={0.6}>Accepted ejaculates :</Text>
          <Text>{item.ejac_accepted}</Text>
        </HStack>
        <HStack>
          <Text flex={0.6}>Overall percentage :</Text>
          <Text>{item.ejac_percent}%</Text>
        </HStack>
      </VStack>
    </VStack>
  );
}
