/**
 * A generated module for TemperatureHono functions
 *
 * This module has been generated via dagger init and serves as a reference to
 * basic module structure as you get started with Dagger.
 *
 * Two functions have been pre-created. You can modify, delete, or add to them,
 * as needed. They demonstrate usage of arguments and return types using simple
 * echo and grep commands. The functions can be called from the dagger CLI or
 * from one of the SDKs.
 *
 * The first line in this comment block is a short description line and the
 * rest is a long description with more detail on the module's purpose or usage,
 * if appropriate. All modules should have a short description.
 */
import type { Container, Directory } from "@dagger.io/dagger"
import { argument, dag, func, object } from "@dagger.io/dagger"

@object()
export class TemperatureHono {
  @func()
  build(
    @argument({ defaultPath: "../", ignore: ["node_modules", "dist", ".git", ".gitignore"] }) source: Directory,
  ): Container {
    const build = dag.container()
      .from("oven/bun:1")
      .withWorkdir("/app")
      .withDirectory("/app", source)
      .withExec(["bun", "i"])
      .withExec(["bun", "run", "build:bytecode"])

    const app = build.file("/app/app-b")
    const final = dag.container()
      .from("gcr.io/distroless/base")
      .withWorkdir("/app")
      .withFile("/app/app", app)
      .withEntrypoint(["/app/app"])
    return final
  }

  @func()
  publish(
    @argument({ defaultPath: "../", ignore: ["node_modules", "dist", ".git", ".gitignore"] }) source: Directory,
    imageTag: string,
  ): Promise<string> {
    return this.build(source).publish(imageTag)
  }

  /**
   * Returns a container that echoes whatever string argument is provided
   */
  @func()
  containerEcho(stringArg: string): Container {
    return dag.container().from("alpine:latest").withExec(["echo", stringArg])
  }

  /**
   * Returns lines that match a pattern in the files of the provided Directory
   */
  @func()
  async grepDir(directoryArg: Directory, pattern: string): Promise<string> {
    return dag
      .container()
      .from("alpine:latest")
      .withMountedDirectory("/mnt", directoryArg)
      .withWorkdir("/mnt")
      .withExec(["grep", "-R", pattern, "."])
      .stdout()
  }
}
