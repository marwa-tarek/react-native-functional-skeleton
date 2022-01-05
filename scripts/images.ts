// eslint-disable-next-line @typescript-eslint/no-var-requires
const fileSys = require("fs")

const imageFileNames = () => {
  const array = fileSys
    .readdirSync("src/assets/images")
    .filter((file) => file.endsWith(".png"))
    .map((file) => {
      return file
        .replace("@3x.png", "")
        .replace("@2x.png", "")
        .replace(".png", "")
    })
  return Array.from(new Set(array))
}

const generateImageNames = () => {
  const properties = imageFileNames()
    .map((name) => {
      return `${name}: require("./${name}.png")`
    })
    .join(",\n  ")

  const content = `const images = {
  ${properties}
}

export default images`

  fileSys.writeFileSync("src/assets/images/index.ts", content, "utf8")
}

generateImageNames()
