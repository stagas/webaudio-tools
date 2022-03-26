import { dbToFloat, floatToDb } from '../src/db'

describe('all', () => {
  describe('dbToFloat', () => {
    it('converts db to float', () => {
      expect(dbToFloat(0)).toBe(1)
      expect(+dbToFloat(-100).toPrecision(1)).toBe(0.00001)
      expect(+dbToFloat(-50).toPrecision(1)).toBe(0.003)
      expect(+dbToFloat(-10).toPrecision(1)).toBe(0.3)
      expect(+dbToFloat(-3).toPrecision(1)).toBe(0.7)
      expect(+dbToFloat(-2).toPrecision(1)).toBe(0.8)
      expect(+dbToFloat(-1).toPrecision(2)).toBe(0.89)
    })
  })

  describe('floatToDb', () => {
    it('converts float to db', () => {
      expect(floatToDb(1)).toBe(0)
      expect(+floatToDb(0.00001).toPrecision(1)).toBe(-100)
      expect(+floatToDb(0.003).toPrecision(1)).toBe(-50)
      expect(+floatToDb(0.3).toPrecision(1)).toBe(-10)
      expect(+floatToDb(0.7).toPrecision(1)).toBe(-3)
      expect(+floatToDb(0.8).toPrecision(1)).toBe(-2)
      expect(+floatToDb(0.89).toPrecision(1)).toBe(-1)
    })
  })
})
