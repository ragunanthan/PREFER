
import { useField } from 'formik';
import { Flex, FormControl, HStack, Radio } from 'native-base';
import React from 'react';

export function RadioGroup({
    title,
    name,
    option,
  }: {
    title: string;
    name: string;
    option: { value: string; label: string }[];
  }) {
    const [field, , helper] = useField(name);
  
    return (
      <Flex flexDirection={"row"} alignItems="center">
        <FormControl.Label flex={2}>{title}</FormControl.Label>
  
        <Radio.Group
          flex={4}
          name="exampleGroup"
          value={field.value}
          onChange={(e) => helper.setValue(`${e}`)}
        >
          <HStack space={4}>
            {option.map((i) => (
              <Radio key={i.value} value={i.value} my={1}>
                {i.label}
              </Radio>
            ))}
          </HStack>
        </Radio.Group>
      </Flex>
    );
  }