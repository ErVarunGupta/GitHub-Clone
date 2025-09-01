//=======================================================
// importing yargs for command line interface
// import { startServer } from "./index.js";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { initRepo } from "./controllers/init.js";
import { addRepo } from "./controllers/add.js";
import { commitRepo } from "./controllers/commit.js";
import { pushRepo } from "./controllers/push.js";
import { pullRepo } from "./controllers/pull.js";
import { revertRepo } from "./controllers/revert.js";

export const yargsCommand = (startServer) =>{
    yargs(hideBin(process.argv))
  .command("start", "Starting a server", {}, startServer)
  .command("init", "Initialize a new repository", {}, initRepo)
  .command("add <file>", "Add files to the repository", (yargs)=>{
    yargs.positional("file", {
      describe: "File to add to the repository",
      type: "string"
    })
  }, (argv)=>{
    addRepo(argv.file);
  })
  .command("commit <message>", "Commit a repository" ,(yargs)=>{
    yargs.positional("message",{
      describe: "Commit message",
      type: "string",
    })
  }, (argv)=>{
    commitRepo(argv.message);
  })
  .command("push", "Push a repository", {}, pushRepo)
  .command("pull", "Pull a repository", {}, pullRepo)
  .command("revert <revertID>", "Revert a specific commit" ,(yargs)=>{
    yargs.positional("revertID", {
      describe: "ID of the commit to revert",
      type: "string"
    })
  }, (argv)=>{
    revertRepo(argv.revertID);
  })
  .demandCommand(1, "You need at least one command before moving on")
  .help().argv;
}

//=======================================================
