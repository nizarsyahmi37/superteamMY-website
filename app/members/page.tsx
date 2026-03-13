import { columns, Member } from "./columns";
import { ViewsMembersListing } from "@/components/views/members/listing";
import { createClient } from "@/lib/supabase/server";

async function getData(): Promise<Member[]> {
	const supabase = await createClient();

	const { data, error } = await supabase
		.from("members")
		.select("*")
		.order("created_at", { ascending: false });

	if (error) {
		console.error("Error fetching members:", error);
		return [];
	}

	// Transform Supabase data to match Member type
	return data.map((member: Record<string, unknown>) => ({
		id: member.id as string,
		photoUrl: member.photo_url as string,
		name: member.name as string,
		roleCompany: member.role_company as string,
		skills: (member.skills as string[]) || [],
		xLink: member.x_link as string,
		achievements: (member.achievements as Member["achievements"]) || [],
	}));
}

export default async function Page() {
	const data = await getData();

	return (
		<div className="container mx-auto py-10">
			<ViewsMembersListing columns={columns} data={data} />
		</div>
	);
}
