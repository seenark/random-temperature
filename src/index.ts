import { apiReference } from "@scalar/hono-api-reference"
import * as S from "effect/Schema"
import { Hono } from "hono"
import { describeRoute, openAPISpecs } from "hono-openapi"
import { resolver } from "hono-openapi/effect"
import Keyv from "keyv"

const keyv = new Keyv<string>()

const app = new Hono()

export function getRemainSecondsFromDate(date: Date) {
  const secs = date.getSeconds()
  return 60 - secs
}

export function getRandomCelsiusTemperature(): number {
  return Math.random() * 100
}

export function addCelsiusSuffix(temperature: number) {
  return `${temperature}°C` as const
}

const celsiusCacheKey = "celsius"
async function celsiusService(): Promise<string> {
  const cache = await keyv.get(celsiusCacheKey)
  if (cache === null || cache === undefined) {
    const celsiusNum = getRandomCelsiusTemperature()
    const celsius = addCelsiusSuffix(celsiusNum)
    const remainSeconds = getRemainSecondsFromDate(new Date())
    await keyv.set(celsiusCacheKey, celsius, remainSeconds * 1000)
    return celsius
  }
  return cache
}

app
  .get("/healthz", (c) => {
    return c.text("Ok")
  })
  .get("/temperature", describeRoute({
    responses: {
      200: {
        content: {
          "application/json": {
            schema: resolver(S.Struct({
              sensor: S.Literal("temperature"),
              timestamp: S.String,
              unit: S.Literal("celsius"),
              value: S.String,
            })),
          },
        },

      },
    },
  }), async (c) => {
    const data = await celsiusService()
    return c.json({
      sensor: "temperature" as const,
      timestamp: new Date().toISOString(),
      unit: "celsius" as const,
      value: data,
    })
  })

app.get("/openapi.json", openAPISpecs(app))
app.get("/docs", apiReference({
  darkMode: true,
  layout: "modern", // "classic" | "modern" (default)
  pageTitle: "Hono Overtime Tracking API Reference",
  spec: {
    url: "/openapi.json",
  },
  theme: "deepSpace",
}))
export default app
