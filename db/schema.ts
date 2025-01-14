import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { TRANSACTION_TYPE } from "@/db/columnEnums";

export const creditors = sqliteTable("creditors", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  address: text("address").notNull(),
  phone: text("phone").notNull(),
  created_at: text("created_at").notNull(),
});
export const transactions = sqliteTable("transactions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  creditor_id: integer("creditor_id")
    .notNull()
    .references(() => creditors.id),
  created_at: text("created_at").notNull(),
  transaction_date: text("transaction_date").notNull(),
  type: integer("type").notNull().default(TRANSACTION_TYPE.credit),
  item: text("item").notNull(),
  amount: integer("amount").notNull(),
});
export type Creditors = typeof creditors.$inferSelect;
export type Transactions = typeof transactions.$inferSelect;
