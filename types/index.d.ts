import { DateType } from "react-native-ui-datepicker";

export type Creditor = {
  id: number;
  name: string;
  address: string;
  phone: string;
  created_at: string;
};
export type Transaction = {
  id: number;
  created_at: string;
  creditor_id: number;
  transaction_date: DateType;
  type: number;
  item: string;
  amount: number;
};

export type InputField = {
  id: string;
  type: string;
  label: string;
  required: boolean;
};
export type TransactionInputField = {
  transactionDate: InputField;
  amount: InputField;
  creditorID: InputField;
  item: InputField;
};
export type TransactionRenderViewItem = {
  transactionId: number;
  amount: number;
  creditor: string | null;
  transactionDate: string;
};
export type CreditorRenderViewItem = {
  creditorId: number;
  creditorName: string;
  totalAmount: number;
};
