import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import ScreenHeader from "@/components/common/ScreenHeader";
import lang from "@/lang/lang";
import {
  Button,
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ContentWrapper from "@/components/common/ContentWrapper";
import useCreateTransactionHook from "@/hooks/useCreateTransactionHook";
import DateTimePicker from "react-native-ui-datepicker/src/DateTimePicker";
import { useRef } from "react";
import { Picker } from "@react-native-picker/picker";
import { randomUUID } from "expo-crypto";
import dayjs from "dayjs";

export default function CreateTransaction() {
  const {
    formData,
    fields,
    handleSave,
    calendarShow,
    setCalendarShow,
    data,
    handleTransactionDateSave,
    createTransaction,
  } = useCreateTransactionHook();
  const { height } = Dimensions.get("window");
  const { item, amount, transaction_date } = formData;
  return (
    <SafeAreaWrapper>
      <ScreenHeader title={lang("Create Transaction")} />
      <ContentWrapper className="px-3">
        <View
          style={{ flexDirection: "column", rowGap: 10, paddingVertical: 10 }}
        >
          <Text>{lang(fields.transactionDate.label)}</Text>

          {calendarShow ? (
            <DateTimePicker
              mode="single"
              date={transaction_date}
              onChange={(params) =>
                handleTransactionDateSave(
                  fields.transactionDate.id,
                  params.date,
                )
              }
            />
          ) : (
            <TouchableOpacity
              onPress={() => setCalendarShow(!calendarShow)}
              style={{
                borderWidth: 1,
                height: height * 0.04,
                borderColor: "#989595",
                borderRadius: 15,
                borderStyle: "solid",
                justifyContent: "center",
                paddingLeft: 8,
              }}
            >
              <Text>{dayjs(transaction_date).format("YYYY-MM-DD")}</Text>
            </TouchableOpacity>
          )}
        </View>
        <View
          style={{ flexDirection: "column", rowGap: 10, paddingVertical: 10 }}
        >
          <Text>{lang(fields.item.label)}</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#989595",
              borderRadius: 10,
              padding: 10,
            }}
            defaultValue={item}
            onChangeText={(value) => handleSave(fields.item.id, value)}
            className="pl-4"
            placeholder={lang(fields.item.label)}
            keyboardType="default"
          />
        </View>
        <View
          style={{ flexDirection: "column", rowGap: 10, paddingVertical: 10 }}
        >
          <Text>{lang(fields.amount.label)}</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#989595",
              borderRadius: 10,
              padding: 10,
            }}
            defaultValue={amount.toString()}
            onChangeText={(value) => handleSave(fields.amount.id, value)}
            className="pl-4"
            placeholder={lang(fields.amount.label)}
            keyboardType="numeric"
          />
        </View>
        <View
          style={{ flexDirection: "column", rowGap: 10, paddingVertical: 10 }}
        >
          <Text>{lang(fields.creditorID.label)}</Text>

          <View className="border border-gray-300">
            {data && (
              <Picker
                selectedValue={0}
                onValueChange={(itemValue, itemIndex) =>
                  handleSave(fields.creditorID.id, itemValue)
                }
              >
                <Picker.Item label={lang("Select Creditor")} value={0} />
                {data.map((item) => (
                  <Picker.Item
                    key={randomUUID()}
                    label={lang(item.name)}
                    value={item.id}
                    style={{
                      borderStyle: "solid",
                      borderRadius: 10,
                      borderWidth: 2,
                      borderColor: "#c55959",
                    }}
                  />
                ))}
              </Picker>
            )}
          </View>
        </View>
        <View className="py-8">
          <Button
            title={lang("Save")}
            color="#F05625"
            onPress={createTransaction}
          />
        </View>
      </ContentWrapper>
    </SafeAreaWrapper>
  );
}
