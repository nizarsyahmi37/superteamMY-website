import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		const { memberId, setAsFeatured } = await request.json();

		if (!memberId) {
			return NextResponse.json(
				{ error: "Member ID is required" },
				{ status: 400 }
			);
		}

		// Initialize Supabase admin client with service role key
		const supabaseAdmin = createClient(
			process.env.NEXT_PUBLIC_SUPABASE_URL!,
			process.env.SUPABASE_SERVICE_ROLE_KEY!
		);

		if (setAsFeatured) {
			// First, set all members to not featured
			const { error: clearError } = await supabaseAdmin
				.from("members")
				.update({ is_featured: false })
				.eq("is_featured", true);

			if (clearError) {
				console.error("Clear featured error:", clearError);
				return NextResponse.json(
					{ error: `Failed to clear featured: ${clearError.message}` },
					{ status: 500 }
				);
			}

			// Then set the selected member as featured
			const { error: setError } = await supabaseAdmin
				.from("members")
				.update({ is_featured: true })
				.eq("id", memberId);

			if (setError) {
				console.error("Set featured error:", setError);
				return NextResponse.json(
					{ error: `Failed to set featured: ${setError.message}` },
					{ status: 500 }
				);
			}
		} else {
			// Just remove featured status from this member
			const { error } = await supabaseAdmin
				.from("members")
				.update({ is_featured: false })
				.eq("id", memberId);

			if (error) {
				console.error("Remove featured error:", error);
				return NextResponse.json(
					{ error: `Failed to remove featured: ${error.message}` },
					{ status: 500 }
				);
			}
		}

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Server error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
