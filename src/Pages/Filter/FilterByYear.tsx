import dayjs from "dayjs";
import { Box, Flex, Heading, HStack, ScrollView, Text, View, VStack } from "native-base";
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
        setState(r.data);
        setFetching(false);
      })
      .catch((e) => {
        logger.error(e);
      });
  }

  return (
   <VStack space={3} flex={1}>
    <HStack justifyContent={"space-between"} pt={0} p={3}>
    <Heading size={"md"}>Year : {dayjs(values.date).format("YYYY") ?? 0}</Heading>
    <Heading size={"md"}>Bull : {values.bullID ?? 0}</Heading>
    </HStack>
     <ScrollView px={2}>
      <VStack space={4}>
        {state.map((item: any, index: any) => {
          return <CardContainer item={item} key={index} />;
        })}
      </VStack>
    </ScrollView>
   </VStack>
  );
}

function CardContainer({
  item,
}: {
  item: {
    bullID: string;
    month: number;
    ejac_collected: string;
    ejac_accepted: string;
    ejac_percent: string;
  };
}) {
  return (
    <VStack space={"2"} borderRadius={4} shadow="4" bg={"white"} p={3}>
      <HStack justifyContent={"space-between"}>
        <Text fontSize={"md"} fontWeight={"bold"}>
          {dayjs()
            .month(item.month - 1)
            .format("MMMM")}
        </Text>
        <Text>{item.ejac_percent}%</Text>
      </HStack>
      <VStack pl={3}>
        <HStack>
          <Text flex={0.5}>No of ejaculates : </Text>
          <Text>{item.ejac_collected}</Text>
        </HStack>
        <HStack>
          <Text flex={0.5}>Accepted ejaculates :</Text>
          <Text>{item.ejac_accepted}</Text>
        </HStack>
      </VStack>
    </VStack>
  );
}
