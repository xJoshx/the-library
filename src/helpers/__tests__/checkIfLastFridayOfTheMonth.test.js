import checkIflastFridayForMonth from "../checkIfLastFridayOfTheMonth";

describe("checkIfLastFridayOfTheMonth", () => {
  it("returns true if last friday of the month", () => {
    const lastFriday = checkIflastFridayForMonth(new Date(2019, 8, 28));
    expect(lastFriday).toBe(true);
  });
  it("returns false if not last friday of the month", () => {
    const lastFriday = checkIflastFridayForMonth(new Date(2019, 9, 25));
    expect(lastFriday).toBe(false);
  });
});
