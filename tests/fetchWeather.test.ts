import { describe, it, expect, vi } from "vitest";
import { fetchWeather } from "../src/api/weather";

describe("fetchWeather", () => {
  it("should fetch weather data for a valid city", async () => {
    const mockResponse = {
      main: { temp: 20, pressure: 1013 },
      sys: { sunrise: 1624389600, sunset: 1624440000 },
      wind: { speed: 5 },
    };

    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResponse),
        })
      )
    );

    const data = await fetchWeather("Warsaw");

    expect(data).toEqual({
      temp: 20,
      sunrise: "21:20:00",
      sunset: "11:20:00",
      pressure: 1013,
      wind: 5,
    });
  });

  it("should throw an error for a non-existent city", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: false,
          status: 404,
          json: () => Promise.resolve({}),
        })
      )
    );

    await expect(fetchWeather("InvalidCity")).rejects.toThrow("Błąd: 404");
  });

  it("should return null for an empty city", async () => {
    const result = await fetchWeather("");
    expect(result).toBeNull();
  });
});
