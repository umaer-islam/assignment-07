import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { MongoClient } from "mongodb";
import dns from "dns";

try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch { }

const rawUri = process.env.MONGODB_URI?.trim().replace(/^["']|["']$/g, "");
const isValidMongoUri =
  Boolean(rawUri) &&
  (rawUri!.startsWith("mongodb://") || rawUri!.startsWith("mongodb+srv://"));

// Fallback to a syntactically valid URI during build/static evaluation
// so MongoClient constructor will never throw MongoParseError during Next.js prerendering.
const uri = isValidMongoUri
  ? rawUri!
  : "mongodb://127.0.0.1:27017/bazar_dor";

const globalForMongo = globalThis as typeof globalThis & {
  mongoClient?: MongoClient;
};

const mongoClient = globalForMongo.mongoClient ?? new MongoClient(uri);

globalForMongo.mongoClient = mongoClient;

const dbName = process.env.MONGODB_DB_NAME?.trim() || "bazar_dor";
const database = mongoClient.db(dbName);

const googleClientId = process.env.GOOGLE_CLIENT_ID?.trim();
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET?.trim();
const githubClientId = process.env.GITHUB_CLIENT_ID?.trim();
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET?.trim();

const socialProviders: Record<
  string,
  { clientId: string; clientSecret: string }
> = {};

if (googleClientId && googleClientSecret) {
  socialProviders.google = {
    clientId: googleClientId,
    clientSecret: googleClientSecret,
  };
}

if (githubClientId && githubClientSecret) {
  socialProviders.github = {
    clientId: githubClientId,
    clientSecret: githubClientSecret,
  };
}

const baseURL =
  process.env.BETTER_AUTH_URL?.trim().replace(/\/$/, "") ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

export const auth = betterAuth({
  baseURL,
  secret:
    process.env.BETTER_AUTH_SECRET?.trim() ||
    "better_auth_default_build_secret_32b_hex",
  database: mongodbAdapter(database, {
    client: mongoClient,
  }),
  socialProviders:
    Object.keys(socialProviders).length > 0 ? socialProviders : undefined,
});
