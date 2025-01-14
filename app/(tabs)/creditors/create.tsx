import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import ScreenHeader from "@/components/common/ScreenHeader";
import lang from "@/lang/lang";
import { FlatList } from "react-native";
import ContentWrapper from "@/components/common/ContentWrapper";
import useCreateCreditorHook from "@/hooks/useCreateCreditorHook";

export default function CreateCreditor() {
  const { CARDS } = useCreateCreditorHook();

  return (
    <SafeAreaWrapper>
      <ScreenHeader title={lang("Create Creditor")} />
      <ContentWrapper className="px-3">
        <FlatList
          contentContainerStyle={{
            rowGap: 25,
            paddingHorizontal: 10,
          }}
          renderItem={({ item }) => item.component}
          data={CARDS}
        />
      </ContentWrapper>
    </SafeAreaWrapper>
  );
}
