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
  Modal,
  Toast,
  useToast,
} from "native-base";
import React, { useState } from "react";
import { Inputs } from "../Components/Form/InputForm";
import * as yup from "yup";
import { login, signup } from "../API/auth";
import { setSecureData } from "../keychain/secureStorage";
import { useAppContext } from "../provider/AppContext";
import { fetcher } from "../API/Fetcher";
import { ToastAlert } from "../Components/Toast";


export default function Logins(props: any) {
  const toast = useToast();
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
              let data: any = e.data;
              fetcher.defaults.headers["authorization"] =  `Bearer ${e.data.data.accessToken}`;
              setSecureData("userData", data);
              setUserState(data.data);
              props.navigation.navigate("Home");
              toast.show({
                id: "login",
                render: ({ id }) => {
                  return (
                    <ToastAlert
                      id={id}
                      title={"Successfully  login"}
                      status={"success"}
                      variant="solid"
                    />
                  );
                },
                variant: "left-accent",
                duration : 500
              });
            }
          })
          .catch((e) => {
            console.log(e.response);
            
            toast.show({
              id: "loginerror",
              render: ({ id }) => {
                return (
                  <ToastAlert
                    id={id}
                    title={e.response.data.message}
                    status={"error"}
                    variant="solid"
                  />
                );
              },
              variant: "left-accent",
            });
          });
      }}
      validationSchema={yup.object().shape({
        email: yup.string().required("Required"),
        password: yup.string().required("Required"),
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
              <Inputs  name={"email"} title={"Username"} />
              <Inputs
                
                type="password"
                name={"password"}
                title={"Password"}
              />
              <Button mt="2" colorScheme="indigo" onPress={handleSubmit}>
                Login
              </Button>
              {/* <Text onPress={() => props.navigation.navigate("Signup")}>
                Sign up
              </Text> */}
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
              <Inputs  name={"userName"} title={"User Name"} />
              <Inputs  name={"email"} title={"Email"} />
              <Inputs
                
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
