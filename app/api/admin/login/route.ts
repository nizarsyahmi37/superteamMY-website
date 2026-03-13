import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: NextRequest) {
	try {
		const { username, email, password } = await request.json();

		if (!username || !email || !password) {
			return NextResponse.json(
				{ error: "Username, email, and password are required" },
				{ status: 400 }
			);
		}

		// Initialize Supabase admin client with service role key
		const supabaseAdmin = createClient(
			process.env.NEXT_PUBLIC_SUPABASE_URL!,
			process.env.SUPABASE_SERVICE_ROLE_KEY!
		);

		// Find admin by username and email
		const { data: admin, error: fetchError } = await supabaseAdmin
			.from("admins")
			.select("*")
			.eq("username", username)
			.eq("email", email)
			.single();

		if (fetchError || !admin) {
			return NextResponse.json(
				{ error: "Invalid credentials" },
				{ status: 401 }
			);
		}

		// Hash the input password and compare with stored hash
		const passwordHash = crypto.createHash("sha256").update(password).digest("hex");

		if (passwordHash !== admin.password_hash) {
			return NextResponse.json(
				{ error: "Invalid credentials" },
				{ status: 401 }
			);
		}

		// Return success with admin info (excluding password)
		return NextResponse.json({
			success: true,
			admin: {
				id: admin.id,
				username: admin.username,
				email: admin.email,
			},
		});
	} catch (error) {
		console.error("Login error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
