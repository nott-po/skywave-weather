import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const lat = searchParams.get("lat");
        const lon = searchParams.get("lon");

        const apiKey = process.env.OPENWEATHERMAP_API_KEY;

        if (!apiKey) {
            throw new Error("Missing API Key");
        }

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

        const res = await axios.get(url);
        return NextResponse.json(res.data);
    } catch (error) {
        console.error("Error fetching forecast data", error);

        return new Response("Error fetching forecast data", {
            status: 500,
        });
    }
}
