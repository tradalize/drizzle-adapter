import {
  pgTable,
  serial,
  doublePrecision,
  bigint,
  text,
  pgEnum,
  jsonb,
  integer,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { Timeframe, TIMEFRAME } from "@tradalize/core";

export const backtests = pgTable("backtests", {
  id: serial("id").primaryKey(),
  strategyName: text("strategy_name").notNull(),
  strategyParams: jsonb("strategy_params"),
});

const backtestsRelations = relations(backtests, ({ many }) => ({
  trades: many(trades),
}));

const timeframes = Object.values(TIMEFRAME) as [Timeframe, ...Timeframe[]];

export const timeframeEnum = pgEnum("timeframe", timeframes);

export const trades = pgTable("trades", {
  id: serial("id").primaryKey().notNull(),
  symbol: text("symbol").notNull(),
  timeframe: timeframeEnum("timeframe").notNull(),
  direction: integer("direction").notNull(),
  openPrice: doublePrecision("open_price").notNull(),
  openTime: bigint("open_time", { mode: "number" }).notNull(),
  closePrice: doublePrecision("close_price"),
  closeTime: bigint("close_time", { mode: "number" }),
  sl: doublePrecision("stop_loss"),
  tp: doublePrecision("take_profit"),
  backtestId: integer("backtest_id")
    .references(() => backtests.id, { onDelete: "cascade" })
    .notNull(),
  comment: text("comment"),
});

const tradesRelations = relations(trades, ({ one }) => ({
  backtest: one(backtests, {
    fields: [trades.backtestId],
    references: [backtests.id],
  }),
}));

export type DefaultStrategyParams<T = Record<string, unknown>> = {
  symbol: string;
  timeframe: Timeframe;
  [k: string]: string | number | T;
};

export type Backtest<StrategyParams = DefaultStrategyParams> = Omit<
  typeof backtests.$inferSelect,
  "strategyParams"
> & {
  strategyParams: StrategyParams;
};
export type InsertBacktest = typeof backtests.$inferInsert;

export type Trade = typeof trades.$inferSelect;
export type InsertTrade = typeof trades.$inferInsert;

export default {
  backtests,
  backtestsRelations,
  timeframeEnum,
  trades,
  tradesRelations,
};
