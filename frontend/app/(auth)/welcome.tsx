import Button from "@/components/Button";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

const Welcome = () => {
  const router = useRouter();

  return (
    <ScreenWrapper showPattern={true} bgOpacity={0.5}>
      <View style={styles.container}>
        <View style={{ alignItems: "center" }}>
          <Typo color={colors.white} size={43} fontWeight={"900"}>
            AppChat
          </Typo>
        </View>
        <Button
          style={{ backgroundColor: colors.white }}
          onPress={() => router.push("/(auth)/register")}
        >
          <Typo size={23} fontWeight={"bold"}>
            Iniciar
          </Typo>
        </Button>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    paddingHorizontal: spacingX._20,
    paddingVertical: spacingY._10,
  },
  background: {
    flex: 1,
    backgroundColor: colors.neutral900,
  },
  welcomeImage: {
    height: verticalScale(300),
    aspectRatio: 1,
    alignSelf: "center",
  },
});

export default Welcome;
