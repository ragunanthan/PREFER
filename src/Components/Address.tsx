import { Box, Text } from 'native-base'
import React from 'react'

export  function Address({title, children}:any) {
  return (
    <Box mb="5">
      <Text fontWeight="bold">{title}</Text>
      <Box ml="8" mt="4">
        {children}
      </Box>
    </Box>
  )
}
