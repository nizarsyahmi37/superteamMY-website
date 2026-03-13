import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function GET() {
	try {
		const supabaseAdmin = createClient(
			process.env.NEXT_PUBLIC_SUPABASE_URL!,
			process.env.SUPABASE_SERVICE_ROLE_KEY!
		);

		const { data, error } = await supabaseAdmin
			.from("admins")
			.select("*")
			.order("created_at", { ascending: false });

		if (error) throw error;

		// Return without password hashes
		const admins = (data || []).map((admin) => ({
			id: admin.id,
			username: admin.username,
			email: admin.email,
			created_at: admin.created_at,
		}));

		return NextResponse.json(admins);
	} catch (error) {
		console.error("Error fetching admins:", error);
		return NextResponse.json(
			{ error: "Failed to fetch admins" },
			{ status: 500 }
		);
	}
}

export async function POST(request: NextRequest) {
	try {
		const formData = await request.formData();

		const username = formData.get("username") as string;
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;
		const isUpdate = formData.get("isUpdate") === "true";
		const existingId = formData.get("existingId") as string;

		if (!username || !email || !password) {
			return NextResponse.json(
				{ error: "Username, email, and password are required" },
				{ status: 400 }
			);
		}

		const supabaseAdmin = createClient(
			process.env.NEXT_PUBLIC_SUPABASE_URL!,
			process.env.SUPABASE_SERVICE_ROLE_KEY!
		);

		// Hash the password
		const passwordHash = crypto.createHash("sha256").update(password).digest("hex");

		if (isUpdate && existingId) {
			// Update existing admin
			const { error } = await supabaseAdmin
				.from("admins")
				.update({
					username,
					email,
					password_hash: passwordHash,
				})
				.eq("id", existingId);

			if (error) throw error;

			return NextResponse.json({ success: true, adminId: existingId });
		} else {
			// Create new admin
			const adminId = username.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase();

			const { error } = await supabaseAdmin
				.from("admins")
				.insert([
					{
						id: adminId,
						username,
						email,
						password_hash: passwordHash,
					},
				]);

			if (error) throw error;

			return NextResponse.json({ success: true, adminId });
		}
	} catch (error) {
		console.error("Error saving admin:", error);
		return NextResponse.json(
			{ error: "Failed to save admin" },
			{ status: 500 }
		);
	}
}

export async function DELETE(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const id = searchParams.get("id");

		if (!id) {
			return NextResponse.json(
				{ error: "Admin ID is required" },
				{ status: 400 }
			);
		}

		const supabaseAdmin = createClient(
			process.env.NEXT_PUBLIC_SUPABASE_URL!,
			process.env.SUPABASE_SERVICE_ROLE_KEY!
		);

		const { error } = await supabaseAdmin
			.from("admins")
			.delete()
			.eq("id", id);

		if (error) throw error;

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Error deleting admin:", error);
		return NextResponse.json(
			{ error: "Failed to delete admin" },
			{ status: 500 }
		);
	}
}
