const fs = require("fs");
const Path = require("path");
const Sass = require("node-sass");
const path = require("path");

const getComponents = () => {
  let allComponents = [];

  const types = ["atoms", "molecules", "organisms"];

  types.forEach((type) => {
    const allFiles = fs.readdirSync(`src/${type}`).map((file) => {
      return {
        input: `src/${type}/${file}`,
        output: `lib/${file.slice(0, -4) + "css"}`,
      };
    });

    allComponents = [...allComponents, ...allFiles];
  });
  return allComponents;
};

const compile = (path, fileName) => {
  const result = Sass.renderSync({
    data: fs.readFileSync(Path.resolve(path)).toString(),
    outputStyle: "expanded",
    outFile: "global.css",
    includePaths: [Path.resolve("src")],
  });
  fs.writeFileSync(fileName, result.css.toString());
};

compile("src/global.scss", "lib/global.css");

getComponents().forEach((component) => {
  compile(component.input, component.output);
});
