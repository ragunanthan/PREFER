
import { useField } from 'formik';
import { Flex, FormControl, HStack, Radio, VStack } from 'native-base';
import React from 'react';

type RadioGroupType = {
  title: string;
  name?: string;
  option: { value: string; label: string }[];
  value?: string;
  onChange?:(e:string) => void
};

export function RadioGroup({
    title,
    name,
    option,
    value,
    onChange
  }: RadioGroupType) {
   
  
    return (
      <Flex flexDirection={"row"} alignItems="flex-start">
       {title && <FormControl.Label flex={2}>{title}</FormControl.Label>}
  
        <Radio.Group
          flex={4}
          name="exampleGroup"
          value={value}
          onChange={onChange}
          accessibilityRole={"checkbox"}
        >
          <HStack space={4}>
            {option.map((i) => (
              <Radio key={i.value} value={i.value} my={1}  >
                {i.label}
              </Radio>
            ))}
          </HStack>
        </Radio.Group>
      </Flex>
    );
  }

  export function RadioGroupFormik({name,value , onChange, ...rest}:RadioGroupType) {
    const [field, , helper] = useField(name ?? "");
    return <RadioGroup {...rest} value={field.value} onChange={(e) => helper.setValue(`${e}`)} />
  }