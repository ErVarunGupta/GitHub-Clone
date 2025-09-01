import fs from 'fs/promises';
import path from 'path';

export const initRepo = async() => {
    const repoPath = path.resolve(process.cwd(), ".apnaGit");
    const commitsPath = path.join(repoPath, "commits");

    try {
        await fs.mkdir(repoPath, {recursive: true});
        await fs.mkdir(commitsPath, {recursive: true});

        await fs.writeFile(path.join(repoPath, "config.json"),
        JSON.stringify({bucket: process.env.S3_BUCKET}));

        console.log("Repository initialized successfully at:", repoPath);
    } catch (error) {
        console.error("Error initializing repository:", error);
    }
}