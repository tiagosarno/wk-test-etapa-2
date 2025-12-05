import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import Input from "@/components/Input";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import { useAuth } from "@/contexts/authContext";
import { verticalScale } from "@/utils/styling";
import { useRouter } from "expo-router";
import * as Icons from "phosphor-react-native";
import React, { useRef, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

const Register = () => {
  const router = useRouter();
  const nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [isLoading, setIsLoading] = useState(false);

  const { signUp } = useAuth();

  const handleSubmit = async () => {
    if (!nameRef.current || !emailRef.current || !passwordRef.current) {
      Alert.alert("Cadastro", "Favor preencher todos os campos!");
      return;
    }

    try {
      setIsLoading(true);
      await signUp(emailRef.current, passwordRef.current, nameRef.current);
    } catch (error: any) {
      Alert.alert("Falha no Cadastro", error.message);
    } finally {
      setIsLoading(false);
    }
    setIsLoading(true);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <ScreenWrapper showPattern={true}>
        <View style={styles.container}>
          <View style={styles.header}>
            <BackButton iconSize={28} />
          </View>
          <View style={styles.content}>
            <ScrollView
              contentContainerStyle={styles.form}
              showsVerticalScrollIndicator={false}
            >
              <View style={{ gap: spacingY._10, marginBottom: spacingY._15 }}>
                <Typo size={28} fontWeight={"600"}>
                  Cadastro
                </Typo>
                <Typo color={colors.neutral600}>
                  Crie uma conta para continuar
                </Typo>
              </View>

              <Input
                placeholder="Informe seu nome"
                onChangeText={(value: string) => (nameRef.current = value)}
                icon={
                  <Icons.UserIcon
                    size={verticalScale(26)}
                    color={colors.neutral600}
                  />
                }
              />
              <Input
                placeholder="Informe seu e-mail"
                onChangeText={(value: string) => (emailRef.current = value)}
                icon={
                  <Icons.AtIcon
                    size={verticalScale(26)}
                    color={colors.neutral600}
                  />
                }
              />
              <Input
                placeholder="Informe sua senha"
                secureTextEntry
                onChangeText={(value: string) => (passwordRef.current = value)}
                icon={
                  <Icons.LockIcon
                    size={verticalScale(26)}
                    color={colors.neutral600}
                  />
                }
              />
              <View style={{ marginTop: spacingY._25, gap: spacingY._15 }}>
                <Button loading={isLoading} onPress={handleSubmit}>
                  <Typo fontWeight={"bold"} color={colors.black} size={24}>
                    Cadastrar
                  </Typo>
                </Button>
                <View style={styles.footer}>
                  <Typo>Já possui uma conta?</Typo>
                  <Pressable onPress={() => router.push("/(auth)/login")}>
                    <Typo
                      fontWeight={"bold"}
                      color={colors.primaryDark}
                      size={20}
                    >
                      Login
                    </Typo>
                  </Pressable>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </ScreenWrapper>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  header: {
    paddingHorizontal: spacingX._20,
    paddingTop: spacingY._15,
    paddingBottom: spacingY._25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  form: {
    gap: spacingY._15,
    marginTop: spacingY._20,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
});

export default Register;
