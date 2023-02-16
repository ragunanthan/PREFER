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
} from "native-base";
import React, { useState } from "react";
import { Inputs } from "../Components/Form/InputForm";
import * as yup from "yup";
import { login, signup } from "../API/auth";
import { logger } from "../utils/logger";
import { setSecureData } from "../keychain/secureStorage";
import { useAppContext } from "../provider/AppContext";
import { fetcher } from "../API/Fetcher";

export const Login = (props: any) => {
  const { setUserState, showLogin, setShowLogin } = useAppContext();
  if (!showLogin) return null;
  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
          // ...(values ?? {}),
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
                  ...e.data
                };
                fetcher.defaults.headers[
                  "authorization"
                ] = `Bearer ${e.data.accessToken}`;
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
          <Modal isOpen={showLogin} onClose={() => setShowLogin(false)}>
            <Modal.Content maxWidth="400px">
              <Modal.CloseButton />
              <Modal.Header>
                <Heading>Please Login</Heading>
              </Modal.Header>
              <Modal.Body>
                <Box w="100%" p="2">
                  <VStack>
                    <Inputs  name={"email"} title={"Email"} />
                    <Inputs
                      
                      type="password"
                      name={"password"}
                      title={"Password"}
                    />
                  </VStack>
                </Box>
              </Modal.Body>
              <Modal.Footer>
                <Button.Group space={2}>
                  <Button
                    variant="ghost"
                    colorScheme="blueGray"
                    onPress={() => {
                      setShowLogin(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    colorScheme="indigo"
                    onPress={() => {
                      handleSubmit();
                      setShowLogin(false);
                    }}
                  >
                    Login
                  </Button>
                </Button.Group>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
        )}
      </Formik>
    </>
  );
};


export default function Logins(props: any) {
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
              <Inputs  name={"email"} title={"Email"} />
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
