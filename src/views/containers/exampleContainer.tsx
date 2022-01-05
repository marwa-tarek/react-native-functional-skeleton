import React, { useState } from "react"
import { View, Text, TextInput, ScrollView } from "react-native"
import { R } from "@yourProjectName/assets"

export const ExampleContainer = () => {
  const [userId, setUserId] = useState("9")

  return (
    <ScrollView style={R.appStyles.fill} contentContainerStyle={[R.appStyles.fill, R.appStyles.colCenter]}>
      <View style={[R.appStyles.rowHCenter, R.appStyles.rowVCenter]}>
        <Text style={[R.appStyles.fill]}>Example Container</Text>
        <TextInput
          onChangeText={setUserId}
          keyboardType={"number-pad"}
          maxLength={1}
          value={userId}
          selectTextOnFocus
          style={[R.appStyles.fill]}
        />
      </View>
    </ScrollView>
  )
}
