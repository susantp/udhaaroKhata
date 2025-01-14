import { useSQLiteContext } from "expo-sqlite";
import { drizzle, useLiveQuery } from "drizzle-orm/expo-sqlite";
import * as schema from "@/db/schema";
import { creditors, transactions } from "@/db/schema";
import { TransactionInputField } from "@/types";
import { useState } from "react";
import { today } from "@/utils/date";
import dayjs from "dayjs";
import { DateType } from "react-native-ui-datepicker";
import lang from "@/lang/lang";
import { eq } from "drizzle-orm";

export default function useCreateTransactionHook() {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });
  const [calendarShow, setCalendarShow] = useState(false);
  const [pickerShow, setPickerShow] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [formData, setFormData] = useState({
    item: "",
    creditor_id: 0,
    transaction_date: dayjs(),
    amount: 0,
  });
  const { data } = useLiveQuery(
    drizzleDb
      .select({ id: creditors.id, name: creditors.name })
      .from(creditors),
  );
  const deleteTransaction = async (id: number) => {
    drizzleDb
      .delete(transactions)
      .where(eq(transactions.id, id))
      .then((result) => {
        console.log(result);
        setDialogVisible(false);
      });
  };
  const createTransaction = async () => {
    const { item, amount, creditor_id, transaction_date } = formData;
    if (item === "" || amount === 0 || creditor_id === 0) {
      alert("Please enter a valid data");
      return;
    }
    drizzleDb
      .insert(transactions)
      .values({
        transaction_date: transaction_date.format("YYYY-MM-DD"),
        creditor_id: creditor_id,
        amount: amount,
        item: item,
        created_at: today(),
      })
      .then((r) => {
        alert(lang("Transaction created!"));
        console.log("after creation success: ", r);
      })
      .catch((err) => {
        alert(lang("Transaction failed!"));
        console.log("error", err);
      });
  };
  const handleSave = (id: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };
  const handleTransactionDateSave = (id: string, value: DateType) => {
    const localDate = dayjs(value).format("YYYY-MM-DD");
    setFormData((prev) => ({ ...prev, [id]: localDate }));
    setCalendarShow(!calendarShow);
  };
  const fields: TransactionInputField = {
    item: {
      id: "item",
      type: "text",
      label: "Item",
      required: true,
    },
    amount: {
      id: "amount",
      type: "number",
      label: "Amount",
      required: true,
    },
    transactionDate: {
      id: "transaction_date",
      type: "text",
      label: "Transaction Date",
      required: true,
    },
    creditorID: {
      id: "creditor_id",
      type: "number",
      label: "Creditor",
      required: true,
    },
  };

  return {
    formData,
    fields,
    handleSave,
    calendarShow,
    setCalendarShow,
    pickerShow,
    setPickerShow,
    data,
    handleTransactionDateSave,
    createTransaction,
    dialogVisible,
    setDialogVisible,
    deleteTransaction,
  };
}
