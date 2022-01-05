// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require("fs")

const fontFileNames = () => {
  const array = fs
    .readdirSync("src/assets/fonts")
    .filter((file) => file.endsWith(".ttf") || file.endsWith(".otf"))
    .map((file) => {
      return file.replace(".ttf", "").replace(".otf", "")
    })
  return Array.from(new Set(array))
}

const generateFontNames = () => {
  const properties = fontFileNames()
    .map((name) => {
      const key = String(name).replace(/\s|-/g, "")
      return `${key.charAt(0).toLowerCase() + key.slice(1)}: "${name}"`
    })
    .join(",\n  ")

  const content = `const fonts = {
  ${properties}
}

export default fonts`

  fs.writeFileSync("src/assets/fonts/index.ts", content, "utf8")
}

generateFontNames()
