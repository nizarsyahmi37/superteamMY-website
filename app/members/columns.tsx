"use client"

import { LuArrowUpDown, LuEllipsis } from "react-icons/lu";
import { archivo_black } from "@/lib/general/fonts";
import { ColumnDef } from "@tanstack/react-table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import Image from "next/image";

export type Achievement = {
	type: string;
	info: string;
}

export type Member = {
	id: string
	photoUrl: string;
	name: string;
	roleCompany: string;
	skills: string[];
	xLink: string;
	achievements: Achievement[]
}

const ACHIEVEMENT_TYPES = [
	"hackathon",
	"project",
	"grant",
	"dao",
	"bounty"
] as const;

const ACHIEVEMENT_LABELS: Record<string, string> = {
	hackathon: "Hackathon wins",
	project: "Projects built",
	grant: "Grants received",
	dao: "DAO contributions",
	bounty: "Bounties completed"
};

function getAchievementCountByType(achievements: Achievement[], type: string): number {
	return achievements.filter(a => a.type === type).length;
}

function getAchievementsByType(achievements: Achievement[], type: string): Achievement[] {
	return achievements.filter(a => a.type === type);
}

export const columns: ColumnDef<Member>[] = [
	{
		id: "member",
		accessorFn: (row) => row.name,
		enableHiding: false,
		header: ({ column }) => {
			return (
				<div className={`flex gap-2 align-middle p-2`}>
					<p
						className={`my-auto`}
					>
						Member
					</p>
					<LuArrowUpDown
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
						className={`cursor-pointer my-auto ml-2 h-4 w-4 hover:scale-110 hover:text-super-yellow`}
					/>
				</div>
			)
		},
		cell: ({ row }) => {
			const photoUrl = row.original.photoUrl;
			const name = row.original.name;
			const xLink = row.original.xLink;
		
			return (
				<div
					className={`grid grid-cols-[3rem_1fr] gap-4 p-2`}
				>
					<div className="relative w-12 h-12 rounded-lg md:rounded-xl overflow-hidden bg-muted shrink-0">
						<Image
							className={`object-cover`}
							src={photoUrl}
							alt={name}
							fill
						/>
					</div>
					<div
						className={`my-auto`}
					>
						<p
							className={`${archivo_black} text-lg font-bold`}
						>
							{name}
						</p>
						<p
							className={``}
						>
							@{xLink}
						</p>
					</div>
				</div>
			);
		}
	},
	{
		accessorKey: "roleCompany",
		enableHiding: false,
		header: ({ column }) => {
			return (
				<div className={`flex gap-2 align-middle p-2`}>
					<p
						className={`my-auto`}
					>
						Role
					</p>
					<LuArrowUpDown
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
						className={`cursor-pointer my-auto ml-2 h-4 w-4 hover:scale-110 hover:text-super-yellow`}
					/>
				</div>
			)
		},
		cell: ({ row }) => {
			const roleCompany = row.original.roleCompany;

			return (
				<div
					className={`max-w-60 text-wrap p-2`}
				>
					<p
						className={`${archivo_black}`}
					>
						{roleCompany}
					</p>
				</div>
			);
		}
	},
	{
		accessorKey: "skills",
		header: () => {
			return (
				<div className={`flex gap-2 align-middle p-2`}>
					<p
						className={`my-auto`}
					>
						Skills
					</p>
				</div>
			)
		},
		cell: ({ row }) => {
			const skills = row.original.skills;

			return (
				<div
					className={`p-2 flex flex-wrap gap-2`}
				>
					{skills.map((skill, index) => (
						<span
							key={index}
							className={`px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm`}
						>
							{skill}
						</span>
					))}
				</div>
			);
		}
	},
	{
		accessorKey: "achievements",
		header: () => (
			<div className={`p-2`}>
				Achievements
			</div>
		),
		cell: ({ row }) => {
			const achievements = row.original.achievements;

			const counts = ACHIEVEMENT_TYPES.map(type => ({
				type,
				count: getAchievementCountByType(achievements, type)
			}));

			const totalCount = counts.reduce((sum, c) => sum + c.count, 0);

			return (
				<div
					className={`p-2`}
				>
					{totalCount > 0 ? (
						<div className="flex gap-2 text-sm">
							{counts.filter(c => c.count > 0).map((c, idx) => (
								<span key={c.type} className="font-medium">
									{c.count} {c.type}{c.count < 2 ? `` : c.type !== `bounty` ? `s` : `ies`}
									{idx < counts.filter(x => x.count > 0).length - 1 ? "," : ""}
								</span>
							))}
						</div>
					) : (
						<p className={`text-muted-foreground`}>0</p>
					)}
				</div>
			);
		}
	},
	{
		accessorKey: "more",
		enableHiding: false,
		header: () => (
			<div className={`p-2 max-w-6`} />
		),
		cell: ({ row }) => {
			const member = row.original;

			return (
				<div
					className={`p-2`}
				>
					<Dialog>
						<DialogTrigger>
							<LuEllipsis
								className={`cursor-pointer m-auto h-4 w-4 hover:scale-110 hover:text-super-yellow`}
							/>
						</DialogTrigger>
						<DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
							<DialogHeader>
								<DialogTitle className="flex items-center gap-4">
									<div className="relative w-20 h-20 rounded-lg md:rounded-xl overflow-hidden bg-muted shrink-0">
										<Image
											className="object-cover"
											src={member.photoUrl}
											alt={member.name}
											fill
											style={{ objectFit: "cover" }}
										/>
									</div>
									<div>
										<p>{member.name}</p>
										<p className="text-sm text-muted-foreground">@{member.xLink}</p>
									</div>
								</DialogTitle>
								<div
									className={`flex flex-col gap-4 pt-4`}
								>
									<div>
										<p className="font-semibold">Role</p>
										<p>{member.roleCompany}</p>
									</div>
									<div>
										<p className="font-semibold">Skills</p>
										<div className="flex flex-wrap gap-2 mt-1">
											{member.skills.map((skill, index) => (
												<span
													key={index}
													className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
												>
													{skill}
												</span>
											))}
										</div>
									</div>
									<div>
										<p className="font-semibold">Achievements ({member.achievements.length})</p>
										{member.achievements.length > 0 ? (
											<div className="mt-2 space-y-3">
												{ACHIEVEMENT_TYPES.map(type => {
													const typeAchievements = getAchievementsByType(member.achievements, type);
													if (typeAchievements.length === 0) return null;
													return (
														<div key={type}>
															<p className={`capitalize font-bold text-sm text-super-yellow`}>
																{ACHIEVEMENT_LABELS[type]}
															</p>
															<div className="flex mt-1">
																{typeAchievements.map((achievement, idx) => (
																	<p key={idx} className="text-sm text-muted-foreground">
																		{achievement.info || "N/A"}{typeAchievements.length > 1 && idx < typeAchievements.length - 1 ? `, ` : ``}
																	</p>
																))}
															</div>
														</div>
													);
												})}
											</div>
										) : (
											<p className="text-muted-foreground mt-1">No achievements</p>
										)}
									</div>
								</div>
							</DialogHeader>
						</DialogContent>
					</Dialog>
				</div>
			);
		}
	}
]

// export const columns: ColumnDef<Payment>[] = [
// 	{
// 		accessorKey: "status",
// 		header: "Status"
// 	},
// 	{
// 		accessorKey: "email",
// 		header: "Email"
// 	},
// 	{
// 		accessorKey: "amount",
// 		header: () => (
// 			<div className="text-right">
// 				Amount
// 			</div>
// 		),
// 		cell: ({ row }) => {
// 			const amount = parseFloat(row.getValue("amount"))
// 			const formatted = new Intl.NumberFormat("en-US", {
// 				style: "currency",
// 				currency: "USD"
// 			}).format(amount)
		
// 			return (
// 				<div className="text-right font-medium">
// 					{formatted}
// 				</div>
// 			);
// 		}
// 	}
// ]