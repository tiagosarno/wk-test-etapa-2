import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import moment from "moment";
import { UserIcon } from "phosphor-react-native";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Typo from "./Typo";

const ConversationItem = ({ item, showDivider, router }: any) => {
  const openConversation = () => {};

  const lastMessage: any = item.lastMessage;

  const getLastMessageDate = () => {
    if (!lastMessage?.createdAt) return null;
    const messageDate = moment(lastMessage?.createdAt);
    const today = moment();

    if (messageDate.isSame(today, "day")) {
      return messageDate.format("h:mm A");
    }
    if (messageDate.isSame(today, "year")) {
      return messageDate.format("MMM D");
    }
    return messageDate.format("MMM D, YYYY");
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.conversationItem}
        onPress={openConversation}
      >
        <View style={styles.headerMessage}>
          <UserIcon
            size={verticalScale(30)}
            color={colors.black}
            weight="bold"
          />
          <Typo color={colors.black} size={20} fontWeight={"bold"}>
            {item.name} - {getLastMessageDate()}
          </Typo>
        </View>
      </TouchableOpacity>
      <View style={styles.lastMessage}>
        <Typo color={colors.black} size={20} fontWeight={"bold"}>
          {item?.lastMessage?.content}
        </Typo>
      </View>
      {showDivider && <View style={styles.divider} />}
    </View>
  );
};

const styles = StyleSheet.create({
  conversationItem: {
    gap: spacingX._10,
    marginVertical: spacingY._12,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.neutral200,
    borderRadius: radius._15,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacingX._20,
    gap: spacingY._15,
    paddingTop: spacingY._15,
    paddingBottom: spacingY._20,
  },
  content: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: radius._50,
    borderTopRightRadius: radius._50,
    borderCurve: "continuous",
    paddingHorizontal: spacingX._20,
    paddingTop: spacingY._20,
  },
  conversationList: {
    paddingVertical: verticalScale(20),
  },
  noContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  footerButtons: {
    gap: 10,
    marginBottom: verticalScale(80),
  },
  headerMessage: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacingX._20,
    gap: spacingY._15,
    paddingTop: spacingY._15,
    paddingBottom: spacingY._20,
  },
  lastMessage: {
    paddingHorizontal: spacingX._20,
    flexDirection: "row",
    alignItems: "center",
  },
  divider: {
    marginTop: "4%",
    marginBottom: "2%",
    height: 1,
    width: "95%",
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.07)",
  },
});

export default ConversationItem;
