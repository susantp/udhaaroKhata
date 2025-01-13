export type Creditor = {
  id: number;
  name: string;
  address: string;
  phone: string;
};
export type Transaction = {
  id: number;
  creditor_id: number;
  created_at: string;
  transaction_date: string;
  type: number;
  amount: number;
  item: string;
};

export type InputField = {
  id: string;
  type: string;
  label: string;
  required: boolean;
};
