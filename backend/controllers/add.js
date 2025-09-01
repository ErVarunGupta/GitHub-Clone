import fs from 'fs/promises';
import path from 'path';

export const addRepo = async(filePath)=>{
    const repoPath = path.resolve(process.cwd(), ".apnaGit");
    const stagingPath = path.join(repoPath, "staging");

    try {
        await fs.mkdir(stagingPath, {recursive: true});
        const fileName = path.basename(filePath);
        await fs.copyFile(fileName, path.join(stagingPath, fileName));
        console.log(`File ${fileName} added to the staging area.`);
    } catch (error) {
        console.error("Error adding file to the repository:", error);
    }
}