import { initializeApp } from "firebase/app";
import dotenv from "dotenv";
import { config } from "./config.js";

dotenv.config();

export const firebase_app = initializeApp(config);
