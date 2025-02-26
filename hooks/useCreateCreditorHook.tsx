import { useSQLiteContext } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import * as schema from "@/db/schema";
import { creditors, transactions } from "@/db/schema";
import lang from "@/lang/lang";
import { CreditorRenderViewItem, InputField } from "@/types";
import { Button, FlatList, Text, TextInput, View } from "react-native";
import { useState } from "react";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { eq, sql } from "drizzle-orm";
import dayjs from "dayjs";

export default function useCreateCreditorHook() {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });
  const [selectedCreditor, setSelectedCreditor] =
    useState<CreditorRenderViewItem | null>(null);
  const { data } = useLiveQuery(
    drizzleDb
      .select({
        creditorId: creditors.id,
        creditorName: creditors.name,
        totalAmount: sql<number>`SUM(COALESCE(
        ${transactions.amount},
        0
        )
        )`,
      })
      .from(creditors)
      .leftJoin(transactions, eq(creditors.id, transactions.creditor_id))
      .groupBy(creditors.id, creditors.name),
  );
  const [dialogVisible, setDialogVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const deleteCreditor = async () => {
    if (!selectedCreditor) return;
    console.log("Deleting transaction with ID:", selectedCreditor.creditorId);
    try {
      await drizzleDb
        .delete(creditors)
        .where(eq(creditors.id, selectedCreditor.creditorId));
      setDialogVisible(false);
      alert(lang(`Creditor deleted successfully.`));
    } catch (error) {
      console.error("Error deleting creditor:", error);
    }
  };
  const createCreditors = async () => {
    const { name, address, phone } = formData;
    if (name === "" || address === "" || phone === "") {
      alert("Please enter a valid data");
    }
    const insertedCredit = {
      name: name,
      created_at: dayjs().format("YYYY-MM-DD"),
      phone: phone,
      address: address,
    };

    drizzleDb
      .insert(creditors)
      .values(insertedCredit)
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
    data,
    selectedCreditor,
    setSelectedCreditor,
    setDialogVisible,
    dialogVisible,
    deleteCreditor,
  };
}
