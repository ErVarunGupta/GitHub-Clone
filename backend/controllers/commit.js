import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export const commitRepo = async(message)=>{
    const repoPath = path.resolve(process.cwd(), ".apnaGit");
    const stagedPath = path.join(repoPath, "staging");
    const commitsPath = path.join(repoPath, "commits");

    try {
        //create id and make a directory in commitsPath
        const commitID = uuidv4();
        const commitDir = path.join(commitsPath, commitID);
        await fs.mkdir(commitDir, {recursive: true});

        //copy files from stagedPath to commitDir
        const files = await fs.readdir(stagedPath);
        for(const file of files){
            await fs.copyFile(path.join(stagedPath, file), path.join(commitDir, file));
        }

        //write commit message and date to commit.json
        await fs.writeFile(path.join(commitDir, "commit.json"),
        JSON.stringify({message, date: new Date().toISOString()}));

        console.log(`Commit ${commitID} created with message: "${message}"`);
    } catch (error) {
        console.error("Error committing changes:", error);
    }
}