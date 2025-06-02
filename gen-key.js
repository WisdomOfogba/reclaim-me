import { generateSecret } from "jose"



console.log(Buffer.from((await generateSecret("A192CBC-HS384"))).toString("base64"))