"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LuSearch } from "react-icons/lu";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";

interface Achievement {
	type: string;
	info: string;
}

interface Member {
	id: string;
	name: string;
	photoUrl: string;
	roleCompany: string;
	xLink: string;
	skills: string[];
	achievements: Achievement[];
}

export default function AdminPage() {
	const router = useRouter();
	const supabase = createClient();
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
	const [members, setMembers] = useState<Member[]>([]);
	const [editingMember, setEditingMember] = useState<Member | null>(null);
	const [isLoadingMembers, setIsLoadingMembers] = useState(true);
	const [searchQuery, setSearchQuery] = useState("");

	// Form state
	const [name, setName] = useState("");
	const [photoFile, setPhotoFile] = useState<File | null>(null);
	const [photoPreview, setPhotoPreview] = useState<string | null>(null);
	const [photoUrl, setPhotoUrl] = useState("");
	const [usePhotoUrl, setUsePhotoUrl] = useState(false);
	const [roleCompany, setRoleCompany] = useState("");
	const [xLink, setXLink] = useState("");
	const [skills, setSkills] = useState("");
	const [achievements, setAchievements] = useState<Achievement[]>([
		{ type: "", info: "" }
	]);

	const fileInputRef = useRef<HTMLInputElement>(null);

	// Fetch members
	const fetchMembers = async () => {
		setIsLoadingMembers(true);
		const { data, error } = await supabase
			.from("members")
			.select("*")
			.order("created_at", { ascending: false });

		if (!error && data) {
			setMembers(
				data.map((m) => ({
					id: m.id,
					name: m.name,
					photoUrl: m.photo_url,
					roleCompany: m.role_company,
					xLink: m.x_link,
					skills: m.skills || [],
					achievements: m.achievements || [],
				}))
			);
		}
		setIsLoadingMembers(false);
	};

	// Check admin session and fetch members
	useEffect(() => {
		const session = localStorage.getItem("admin_session");
		if (!session) {
			router.push("/admin/login");
		} else {
			fetchMembers();
		}
	}, [router]);

	const handleLogout = () => {
		localStorage.removeItem("admin_session");
		router.push("/admin/login");
	};

	const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setPhotoFile(file);
			const reader = new FileReader();
			reader.onloadend = () => {
				setPhotoPreview(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleAddAchievement = () => {
		setAchievements([...achievements, { type: "", info: "" }]);
	};

	const handleRemoveAchievement = (index: number) => {
		setAchievements(achievements.filter((_, i) => i !== index));
	};

	const handleAchievementChange = (index: number, field: keyof Achievement, value: string) => {
		const newAchievements = [...achievements];
		newAchievements[index] = { ...newAchievements[index], [field]: value };
		setAchievements(newAchievements);
	};

	// Populate form for editing
	const handleEdit = (member: Member) => {
		setEditingMember(member);
		setName(member.name);
		setPhotoUrl(member.photoUrl);
		setPhotoPreview(member.photoUrl);
		setPhotoFile(null);
		setRoleCompany(member.roleCompany);
		setXLink(member.xLink);
		setSkills(member.skills.join(", "));
		setAchievements(
			member.achievements.length > 0
				? member.achievements
				: [{ type: "", info: "" }]
		);
		setUsePhotoUrl(true);
		setMessage(null);
	};

	// Reset form
	const handleCancelEdit = () => {
		setEditingMember(null);
		resetForm();
	};

	const resetForm = () => {
		setName("");
		setPhotoFile(null);
		setPhotoPreview(null);
		setPhotoUrl("");
		setUsePhotoUrl(false);
		setRoleCompany("");
		setXLink("");
		setSkills("");
		setAchievements([{ type: "", info: "" }]);
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setMessage(null);

		try {
			if (!name.trim() || !xLink.trim() || !roleCompany.trim() || !skills.trim()) {
				throw new Error("All required fields must be filled");
			}

			let finalPhotoUrl = "";

			if (usePhotoUrl) {
				if (!photoUrl.trim()) {
					throw new Error("Photo URL is required");
				}
				finalPhotoUrl = photoUrl;
			} else if (photoFile) {
				// Upload new photo
				const cleanXHandle = xLink.replace(/[^a-zA-Z0-9]/g, "_");
				const fileExt = photoFile.name.split(".").pop();
				const fileName = `${cleanXHandle}_${Date.now()}.${fileExt}`;

				const { data: uploadData, error: uploadError } = await supabase.storage
					.from("member-photos")
					.upload(fileName, photoFile, {
						cacheControl: "3600",
						upsert: false,
					});

				if (uploadError) {
					throw new Error(`Failed to upload photo: ${uploadError.message}`);
				}

				const { data: urlData } = supabase.storage
					.from("member-photos")
					.getPublicUrl(fileName);

				finalPhotoUrl = urlData.publicUrl;
			} else if (editingMember) {
				finalPhotoUrl = editingMember.photoUrl;
			} else {
				throw new Error("Photo is required");
			}

			const filteredAchievements = achievements.filter(
				(a) => a.type.trim() !== "" && a.info.trim() !== ""
			);

			const skillsArray = skills.split(",").map((s) => s.trim()).filter(Boolean);
			const memberId = editingMember?.id || xLink.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase();

			if (editingMember) {
				// Update existing member
				const { error } = await supabase
					.from("members")
					.update({
						name,
						photo_url: finalPhotoUrl,
						role_company: roleCompany,
						x_link: xLink,
						skills: skillsArray,
						achievements: filteredAchievements,
					})
					.eq("id", editingMember.id);

				if (error) throw error;
				setMessage({ type: "success", text: "Member updated successfully!" });
			} else {
				// Insert new member via API
				const formData = new FormData();
				formData.append("name", name);
				formData.append("xLink", xLink);
				formData.append("roleCompany", roleCompany);
				formData.append("skills", skills);
				formData.append("achievements", JSON.stringify(filteredAchievements));
				if (photoFile) {
					formData.append("photo", photoFile);
				}

				const response = await fetch("/api/admin/members", {
					method: "POST",
					body: formData,
				});

				const result = await response.json();
				if (!response.ok) {
					throw new Error(result.error || "Failed to add member");
				}
				setMessage({ type: "success", text: "Member added successfully!" });
			}

			resetForm();
			setEditingMember(null);
			fetchMembers();
		} catch (error: unknown) {
			const err = error as { message?: string };
			setMessage({ type: "error", text: err.message || "Failed to save member" });
		}

		setIsLoading(false);
	};

	// Delete member
	const handleDelete = async (memberId: string) => {
		if (!confirm("Are you sure you want to delete this member?")) return;

		const { error } = await supabase
			.from("members")
			.delete()
			.eq("id", memberId);

		if (error) {
			alert("Failed to delete member: " + error.message);
		} else {
			fetchMembers();
		}
	};

	return (
		<div className="min-h-screen bg-background p-4 md:p-8">
			<div className="max-w-6xl mx-auto">
				<div className="flex justify-between items-center mb-6">
					<h1 className="text-2xl font-bold">Admin Dashboard</h1>
					<Button variant="outline" onClick={handleLogout}>
						Logout
					</Button>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					{/* Form Section */}
					<Card>
						<CardHeader>
							<CardTitle>{editingMember ? "Edit Member" : "Add New Member"}</CardTitle>
							<CardDescription>
								{editingMember
									? "Update the member details below"
									: "Fill in the details to add a new member to the database"}
							</CardDescription>
						</CardHeader>
						<CardContent>
							{editingMember && (
								<div className="mb-4 p-3 bg-yellow-100 text-yellow-800 rounded-md">
									Editing: <strong>{editingMember.name}</strong>
									<Button
										variant="link"
										size="sm"
										onClick={handleCancelEdit}
										className="ml-2 p-0 h-auto text-yellow-800"
									>
										Cancel
									</Button>
								</div>
							)}
							<form onSubmit={handleSubmit} className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="name">Name *</Label>
									<Input
										id="name"
										placeholder="John Doe"
										value={name}
										onChange={(e) => setName(e.target.value)}
										required
									/>
								</div>

								<div className="space-y-2">
									<Label>Photo *</Label>
									<div className="flex gap-2 mb-2">
										<Button
											type="button"
											variant={!usePhotoUrl ? "default" : "outline"}
											size="sm"
											onClick={() => {
												setUsePhotoUrl(false);
												setTimeout(() => fileInputRef.current?.click(), 0);
											}}
										>
											Upload File
										</Button>
										<Button
											type="button"
											variant={usePhotoUrl ? "default" : "outline"}
											size="sm"
											onClick={() => setUsePhotoUrl(true)}
										>
											Use URL
										</Button>
									</div>
									{usePhotoUrl ? (
										<Input
											id="photoUrl"
											placeholder="https://example.com/photo.jpg"
											value={photoUrl}
											onChange={(e) => setPhotoUrl(e.target.value)}
											required={usePhotoUrl}
										/>
									) : (
										<div className="flex items-center gap-4">
											{photoPreview && (
												<div className="relative w-20 h-20 rounded-lg overflow-hidden bg-muted shrink-0">
													<Image
														src={photoPreview}
														alt="Preview"
														fill
														className="object-cover"
													/>
												</div>
											)}
											<div className="flex-1">
												<Input
													ref={fileInputRef}
													id="photo"
													type="file"
													accept="image/*"
													onChange={handlePhotoChange}
													className="cursor-pointer hidden"
												/>
												<Button
													type="button"
													variant="outline"
													size="sm"
													onClick={() => fileInputRef.current?.click()}
												>
													Choose File
												</Button>
											</div>
										</div>
									)}
								</div>

								<div className="space-y-2">
									<Label htmlFor="roleCompany">Role/Company *</Label>
									<Input
										id="roleCompany"
										placeholder="Fullstack Developer at Company"
										value={roleCompany}
										onChange={(e) => setRoleCompany(e.target.value)}
										required
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="xLink">X Handle *</Label>
									<Input
										id="xLink"
										placeholder="username"
										value={xLink}
										onChange={(e) => setXLink(e.target.value)}
										required
										disabled={!!editingMember}
									/>
									{editingMember && (
										<p className="text-xs text-muted-foreground">
											X Handle cannot be changed
										</p>
									)}
								</div>

								<div className="space-y-2">
									<Label htmlFor="skills">Skills (comma-separated) *</Label>
									<Input
										id="skills"
										placeholder="React, Node.js, TypeScript"
										value={skills}
										onChange={(e) => setSkills(e.target.value)}
										required
									/>
								</div>

								<div className="space-y-2">
									<Label>Achievements</Label>
									{achievements.map((achievement, index) => (
										<div key={index} className="flex gap-2">
											<select
												className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
												value={achievement.type}
												onChange={(e) => handleAchievementChange(index, "type", e.target.value)}
											>
												<option value="">Select type</option>
												<option value="hackathon">Hackathon</option>
												<option value="project">Project</option>
												<option value="grant">Grant</option>
												<option value="dao">DAO</option>
												<option value="bounty">Bounty</option>
											</select>
											<Input
												placeholder="Description"
												value={achievement.info}
												onChange={(e) => handleAchievementChange(index, "info", e.target.value)}
												className="flex-1"
											/>
											{achievements.length > 1 && (
												<Button
													type="button"
													variant="destructive"
													onClick={() => handleRemoveAchievement(index)}
												>
													X
												</Button>
											)}
										</div>
									))}
									<Button type="button" variant="outline" onClick={handleAddAchievement}>
										Add Achievement
									</Button>
								</div>

								{message && (
									<div
										className={`p-3 rounded-md ${
											message.type === "success"
												? "bg-green-100 text-green-800"
												: "bg-red-100 text-red-800"
										}`}
									>
										{message.text}
									</div>
								)}

								<div className="flex gap-2">
									<Button type="submit" className="flex-1" disabled={isLoading}>
										{isLoading
											? "Saving..."
											: editingMember
											? "Update Member"
											: "Add Member"}
									</Button>
									{editingMember && (
										<Button
											type="button"
											variant="outline"
											onClick={handleCancelEdit}
										>
											Cancel
										</Button>
									)}
								</div>
							</form>
						</CardContent>
					</Card>

					{/* Members List Section */}
					<Card>
						<CardHeader>
							<CardTitle>Existing Members</CardTitle>
							<CardDescription>
								{members.length} member{members.length !== 1 ? "s" : ""} in database
							</CardDescription>
							<div className="relative mt-2">
								<LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
								<Input
									placeholder="Search members..."
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									className="pl-9"
								/>
							</div>
						</CardHeader>
						<CardContent>
							{(() => {
								const filteredMembers = members.filter(
									(m) =>
										m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
										m.xLink.toLowerCase().includes(searchQuery.toLowerCase()) ||
										m.roleCompany.toLowerCase().includes(searchQuery.toLowerCase()) ||
										m.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
								);
								if (isLoadingMembers) {
									return <p>Loading...</p>;
								}
								if (filteredMembers.length === 0) {
									return (
										<p className="text-muted-foreground">
											{members.length === 0 ? "No members found." : "No members match your search."}
										</p>
									);
								}
								return (
									<div className="space-y-3 max-h-[600px] overflow-y-auto">
										{filteredMembers.map((member) => (
										<div
											key={member.id}
											className="flex items-center gap-3 p-3 border rounded-lg"
										>
											<div className="relative w-12 h-12 rounded-lg overflow-hidden bg-muted shrink-0">
												<Image
													src={member.photoUrl}
													alt={member.name}
													fill
													className="object-cover"
												/>
											</div>
											<div className="flex-1 min-w-0">
												<p className="font-medium truncate">{member.name}</p>
												<p className="text-sm text-muted-foreground truncate">
													@{member.xLink}
												</p>
											</div>
											<div className="flex gap-2">
												<Button
													variant="outline"
													size="sm"
													onClick={() => handleEdit(member)}
												>
													Edit
												</Button>
												<Button
													variant="destructive"
													size="sm"
													onClick={() => handleDelete(member.id)}
												>
													Delete
												</Button>
											</div>
										</div>
									))}
								</div>
								);
							})()}
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
