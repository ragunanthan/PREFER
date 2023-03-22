import { Box, HStack, Text } from 'native-base'
import React from 'react'
import { borderTableStyle } from './TableStyle'

export default function TableHeader({
    Header
} : {
    Header : any[]
}) {
  return (
    <HStack space={3} bg={"blue.300"}>
    {Header
      .filter(Boolean)
      .map(({ space, label, style }: any, index) => (
        <Box key={index} flex={space} {...borderTableStyle} {...style}>
          <Text fontWeight={"bold"}>{label}</Text>
        </Box>
      ))}
  </HStack>
  )
}
