import { renderLocals } from "./src/hcl/render";
import { TerraformLocal, TerraformStack, App } from "cdktf";
import { Construct } from "constructs";
import { format } from "@cdktf/hcl-tools";
import { CdkService } from "./src/cdk/service";

// class S3Locals extends Construct {
//   constructor(scope: Construct, name: string) {
//     super(scope, name);
//     const commonTags = new TerraformLocal(this, "common_tags", {
//       Service: "service_name",
//       Owner: "owner",
//     });
//   }
// }

interface LocalsObject {
  [key: string]: {
    Service: string;
    Owner: string;
  };
}

const main = async () => {
  console.log("test");

  const hcl = `locals {
    common_tags = {
      Service = "service_name"
      Owner   = "owner"
    }
    test_common_tags_88A9E9A0 = {
      Service = "service_name"
      Owner   = "owner"
    }
  }
  `;

  // const service = new CdkService();
  // const res = await service.convert2Json(hcl);

  // const res = renderLocals(`
  //   locals = {
  //     env = {
  //       env = "dev"
  //     }
  //   }
  // `);

  const locals = {
    common_tags: { value: { Service: "service_name", Owner: "owner" } },
    test: { value: { Service: "service_name", Owner: ["test", "test2"] } },
    test2: {
      value: {
        Service: {
          value: "service_name",
        },
        Owner: ["test", "test2"],
      },
    },
  };

  const res = renderLocals(locals);

  console.log(await format(res));

  // const app = new App();

  // const commonTags = new TerraformLocal(app, "common_tags", {
  //   Service: "service_name",
  //   Owner: "owner",
  // });

  // // const cdkLocals = new Locals(app, "test");
  // // const converted = cdkLocals.toHclTerraform();
  // // console.log(await format(converted.hcl));

  // console.log(commonTags.toTerraform());

  // app.synth();
  // console.log(res);
};

main();
