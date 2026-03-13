"use client"

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { archivo_black } from "@/lib/general/fonts";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/table/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LuLayoutGrid, LuList, LuArrowUpDown, LuSearch } from "react-icons/lu";
import { Member } from "@/app/members/columns";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
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

function getAchievementsByType(achievements: { type: string; info: string }[], type: string) {
	return achievements.filter(a => a.type === type);
}

function MemberCard({ member }: { member: Member }) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<div className="bg-card border rounded-lg p-4 cursor-pointer hover:border-super-yellow transition-colors">
					<div className="flex flex-col items-center text-center">
						<Image
							className="rounded-xl mb-3"
							src={member.photoUrl}
							alt={member.name}
							width={100}
							height={100}
						/>
						<p className={`${archivo_black} font-bold`}>{member.name}</p>
						<p className="text-sm text-muted-foreground">@{member.xLink}</p>
						<p className="text-sm mt-2">{member.roleCompany}</p>
						<div className="flex flex-wrap gap-1 justify-center mt-2">
							{member.skills.slice(0, 3).map((skill, index) => (
								<span
									key={index}
									className="px-2 py-0.5 bg-secondary text-secondary-foreground rounded-full text-xs"
								>
									{skill}
								</span>
							))}
						</div>
						<p className="text-sm text-muted-foreground mt-2">
							{member.achievements.length} achievement{member.achievements.length !== 1 ? "s" : ""}
						</p>
					</div>
				</div>
			</DialogTrigger>
			<DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-4">
						<Image
							className="rounded-lg md:rounded-xl"
							src={member.photoUrl}
							alt={member.name}
							width={80}
							height={80}
						/>
						<div>
							<p>{member.name}</p>
							<p className="text-sm text-muted-foreground">@{member.xLink}</p>
						</div>
					</DialogTitle>
					<div className="flex flex-col gap-4 pt-4">
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
												<p className="capitalize font-bold text-sm text-super-yellow">
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
	);
}

export function ViewsMembersListing<TData, TValue>({
	columns,
	data
} : DataTableProps<TData, TValue>) {
	const [view, setView] = useState<"table" | "grid">("table");
	const [isMobile, setIsMobile] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [skillFilter, setSkillFilter] = useState<string>("all");
	const [sortBy, setSortBy] = useState<string>("name");
	const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

	// Detect screen size
	useEffect(() => {
		const checkScreenSize = () => {
			setIsMobile(window.innerWidth < 768);
		};

		checkScreenSize();
		window.addEventListener("resize", checkScreenSize);
		return () => window.removeEventListener("resize", checkScreenSize);
	}, []);

	// Force grid view on mobile
	useEffect(() => {
		if (isMobile) {
			setView("grid");
		}
	}, [isMobile]);

	const members = data as Member[];

	// Get unique skills from all members
	const allSkills = useMemo(() => {
		const skills = new Set<string>();
		members.forEach(member => member.skills.forEach(skill => skills.add(skill)));
		return Array.from(skills).sort();
	}, [members]);

	// Filter and sort members
	const filteredAndSortedMembers = useMemo(() => {
		let result = [...members];

		// Search filter
		if (searchQuery) {
			const query = searchQuery.toLowerCase();
			result = result.filter(member =>
				member.name.toLowerCase().includes(query) ||
				member.xLink.toLowerCase().includes(query) ||
				member.roleCompany.toLowerCase().includes(query) ||
				member.skills.some(skill => skill.toLowerCase().includes(query))
			);
		}

		// Skill filter
		if (skillFilter !== "all") {
			result = result.filter(member =>
				member.skills.some(skill => skill.toLowerCase() === skillFilter.toLowerCase())
			);
		}

		// Sort
		result.sort((a, b) => {
			let comparison = 0;
			switch (sortBy) {
				case "name":
					comparison = a.name.localeCompare(b.name);
					break;
				case "role":
					comparison = a.roleCompany.localeCompare(b.roleCompany);
					break;
				case "achievements":
					comparison = a.achievements.length - b.achievements.length;
					break;
			}
			return sortOrder === "asc" ? comparison : -comparison;
		});

		return result;
	}, [members, searchQuery, skillFilter, sortBy, sortOrder]);

	return (
		<section>
			<div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
				<div className="flex gap-2 items-center">
					<div className="relative">
						<LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
						<Input
							placeholder="Search members..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="pl-9 max-w-sm"
						/>
					</div>
					<Select value={skillFilter} onValueChange={setSkillFilter}>
						<SelectTrigger className="w-37.5">
							<SelectValue placeholder="Filter by skill" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Skills</SelectItem>
							{allSkills.map(skill => (
								<SelectItem key={skill} value={skill}>{skill}</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div className="flex gap-2 items-center">
					<Select value={sortBy} onValueChange={setSortBy}>
						<SelectTrigger className="w-37.5">
							<SelectValue placeholder="Sort by" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="name">Name</SelectItem>
							<SelectItem value="role">Role</SelectItem>
							<SelectItem value="achievements">Achievements</SelectItem>
						</SelectContent>
					</Select>
					<Button
						variant="outline"
						size="icon"
						onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
					>
						<LuArrowUpDown className={`h-4 w-4 ${sortOrder === "desc" ? "rotate-180" : ""}`} />
					</Button>
					<div className="hidden md:flex gap-2 border rounded-lg p-1">
						<Button
							variant={view === "table" ? "default" : "ghost"}
							size="icon"
							onClick={() => setView("table")}
						>
							<LuList className="h-4 w-4" />
						</Button>
						<Button
							variant={view === "grid" ? "default" : "ghost"}
							size="icon"
							onClick={() => setView("grid")}
						>
							<LuLayoutGrid className="h-4 w-4" />
						</Button>
					</div>
				</div>
			</div>
			{view === "table" ? (
				<DataTable
					columns={columns}
					data={filteredAndSortedMembers as unknown as TData[]}
				/>
			) : (
				<div>
					{filteredAndSortedMembers.length > 0 ? (
						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
							{filteredAndSortedMembers.map((member) => (
								<MemberCard key={member.id} member={member} />
							))}
						</div>
					) : (
						<div className="text-center py-10 text-muted-foreground">
							No members found matching your criteria.
						</div>
					)}
				</div>
			)}
		</section>
	);
}
