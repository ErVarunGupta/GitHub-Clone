import fs from 'fs/promises';
import path from 'path';
import {s3, S3_BUCKET} from '../config/aws-config.js';

export const pushRepo = async() =>{
    const repoPath = path.resolve(process.cwd(), ".apnaGit");
    const commitsPath = path.join(repoPath, "commits");

    try {
        const commitDirs = await fs.readdir(commitsPath);

        for(const commitDir of commitDirs){
            const commitPath = path.join(commitsPath, commitDir);
            const files = await fs.readdir(commitPath);
            for(const file of files){
                const filePath = path.join(commitPath, file);
                const fileContent = await fs.readFile(filePath);
                const params = {
                    Bucket: S3_BUCKET,
                    Key: `commits/${commitDir}/${file}`,
                    Body: fileContent
                }
                await s3.upload(params).promise();
            }
        }
        console.log("All commits are pushed to S3");
    } catch (error) {
        console.error("Error pushing commits to S3:", error);
    }
}