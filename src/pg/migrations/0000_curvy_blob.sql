DO $$ BEGIN
 CREATE TYPE "timeframe" AS ENUM('1m', '5m', '15m', '1h', '4h', '1d', '1w');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "backtests" (
	"id" serial PRIMARY KEY NOT NULL,
	"strategy_name" text NOT NULL,
	"strategy_params" jsonb
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "trades" (
	"id" serial PRIMARY KEY NOT NULL,
	"symbol" text NOT NULL,
	"timeframe" "timeframe" NOT NULL,
	"direction" integer NOT NULL,
	"open_price" double precision NOT NULL,
	"open_time" bigint NOT NULL,
	"close_price" double precision,
	"close_time" bigint,
	"stop_loss" double precision,
	"take_profit" double precision,
	"backtest_id" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "trades" ADD CONSTRAINT "trades_backtest_id_backtests_id_fk" FOREIGN KEY ("backtest_id") REFERENCES "backtests"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
