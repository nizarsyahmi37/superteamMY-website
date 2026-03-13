import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		const formData = await request.formData();

		const isUpdate = formData.get("isUpdate") === "true";
		const existingId = formData.get("existingId") as string;

		// If it's an update, handle it
		if (isUpdate && existingId) {
			const name = formData.get("name") as string;
			const photoUrl = formData.get("photoUrl") as string;
			const roleCompany = formData.get("roleCompany") as string;
			const xLink = formData.get("xLink") as string;
			const skills = formData.get("skills") as string;
			const achievements = formData.get("achievements") as string;

			if (!name || !roleCompany || !xLink || !skills) {
				return NextResponse.json(
					{ error: "Missing required fields" },
					{ status: 400 }
				);
			}

			// Initialize Supabase admin client
			const supabaseAdmin = createClient(
				process.env.NEXT_PUBLIC_SUPABASE_URL!,
				process.env.SUPABASE_SERVICE_ROLE_KEY!
			);

			const skillsArray = skills.split(",").map((s) => s.trim()).filter(Boolean);

			let achievementsArray = [];
			if (achievements) {
				try {
					achievementsArray = JSON.parse(achievements);
				} catch {
					achievementsArray = [];
				}
			}

			const { error: updateError } = await supabaseAdmin
				.from("members")
				.update({
					name,
					photo_url: photoUrl,
					role_company: roleCompany,
					x_link: xLink,
					skills: skillsArray,
					achievements: achievementsArray
				})
				.eq("id", existingId);

			if (updateError) {
				console.error("Update error:", updateError);
				return NextResponse.json(
					{ error: `Failed to update member: ${updateError.message}` },
					{ status: 500 }
				);
			}

			return NextResponse.json({ success: true, memberId: existingId });
		}

		// Continue with original insert logic

		const name = formData.get("name") as string;
		const xLink = formData.get("xLink") as string;
		const roleCompany = formData.get("roleCompany") as string;
		const skills = formData.get("skills") as string;
		const achievements = formData.get("achievements") as string;
		const photo = formData.get("photo") as File | null;

		if (!name || !xLink || !roleCompany || !skills) {
			return NextResponse.json(
				{ error: "Missing required fields" },
				{ status: 400 }
			);
		}

		// Initialize Supabase admin client with service role key
		const supabaseAdmin = createClient(
			process.env.NEXT_PUBLIC_SUPABASE_URL!,
			process.env.SUPABASE_SERVICE_ROLE_KEY!
		);

		let photoUrl = "";

		// Upload photo if provided
		if (photo && photo.size > 0) {
			const cleanXHandle = xLink.replace(/[^a-zA-Z0-9]/g, "_");
			const fileExt = photo.name.split(".").pop();
			const fileName = `${cleanXHandle}_${Date.now()}.${fileExt}`;

			// Convert File to ArrayBuffer
			const arrayBuffer = await photo.arrayBuffer();
			const buffer = Buffer.from(arrayBuffer);

			const { error: uploadError } = await supabaseAdmin.storage
				.from("member-photos")
				.upload(fileName, buffer, {
					cacheControl: "3600",
					upsert: false,
					contentType: photo.type,
				});

			if (uploadError) {
				console.error("Upload error:", uploadError);
				return NextResponse.json(
					{ error: `Failed to upload photo: ${uploadError.message}` },
					{ status: 500 }
				);
			}

			const { data: urlData } = supabaseAdmin.storage
				.from("member-photos")
				.getPublicUrl(fileName);

			photoUrl = urlData.publicUrl;
		}

		// Parse skills
		const skillsArray = skills.split(",").map((s) => s.trim()).filter(Boolean);

		// Parse achievements
		console.log("Raw achievements string:", achievements);
		let achievementsArray = [];
		if (achievements) {
			try {
				achievementsArray = JSON.parse(achievements);
				console.log("Parsed achievements:", achievementsArray);
			} catch (e) {
				console.error("Failed to parse achievements:", e);
				achievementsArray = [];
			}
		}

		// Create member ID from xLink
		const memberId = xLink.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase();

		// Insert into database using admin client
		const { error: insertError } = await supabaseAdmin
			.from("members")
			.insert([
				{
					id: memberId,
					name,
					photo_url: photoUrl,
					role_company: roleCompany,
					x_link: xLink,
					skills: skillsArray,
					achievements: achievementsArray,
				},
			]);

		if (insertError) {
			console.error("Insert error:", insertError);
			return NextResponse.json(
				{ error: `Failed to add member: ${insertError.message}` },
				{ status: 500 }
			);
		}

		return NextResponse.json({ success: true, memberId });
	} catch (error) {
		console.error("Server error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
