import BackButton from "@/components/BackButton";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import { useAuth } from "@/contexts/authContext";
import { verticalScale } from "@/utils/styling";
import { useRouter } from "expo-router";
import { UserIcon } from "phosphor-react-native";
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

const NewConversationModal = () => {
  const router = useRouter();
  const { user: currentUser } = useAuth();
  const openConversation = () => {};

  const contacts = [
    {
      name: "Gabriel",
    },
    {
      name: "Beatriz Souza",
    },
    {
      name: "Sandra",
    },
  ];

  const onSelectUser = (user: any) => {
    return;
  };

  return (
    <ScreenWrapper isModal={true}>
      <View style={styles.container}>
        <View style={styles.header}>
          <BackButton iconSize={28} color={colors.black} />
          <Typo color={colors.neutral800} fontWeight={"bold"} size={26}>
            Nova Mensagem
          </Typo>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contactList}
        >
          {contacts.map((user: any, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={[styles.contactRow]}
                onPress={() => onSelectUser(user)}
              >
                <UserIcon
                  size={verticalScale(30)}
                  color={colors.black}
                  weight="bold"
                />
                <Typo color={colors.black} size={20} fontWeight={"bold"}>
                  {user.name}
                </Typo>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
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
