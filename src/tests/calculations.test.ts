import { calculateBudget } from "../utils/calculations.utils";
// @ts-ignore
import { describe, expect, test } from "bun:test";

describe("calculateBudget", () => {
  test("distributes the budget without losing cents", () => {
    const result = calculateBudget({
      amount: "100.00",
      startDate: "2026-10-01",
      endDate: "2026-10-03",
      dailySpendings: [],
    });

    expect(result.map((day) => day.baseAllowance)).toEqual([
      "33.34",
      "33.33",
      "33.33",
    ]);
  });

  test("rolls unspent money into the next day", () => {
    const result = calculateBudget({
      amount: "30.00",
      startDate: "2026-10-01",
      endDate: "2026-10-03",
      dailySpendings: [
        { date: "2026-10-01", amount: "5.00" },
      ],
    });

    expect(result[0].remaining).toBe("5.00");
    expect(result[1].available).toBe("15.00");
  });

  test("reduces future availability after overspending", () => {
    const result = calculateBudget({
      amount: "30.00",
      startDate: "2026-10-01",
      endDate: "2026-10-03",
      dailySpendings: [
        { date: "2026-10-01", amount: "15.00" },
      ],
    });

    expect(result[0].remaining).toBe("-5.00");
    expect(result[1].available).toBe("5.00");
  });

  test("preserves the exact total of the base allowances", () => {
    const result = calculateBudget({
      amount: "10.00",
      startDate: "2026-10-01",
      endDate: "2026-10-06",
      dailySpendings: [],
    });

    const total = result.reduce(
      (sum, day) => sum + Number(day.baseAllowance),
      0,
    );

    expect(total).toBe(10);
  });
});
