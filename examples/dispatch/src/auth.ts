import { credentialCommand, CredentialError } from "@dispatch/runner";
import { userCredentials } from "./models.ts";

try {
  await credentialCommand(await userCredentials(), process.argv.slice(2));
} catch (error) {
  console.error(error instanceof Error ? error.message : "Credential setup failed.");
  process.exitCode = error instanceof CredentialError && error.code === "CANCELLED" ? 130 : 1;
}
