import { useSQLiteContext } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import * as schema from "@/db/schema";
import { creditors } from "@/db/schema";
import lang from "@/lang/lang";
import { InputField } from "@/types";
import { Button, FlatList, Text, TextInput, View } from "react-native";
import { useState } from "react";
import { today } from "@/utils/date";

export default function useCreateCreditorHook() {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const createCreditors = async () => {
    drizzleDb
      .insert(creditors)
      .values({
        name: formData.name,
        created_at: today(),
        phone: formData.phone,
        address: formData.address,
      })
      .then((r) => {
        alert(lang("Creditor created!"));
        console.log("after creation success: ", r);
      });
  };
  const fields: InputField[] = [
    {
      id: "name",
      type: "text",
      label: "Full Name",
      required: true,
    },
    {
      id: "address",
      type: "text",
      label: "Address",
      required: true,
    },
    {
      id: "phone",
      type: "number",
      label: "Phone",
      required: true,
    },
  ];
  const renderItem = ({ item }: { item: InputField }) => {
    const handleSave = (id: string, value: string) => {
      setFormData((prev) => ({ ...prev, [id]: value }));
    };

    return (
      <View
        style={{ flexDirection: "column", rowGap: 10, paddingVertical: 10 }}
        key={item.id}
      >
        <Text>{lang(item.label)}</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#989595",
            borderRadius: 10,
            padding: 10,
          }}
          defaultValue={formData[item.id as keyof typeof formData]}
          onChangeText={(value) => handleSave(item.id, value)}
          className="pl-4"
          placeholder={lang(item.label.toLowerCase())}
          keyboardType={item.type === "number" ? "numeric" : "default"}
        />
      </View>
    );
  };
  const CARDS = [
    {
      component: <FlatList data={fields} renderItem={renderItem} />,
    },
    {
      component: (
        <Button
          title={lang("Save")}
          color="#F05625"
          onPress={createCreditors}
        />
      ),
    },
  ];
  return {
    CARDS,
  };
}
