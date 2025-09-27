import { config } from "dotenv";
import { DataSource, DataSourceOptions } from "typeorm";

const env = config().parsed || {};

const host = env.DATABASE_HOST || process.env.DATABASE_HOST;
const port = parseInt(env.DATABASE_PORT || process.env.DATABASE_PORT || "5432");
const username = env.DATABASE_USER || process.env.DATABASE_USER;
const password = env.DATABASE_PASSWORD || process.env.DATABASE_PASSWORD;
const database = env.DATABASE_NAME || process.env.DATABASE_NAME;
const ssl = env.DATABASE_SSL || process.env.DATABASE_SSL;
const nodeEnv = env.NODE_ENV || process.env.NODE_ENV || "development";

export const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host,
  port,
  username,
  password,
  database,
  synchronize: false,
  entities: ["dist/**/*.entity{.ts,.js}"],
  migrations: ["dist/db/migrations/**/*{.ts,.js}"],
  ssl: ssl === "true" ? { rejectUnauthorized: false } : false,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
