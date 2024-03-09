import {
  convert,
  parseProviderRequirements,
  getTerraformConfigFromDir,
} from "@cdktf/hcl2cdk";
import * as hcl2cdk from "@cdktf/hcl2cdk";
import {
  readSchema,
  ConstructsMakerProviderTarget,
} from "@cdktf/provider-generator";

import { parse, convertFiles } from "@cdktf/hcl2json";
import { LANGUAGES, TerraformProviderConstraint } from "@cdktf/commons";
import { format } from "@cdktf/hcl-tools";

export class CdkService {
  public async convert2Cdk(hcl: string): Promise<string> {
    const ts = await convert(hcl, {
      language: "typescript",
      providerSchema: {},
    });
    return ts.all;
  }

  public async Dir2Cdk(path: string) {
    const hcl = await getTerraformConfigFromDir(path);
    const provider = await parseProviderRequirements(hcl);
    const targets = Object.entries(provider).map(([name, version]) => {
      return ConstructsMakerProviderTarget.from(
        new TerraformProviderConstraint(`${name}@ ${version}`),
        LANGUAGES[0]
      );
    });

    // Get all the provider schemas, making the conversion more precise
    const { providerSchema } = await readSchema(targets);

    if (providerSchema == undefined) {
      throw new Error("error provider schema is undefined");
    }

    await hcl2cdk.convertProject(hcl, {
      language: "typescript",
      providerSchema: providerSchema,
    });
  }

  public async convert2Json(hcl: string): Promise<string> {
    const json = await parse("conver.tf", hcl);
    return JSON.stringify(json);
  }

  public async Dir2Json(path: string): Promise<string> {
    const json = await convertFiles(path);
    return JSON.stringify(json);
  }

  public async Format(hcl: string): Promise<string> {
    return await format(hcl);
  }
}
