import { redirect } from "@sveltejs/kit";

export async function GET(){
    throw redirect(301, "https://externref.github.io/pinaka")
}