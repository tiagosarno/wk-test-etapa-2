import Button from "@/components/Button";
import ConversationItem from "@/components/ConversationItem";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import { useAuth } from "@/contexts/authContext";
import { verticalScale } from "@/utils/styling";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const Home = () => {
  const router = useRouter();
  const { user, signOut } = useAuth();

  const conversations = [
    {
      name: "Gabriel",
      lastMessage: {
        content: "Moc mensagem 1..",
        createdAt: "2025-12-05T14:58:00Z",
      },
    },
    {
      name: "Beatriz Souza",
      lastMessage: {
        content: "Moc mensagem 2..",
        createdAt: "2025-06-22T17:32:00Z",
      },
    },
    {
      name: "Sandra",
      lastMessage: {
        content: "Moc mensagem 3..",
        createdAt: "2023-07-15T12:21:00Z",
      },
    },
  ];

  let sortedConversations = conversations.sort((a: any, b: any) => {
    const aDate = a?.lastMessage?.createdAt || a.createdAt;
    const bDate = b?.lastMessage?.createdAt || b.createdAt;
    return new Date(bDate).getTime() - new Date(aDate).getTime();
  });

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <ScreenWrapper showPattern={true} bgOpacity={0.4}>
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Typo color={colors.white} size={20}>
            Seja bem vindo(a){" "}
            <Typo color={colors.neutral200} size={22} fontWeight={"bold"}>
              {user?.name}
            </Typo>
          </Typo>
        </View>
      </View>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.conversationList}>
            {sortedConversations.length > 0 &&
              sortedConversations.map((item: any, index) => {
                return (
                  <ConversationItem
                    item={item}
                    key={index}
                    router={router}
                    showDivider={sortedConversations.length != index + 1}
                  />
                );
              })}
            {sortedConversations.length == 0 && (
              <View style={styles.noContent}>
                <Typo color={colors.black} size={20}>
                  Nenhuma conversa até o momento
                </Typo>
              </View>
            )}
          </View>
        </ScrollView>
        <View style={styles.footerButtons}>
          <Button onPress={() => router.push("/(main)/newConversationModal")}>
            <Typo color={colors.black} size={23}>
              Nova Mensagem
            </Typo>
          </Button>
          <Button onPress={handleLogout}>
            <Typo color={colors.black} size={23}>
              Sair do Chat
            </Typo>
          </Button>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
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
});

export default Home;
