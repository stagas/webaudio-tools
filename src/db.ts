/**
 * Convert dBFS value `db` to float.
 *
 * @param db Value in dBFS
 * @returns the value in float
 */
export const dbToFloat = (db: number) => 10 ** (db / 20)

/**
 * Convert float value `float` to dBFS.
 *
 * @param float Value in float
 * @returns the value in dBFS
 */
export const floatToDb = (float: number) => 20 * Math.log10(float)
