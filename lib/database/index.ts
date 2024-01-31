import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
	if (cached.conn) return cached.conn;

	if (!uri) throw new Error("MONGODB_URI is missing");

	cached.promise =
		cached.promise ||
		mongoose.connect(uri, {
			dbName: "eventHubDB",
			bufferCommands: false,
		});

	cached.conn = await cached.promise;

	return cached.conn;
};
