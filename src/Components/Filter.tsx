import { Inputs } from "../Components/Form/InputForm";
import { Formik } from "formik";
import SelectForm from "../Components/Form/SelectForm";
import { RadioGroupFormik } from "../Components/Form/RadioGroup";
import { Button, Actionsheet, Flex,  } from "native-base";
import {
    Box,
    HStack,
    VStack,
  } from "native-base";
export const Filter = ({ onClose, isOpen }: any) => {
    return (
      <Actionsheet isOpen={isOpen} onClose={() => onClose({})}>
        <Actionsheet.Content>
          <Formik
            initialValues={{
              Filter: "1",
              bullID: "",
            }}
            onSubmit={(values) => onClose(values)}
            enableReinitialize
          >
            {({ handleSubmit }) => (
              <VStack height={"sm"}  px={4}  justifyContent={"space-between"}>
                <Box>
                
                  <RadioGroupFormik
                    name={"Filter"}
                    option={[
                      { value: "1", label: "Date" },
                      { value: "2", label: "Month" },
                      { value: "3", label: "Year" },
                    ]}
                    title=""
                  />
                 
                  <HStack>
                    <Inputs
                      title="By Bull ID"
                      name={"bullID"}
                      keyboardType={"numeric"}
                      
                    />
                  </HStack>
  
                </Box>
                <Flex flexDir={"row"}  >
                <Button flex={1} mr={2} borderRadius={1} bg={"gray.600"} onPress={handleSubmit}>Rest</Button>
                <Button flex={1} ml={2} borderRadius={1} bg={"green.600"} onPress={handleSubmit}>Filter</Button>
                </Flex>
              </VStack>
            )}
          </Formik>
        </Actionsheet.Content>
      </Actionsheet>
    );
  };
  