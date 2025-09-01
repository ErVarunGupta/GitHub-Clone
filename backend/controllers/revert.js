import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const readdir = promisify(fs.readdir);
const copyFile = promisify(fs.copyFile);

export const revertRepo = async(revertID) =>{
    const repoPath = path.resolve(process.cwd(), ".apnaGit");
    const commitsPath = path.join(repoPath, "commits");

    try {
        const commitDir = path.join(commitsPath, revertID);
        const files = await readdir(commitDir);
        const parentDir = path.join(repoPath, "..");

        for(const file of files){
            await copyFile(path.join(commitDir, file), path.join(parentDir, file));
        }
        console.log(`Commit ${revertID} reverted successfully.`);
    } catch (error) {
        console.error("Error reverting commit:", error);
    }
}