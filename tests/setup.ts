import * as dotenv from "dotenv";
import * as path from "path";

import { CacheService } from "@selinarnd/nest-cache";

loadEnvironmentVariables();
setupMocks();

function loadEnvironmentVariables() {
  dotenv.config({ path: path.resolve(__dirname, "..", "tests.env") });
}

function setupMocks() {
  jest.mock("@selinarnd/nest-logging");

  jest.mock("@selinarnd/nest-cache", () => ({
    CacheService,
  }));
}
