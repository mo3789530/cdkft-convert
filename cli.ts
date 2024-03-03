import { renderLocals } from "./src/hcl/render";

const main = () => {
  console.log("test");
  const res = renderLocals(`
    locals = {
      env = {
        env = "dev"
      }
    }
  `);

  console.log(res);
};

main();
