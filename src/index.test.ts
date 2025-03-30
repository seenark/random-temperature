import { expect, mock, test } from "bun:test"
import { addCelsiusSuffix, getRandomCelsiusTemperature, getRemainSecondsFromDate } from "./index"

test("get remain seconds", () => {
  const secs = getRemainSecondsFromDate(new Date("2025-03-01T00:00:20"))

  expect(secs).toBe(40)
})

test("get random celsius temperature", () => {
  Math.random = mock(() => 0.32)
  const celsius = getRandomCelsiusTemperature()
  expect(celsius).toBe(32)
})

test("add celsius suffix", () => {
  const celsius = addCelsiusSuffix(32)
  expect(celsius).toBe("32°C")
})
