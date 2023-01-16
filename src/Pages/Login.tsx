import { Formik } from "formik";
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Input,
  VStack,
  Text,
} from "native-base";
import React from "react";
import { Inputs } from "../Components/Form/InputForm";
import * as yup from "yup";
import { login, signup } from "../API/auth";
import { logger } from "../utils/logger";
import { setSecureData } from "../keychain/secureStorage";
import { useAppContext } from "../provider/AppContext";
import { fetcher } from "../API/Fetcher";

export default function Login(props: any) {
  let { values } = props.route.params;
  const { userState, setUserState } = useAppContext();
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        ...(values ?? {}),
      }}
      enableReinitialize
      onSubmit={async (values: any) => {
        login(values)
          .then((e) => {
            if (!e.data.error) {
              let data: any = {
                accessToken: e.data.accessToken,
                refreshToken: e.data.refreshToken,
                email: values.email,
                userId: e.data.userId,
              };
              fetcher.defaults.headers["authorization"] =  `Bearer ${e.data.accessToken}`;
              setSecureData("userData", data);
              setUserState(data);
              props.navigation.navigate("Home");
            }
          })
          .catch((e) => {
            logger.error(e);
          });
      }}
      validationSchema={yup.object().shape({
        email: yup.string().email().required("Email"),
        password: yup.string().required("Password"),
      })}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <Center w="100%">
          <Box safeArea p="2" w="90%" maxW="290" py="8">
            <Heading
              size="lg"
              color="coolGray.800"
              _dark={{
                color: "warmGray.50",
              }}
              fontWeight="semibold"
            >
              Welcome
            </Heading>
            <Heading
              mt="1"
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
              fontWeight="medium"
              size="xs"
            >
              Login up to continue!
            </Heading>
            <VStack space={3} mt="5">
              <Inputs form={false} name={"email"} title={"Email"} />
              <Inputs
                form={false}
                type="password"
                name={"password"}
                title={"Password"}
              />
              <Button mt="2" colorScheme="indigo" onPress={handleSubmit}>
                Login up
              </Button>
              <Text onPress={() => props.navigation.navigate("Signup")}>
                Sign up
              </Text>
            </VStack>
          </Box>
        </Center>
      )}
    </Formik>
  );
}

export function Signup({ navigation }: any) {
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        userName: "",
      }}
      onSubmit={(values: any) => {
        signup(values)
          .then((e: any) => {
            if (!e?.data?.error) {
              navigation.navigate("Login", {
                email: values.email,
                password: values.password,
              });
            }
          })
          .catch((e) => {
            logger.error(e);
          });
      }}
      validationSchema={yup.object().shape({
        userName: yup.string().required("username"),
        email: yup.string().email().required("Email"),
        password: yup.string().required("Password"),
      })}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <Center w="100%">
          <Box safeArea p="2" w="90%" maxW="290" py="8">
            <Heading
              size="lg"
              color="coolGray.800"
              _dark={{
                color: "warmGray.50",
              }}
              fontWeight="semibold"
            >
              Welcome
            </Heading>
            <Heading
              mt="1"
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
              fontWeight="medium"
              size="xs"
            >
              Sign up to continue!
            </Heading>
            <VStack space={3} mt="5">
              <Inputs form={false} name={"userName"} title={"User Name"} />
              <Inputs form={false} name={"email"} title={"Email"} />
              <Inputs
                form={false}
                type="password"
                name={"password"}
                title={"Password"}
              />
              <Button mt="2" colorScheme="indigo" onPress={handleSubmit}>
                Sign up
              </Button>
            </VStack>
          </Box>
        </Center>
      )}
    </Formik>
  );
}
