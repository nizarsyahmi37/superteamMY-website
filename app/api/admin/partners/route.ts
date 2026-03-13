import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		const formData = await request.formData();

		const name = formData.get("name") as string;
		const logoFile = formData.get("logoFile") as File | null;
		const logoUrl = formData.get("logoUrl") as string;
		const logoFileDark = formData.get("logoFileDark") as File | null;
		const logoUrlDark = formData.get("logoUrlDark") as string;
		const websiteUrl = formData.get("websiteUrl") as string;
		const isUpdate = formData.get("isUpdate") === "true";
		const existingId = formData.get("existingId") as string;

		if (!name) {
			return NextResponse.json({ error: "Name is required" }, { status: 400 });
		}

		// Initialize Supabase admin client with service role key
		const supabaseAdmin = createClient(
			process.env.NEXT_PUBLIC_SUPABASE_URL!,
			process.env.SUPABASE_SERVICE_ROLE_KEY!
		);

		const partnerId = existingId || name.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase();

		let finalLogoUrl = "";
		let finalLogoUrlDark = "";

		// Handle light mode logo
		if (logoUrl && logoUrl.startsWith("http")) {
			// Using URL
			finalLogoUrl = logoUrl;
		} else if (logoFile && logoFile.size > 0) {
			// Upload file
			const cleanName = name.replace(/[^a-zA-Z0-9]/g, "_");
			const fileExt = logoFile.name.split(".").pop();
			const fileName = `${cleanName}_logo_${Date.now()}.${fileExt}`;
			const arrayBuffer = await logoFile.arrayBuffer();
			const buffer = Buffer.from(arrayBuffer);

			const { error: uploadError } = await supabaseAdmin.storage
				.from("member-photos")
				.upload(fileName, buffer, {
					cacheControl: "3600",
					upsert: false,
					contentType: logoFile.type,
				});

			if (uploadError) {
				return NextResponse.json({ error: `Failed to upload light logo: ${uploadError.message}` }, { status: 500 });
			}

			const { data: urlData } = supabaseAdmin.storage
				.from("member-photos")
				.getPublicUrl(fileName);

			finalLogoUrl = urlData.publicUrl;
		}

		// Handle dark mode logo
		if (logoUrlDark && logoUrlDark.startsWith("http")) {
			finalLogoUrlDark = logoUrlDark;
		} else if (logoFileDark && logoFileDark.size > 0) {
			const cleanName = name.replace(/[^a-zA-Z0-9]/g, "_");
			const fileExt = logoFileDark.name.split(".").pop();
			const fileName = `${cleanName}_logo_dark_${Date.now()}.${fileExt}`;
			const arrayBuffer = await logoFileDark.arrayBuffer();
			const buffer = Buffer.from(arrayBuffer);

			const { error: uploadError } = await supabaseAdmin.storage
				.from("member-photos")
				.upload(fileName, buffer, {
					cacheControl: "3600",
					upsert: false,
					contentType: logoFileDark.type,
				});

			if (uploadError) {
				return NextResponse.json({ error: `Failed to upload dark logo: ${uploadError.message}` }, { status: 500 });
			}

			const { data: urlData } = supabaseAdmin.storage
				.from("member-photos")
				.getPublicUrl(fileName);

			finalLogoUrlDark = urlData.publicUrl;
		}

		if (!finalLogoUrl || !finalLogoUrlDark) {
			return NextResponse.json({ error: "Both light and dark mode logos are required" }, { status: 400 });
		}

		// Insert or update in database
		if (isUpdate && existingId) {
			const { error: updateError } = await supabaseAdmin
				.from("partners")
				.update({
					name,
					logo_url: finalLogoUrl,
					logo_url_dark: finalLogoUrlDark,
					website_url: websiteUrl || null,
				})
				.eq("id", existingId);

			if (updateError) throw updateError;
		} else {
			const { error: insertError } = await supabaseAdmin
				.from("partners")
				.insert([
					{
						id: partnerId,
						name,
						logo_url: finalLogoUrl,
						logo_url_dark: finalLogoUrlDark,
						website_url: websiteUrl || null,
					},
				]);

			if (insertError) throw insertError;
		}

		return NextResponse.json({ success: true, partnerId });
	} catch (error) {
		console.error("Server error:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}

export async function DELETE(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const id = searchParams.get("id");

		if (!id) {
			return NextResponse.json({ error: "Partner ID required" }, { status: 400 });
		}

		const supabaseAdmin = createClient(
			process.env.NEXT_PUBLIC_SUPABASE_URL!,
			process.env.SUPABASE_SERVICE_ROLE_KEY!
		);

		const { error } = await supabaseAdmin.from("partners").delete().eq("id", id);

		if (error) throw error;

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Server error:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
