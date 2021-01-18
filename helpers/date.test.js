import { formatDate } from "./date";

describe("Date helpers", () => {
  describe("formatDate", () => {
    it('should properly format the date as "dd/mm/yyyy"', () => {
      const input = new Date("2020-12-31T15:40:00.500Z");
      const output = "31/12/2020";

      expect(formatDate(input)).toEqual(output);
    });
  });
});
