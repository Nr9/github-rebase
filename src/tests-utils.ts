import { Ref } from "@nr9/shared-github-internals";
import {
  CommandDirectory,
  createGitRepo,
  executeGitCommand,
  RepoState,
} from "@nr9/shared-github-internals/lib/tests";

const createGitRepoAndRebase = async ({
  initialState,
  ref,
}: {
  initialState: RepoState;
  ref: Ref;
}): Promise<CommandDirectory> => {
  const directory = await createGitRepo(initialState);
  await executeGitCommand({
    args: ["rebase", "--autosquash", "--interactive", "master"],
    directory,
    // See https://stackoverflow.com/a/29094904
    env: { GIT_EDITOR: ":", GIT_SEQUENCE_EDITOR: ":" },
    ref,
  });
  return directory;
};

export { createGitRepoAndRebase };
