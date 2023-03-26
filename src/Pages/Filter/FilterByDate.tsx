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
import { useAppContext } from "../../provider/AppContext";
import { logger } from "../../utils/logger";

export default function FilterByDate(props: any) {
  let { route } = props;
  const { values } = route.params;
  const [state, setState] = useState<any>([]);
  const { userState } = useAppContext();
  let isAdmin = userState?.isAdmin ?? false;
  const [fetching, setFetching] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
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

    FetchByDate({
      bullID: values?.bullID ?? null,
      date: values?.viewAllDate ? null : values?.date,
      authorId: values?.user ?? null,
      page: page,
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
        setFetching(false);
      });
  }

  let ViewData = useMemo(
    () =>
      state
        ? state.reduce((pre: any, curr: any) => {
          let date = dayjs(curr.createdAt).format("DD-MMM-YYYY");
          pre[date] = pre[date] ? [...pre[date], curr] : [curr];
          return pre;
        }, {})
        : {},
    [state]
  );

  const renderFooter = () => {
    if (!fetching) return null;

    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  };
  return (
    <>
      <TableHeader
        Header={[
          { label: "S.no", space: 0.5, style: { alignItems: "center" } },
          isAdmin && !values.user ? { label: "User", space: 1 } : false,
          { label: "Bull ID", space: 0.6, style: { alignItems: "center" } },
          {
            label: "Ej.No",
            space: 0.6,
            style: { alignItems: "center" },
          },
          { label: "Result", space: 0.8, style: { alignItems: "center" } },
        ]}
      />
      <FlatList
        data={Object.keys(ViewData)}
        ListEmptyComponent={
          Object.keys(ViewData).length ? null : <Text>No Data found</Text>
        }
        // refreshControl={
        //   <RefreshControl refreshing={false} onRefresh={onRefersh} />
        // }
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (!fetching && hasMore) setPage((pre) => pre + 1);
        }}
        ListFooterComponent={renderFooter}
        renderItem={({ item, index }: { item: any; index: any }) => {
          let data: any[] = ViewData[item];
          return (
            <Container
              isAdmin={isAdmin}
              data={data}
              item={item}
              key={index}
              index={index}
              values={values}
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
  values,
  isAdmin,
}: {
  isAdmin: boolean;
  data: any;
  item: string;
  index: number;
  values : any
}) {
  return (
    <View key={index}>
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
          {isAdmin &&  !values.user ? (
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
