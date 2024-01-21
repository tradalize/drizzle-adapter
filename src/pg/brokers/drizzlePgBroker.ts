import {
  Broker,
  ClosePositionPayload,
  OpenPositionPayload,
  Position,
} from "@tradalize/core";
import { Backtest } from "../schema.js";
import { insertTrade } from "../handlers/insertTrade.js";
import { updateTrade } from "../handlers/updateTrade.js";

export class DrizzlePgBroker extends Broker {
  constructor(
    private backtest: Backtest,
    private dbUrl: string
  ) {
    super();
  }

  /**
   * Handeling open position action
   */
  async openPosition({
    symbol,
    timeframe,
    price,
    time,
    direction,
  }: OpenPositionPayload): Promise<void> {
    if (this.currentPosition) {
      console.warn(
        "Already have open position\n",
        this.currentPosition,
        "\nCan't open a new one"
      );
      return;
    }

    const position = await insertTrade(this.dbUrl, {
      symbol,
      timeframe,
      openPrice: price,
      openTime: time ?? Date.now(),
      direction,
      backtestId: this.backtest.id,
    });

    this.currentPosition = position as Position;
  }

  /**
   * Handeling close position logic
   */
  async closePosition({ price, time }: ClosePositionPayload): Promise<void> {
    if (!this.currentPosition) {
      return;
    }

    await updateTrade(this.dbUrl, Number(this.currentPosition.id), {
      closePrice: price,
      closeTime: time,
    });

    this.currentPosition = null;
  }
}
