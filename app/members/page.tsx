import { columns, Member } from "./columns";
import { ViewsMembersListing } from "@/components/views/members/listing";

async function getData(): Promise<Member[]> {
	return [
		{
			id: "wanaokii",
			photoUrl: "https://pbs.twimg.com/profile_images/2007180413849219079/DfXIO_9U_400x400.jpg",
			name: "Wan Aqil",
			roleCompany: "Fullstack developer",
			skills: [
				"Developer"
			],
			xLink: "wanaokii",
			achievements: [
				{
					"type": "project",
					"info": "Hypebiscus"
				},
				{
					"type": "project",
					"info": "Yeeteora"
				}
			]
		},
		{
			id: "Ponderman_NFT",
			photoUrl: "https://pbs.twimg.com/profile_images/2027678348474986496/Z2nPS2dI_400x400.jpg",
			name: "Pondy (Lami)",
			roleCompany: "Designer",
			skills: [
				"Designer"
			],
			xLink: "Ponderman_NFT",
			achievements: [
				{
					"type": "bounty",
					"info": "Twitter Thread or Article on Superteam Malaysia"
				},
				{
					"type": "bounty",
					"info": "Design Superteam MY Merch"
				}
			]
		}
	]
}

export default async function Page() {
	const data = await getData();

	return (
		<div className="container mx-auto py-10">
			<ViewsMembersListing columns={columns} data={data} />
		</div>
	);
}