import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const NewConversationModal = () => {
  const router = useRouter();

  const openConversation = () => {};

  return (
    <ScreenWrapper isModal={true}>
      <View style={styles.container}>

			</View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  conversationItem: {
    gap: spacingX._10,
    marginVertical: spacingY._12,
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    marginHorizontal: spacingX._15,
    flex: 1,
  },
  checked: {
    backgroundColor: colors.primary,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  selectionIndicator: {
    marginLeft: "auto",
    marginRight: spacingX._10,
  },
  contactList: {
    gap: spacingY._12,
    marginTop: spacingY._10,
    paddingTop: spacingY._10,
    paddingBottom: spacingY._20,
  },
  selectedContact: {
    backgroundColor: colors.neutral100,
    borderRadius: radius._15,
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacingX._10,
    paddingVertical: spacingY._5,
  },
});

export default NewConversationModal;
