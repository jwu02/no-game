import { View, Text } from 'react-native'
import React from 'react'

interface SubsectionContainerProps {
  children: React.ReactNode;
  title: string;
}

const SubsectionContainer = ({ children, title }: SubsectionContainerProps) => {
  return (
    <View className="subsection-container">
      <Text className="subtitle">{title}</Text>
      <View className="subsection">
        {children}
      </View>
    </View>
  )
}

export default SubsectionContainer