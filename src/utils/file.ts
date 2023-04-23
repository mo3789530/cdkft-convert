import { promises as fs } from "fs";

class FileUtils {
  public async FileOpen(path: string): Promise<string> {
    try {
      const data = await fs.readFile(path, "utf8");
      return data;
    } catch (e) {
      throw e;
    }
  }

  public async FileWrite(path: string, data: string): Promise<void> {
    try {
      await fs.writeFile(path, data);
    } catch (e) {
      throw e;
    }
  }
}
