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
    value: {
      Service: string;
      Owner: string;
    };
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
  const cdkService = new CdkService();

  const ghcl = await cdkService.convert2Json(hcl);
  console.log(ghcl);

  const LocalsObject: LocalsObject = {
    common_tags: { value: { Service: "service_name", Owner: "owner" } },
  };

  const LocalsObject2: LocalsObject = {
    common_tags2: { value: { Service: "service_name", Owner: "owner" } },
  };

  // const service = new CdkService();
  // const res = await service.convert2Json(hcl);

  // const res = renderLocals(`
  //   locals = {
  //     env = {
  //       env = "dev"
  //     }
  //   }
  // `);

  let res = renderLocals(Object.assign(LocalsObject, LocalsObject2));

  console.log(await format(res));

  const locals = {
    common_tags: { value: { Service: "service_name", Owner: "owner" } },
    test: { value: { Service: "service_name", Owner: ["test", "test2"] } },
    test2: {
      value: {
        Service: {
          value: "service_name",
        },
        Owner: ["test", "test2"],
        Test: {
          TestString: "test_string",
          TestIns: 100,
          TestBool: true,
          TestFloat: 0.212,
          TestMap: ["aaa", "test"],
          TestObject: { "test-object1": "obj", "test-obj": 2 },
          TestMapObj: [
            { "test1-object1": "obj", "test1-obj": 1 },
            { "test2-object1": "obj2", "test2-obj": 2 },
            { "test2-object1": "obj2", "test2-obj": 2, "test3-obj": true },
          ],
        },
      },
    },
  };

  res = renderLocals(locals);

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
