const fs = require("fs");
const Path = require("path");
const Sass = require("node-sass");

const result = Sass.renderSync({
  data: fs.readFileSync(Path.resolve("src/global.scss")).toString(),
  outputStyle: "expanded",
  outFile: "global.css",
  includePaths: [Path.resolve("src")],
});

fs.writeFileSync(Path.resolve("src/lib/global.css"), result.css.toString());
