"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import { LuSearch, LuUsers, LuHandshake } from "react-icons/lu";

// Types
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

interface Partner {
	id: string;
	name: string;
	logoUrl: string;
	logoUrlDark: string;
	websiteUrl: string;
}

export default function AdminPage() {
	const router = useRouter();
	const supabase = createClient();
	const [activeTab, setActiveTab] = useState<"members" | "partners">("members");
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

	// Members state
	const [members, setMembers] = useState<Member[]>([]);
	const [editingMember, setEditingMember] = useState<Member | null>(null);
	const [isLoadingMembers, setIsLoadingMembers] = useState(true);
	const [searchQueryMembers, setSearchQueryMembers] = useState("");

	// Partners state
	const [partners, setPartners] = useState<Partner[]>([]);
	const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
	const [isLoadingPartners, setIsLoadingPartners] = useState(true);
	const [searchQueryPartners, setSearchQueryPartners] = useState("");

	// Member form state
	const [name, setName] = useState("");
	const [photoFile, setPhotoFile] = useState<File | null>(null);
	const [photoPreview, setPhotoPreview] = useState<string | null>(null);
	const [photoUrl, setPhotoUrl] = useState("");
	const [usePhotoUrl, setUsePhotoUrl] = useState(false);
	const [roleCompany, setRoleCompany] = useState("");
	const [xLink, setXLink] = useState("");
	const [skills, setSkills] = useState("");
	const [achievements, setAchievements] = useState<Achievement[]>([{ type: "", info: "" }]);

	// Partner form state
	const [partnerName, setPartnerName] = useState("");
	const [logoFile, setLogoFile] = useState<File | null>(null);
	const [logoPreview, setLogoPreview] = useState<string | null>(null);
	const [logoUrl, setLogoUrl] = useState("");
	const [useLogoUrl, setUseLogoUrl] = useState(false);
	const [logoFileDark, setLogoFileDark] = useState<File | null>(null);
	const [logoPreviewDark, setLogoPreviewDark] = useState<string | null>(null);
	const [logoUrlDark, setLogoUrlDark] = useState("");
	const [useLogoUrlDark, setUseLogoUrlDark] = useState(false);
	const [websiteUrl, setWebsiteUrl] = useState("");

	const fileInputRef = useRef<HTMLInputElement>(null);
	const fileInputDarkRef = useRef<HTMLInputElement>(null);

	// Fetch data
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

	const fetchPartners = async () => {
		setIsLoadingPartners(true);
		const { data, error } = await supabase
			.from("partners")
			.select("*")
			.order("created_at", { ascending: false });

		if (!error && data) {
			setPartners(
				data.map((p) => ({
					id: p.id,
					name: p.name,
					logoUrl: p.logo_url,
					logoUrlDark: p.logo_url_dark || p.logo_url,
					websiteUrl: p.website_url || "",
				}))
			);
		}
		setIsLoadingPartners(false);
	};

	// Check admin session
	useEffect(() => {
		const session = localStorage.getItem("admin_session");
		if (!session) {
			router.push("/admin/login");
		} else {
			fetchMembers();
			fetchPartners();
		}
	}, [router]);

	const handleLogout = () => {
		localStorage.removeItem("admin_session");
		router.push("/admin/login");
	};

	// ==================== MEMBER HANDLERS ====================

	const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setPhotoFile(file);
			const reader = new FileReader();
			reader.onloadend = () => setPhotoPreview(reader.result as string);
			reader.readAsDataURL(file);
		}
	};

	const handleAddAchievement = () => setAchievements([...achievements, { type: "", info: "" }]);
	const handleRemoveAchievement = (index: number) => setAchievements(achievements.filter((_, i) => i !== index));
	const handleAchievementChange = (index: number, field: keyof Achievement, value: string) => {
		const newAchievements = [...achievements];
		newAchievements[index] = { ...newAchievements[index], [field]: value };
		setAchievements(newAchievements);
	};

	const handleEditMember = (member: Member) => {
		setEditingMember(member);
		setName(member.name);
		setPhotoUrl(member.photoUrl);
		setPhotoPreview(member.photoUrl);
		setPhotoFile(null);
		setRoleCompany(member.roleCompany);
		setXLink(member.xLink);
		setSkills(member.skills.join(", "));
		setAchievements(member.achievements.length > 0 ? member.achievements : [{ type: "", info: "" }]);
		setUsePhotoUrl(true);
		setMessage(null);
	};

	const handleCancelEditMember = () => {
		setEditingMember(null);
		resetMemberForm();
	};

	const resetMemberForm = () => {
		setName("");
		setPhotoFile(null);
		setPhotoPreview(null);
		setPhotoUrl("");
		setUsePhotoUrl(false);
		setRoleCompany("");
		setXLink("");
		setSkills("");
		setAchievements([{ type: "", info: "" }]);
		if (fileInputRef.current) fileInputRef.current.value = "";
	};

	const handleSubmitMember = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setMessage(null);

		try {
			if (!name.trim() || !xLink.trim() || !roleCompany.trim() || !skills.trim()) {
				throw new Error("All required fields must be filled");
			}

			let finalPhotoUrl = "";
			if (usePhotoUrl) {
				if (!photoUrl.trim()) throw new Error("Photo URL is required");
				finalPhotoUrl = photoUrl;
			} else if (photoFile) {
				const cleanXHandle = xLink.replace(/[^a-zA-Z0-9]/g, "_");
				const fileExt = photoFile.name.split(".").pop();
				const fileName = `${cleanXHandle}_${Date.now()}.${fileExt}`;

				const { data: uploadData, error: uploadError } = await supabase.storage
					.from("member-photos")
					.upload(fileName, photoFile, { cacheControl: "3600", upsert: false });

				if (uploadError) throw new Error(`Failed to upload photo: ${uploadError.message}`);

				const { data: urlData } = supabase.storage.from("member-photos").getPublicUrl(fileName);
				finalPhotoUrl = urlData.publicUrl;
			} else if (editingMember) {
				finalPhotoUrl = editingMember.photoUrl;
			} else {
				throw new Error("Photo is required");
			}

			const filteredAchievements = achievements.filter((a) => a.type.trim() !== "" && a.info.trim() !== "");
			const skillsArray = skills.split(",").map((s) => s.trim()).filter(Boolean);
			const memberId = editingMember?.id || xLink.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase();

			if (editingMember) {
				const { error } = await supabase
					.from("members")
					.update({ name, photo_url: finalPhotoUrl, role_company: roleCompany, x_link: xLink, skills: skillsArray, achievements: filteredAchievements })
					.eq("id", editingMember.id);
				if (error) throw error;
				setMessage({ type: "success", text: "Member updated successfully!" });
			} else {
				const formData = new FormData();
				formData.append("name", name);
				formData.append("xLink", xLink);
				formData.append("roleCompany", roleCompany);
				formData.append("skills", skills);
				formData.append("achievements", JSON.stringify(filteredAchievements));
				formData.append("photo", photoFile as unknown as string);

				const response = await fetch("/api/admin/members", { method: "POST", body: formData });
				const result = await response.json();
				if (!response.ok) throw new Error(result.error || "Failed to add member");
				setMessage({ type: "success", text: "Member added successfully!" });
			}

			resetMemberForm();
			setEditingMember(null);
			fetchMembers();
		} catch (error: unknown) {
			const err = error as { message?: string };
			setMessage({ type: "error", text: err.message || "Failed to save member" });
		}

		setIsLoading(false);
	};

	const handleDeleteMember = async (memberId: string) => {
		if (!confirm("Are you sure you want to delete this member?")) return;
		const { error } = await supabase.from("members").delete().eq("id", memberId);
		if (error) alert("Failed to delete member: " + error.message);
		else fetchMembers();
	};

	// ==================== PARTNER HANDLERS ====================

	const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setLogoFile(file);
			const reader = new FileReader();
			reader.onloadend = () => setLogoPreview(reader.result as string);
			reader.readAsDataURL(file);
		}
	};

	const handleLogoDarkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setLogoFileDark(file);
			const reader = new FileReader();
			reader.onloadend = () => setLogoPreviewDark(reader.result as string);
			reader.readAsDataURL(file);
		}
	};

	const handleEditPartner = (partner: Partner) => {
		setEditingPartner(partner);
		setPartnerName(partner.name);
		setLogoUrl(partner.logoUrl);
		setLogoPreview(partner.logoUrl);
		setLogoUrlDark(partner.logoUrlDark);
		setLogoPreviewDark(partner.logoUrlDark);
		setLogoFile(null);
		setLogoFileDark(null);
		setWebsiteUrl(partner.websiteUrl);
		setUseLogoUrl(true);
		setUseLogoUrlDark(true);
		setMessage(null);
	};

	const handleCancelEditPartner = () => {
		setEditingPartner(null);
		resetPartnerForm();
	};

	const resetPartnerForm = () => {
		setPartnerName("");
		setLogoFile(null);
		setLogoPreview(null);
		setLogoUrl("");
		setLogoFileDark(null);
		setLogoPreviewDark(null);
		setLogoUrlDark("");
		setUseLogoUrl(false);
		setUseLogoUrlDark(false);
		setWebsiteUrl("");
		if (fileInputRef.current) fileInputRef.current.value = "";
		if (fileInputDarkRef.current) fileInputDarkRef.current.value = "";
	};

	const handleSubmitPartner = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setMessage(null);

		try {
			if (!partnerName.trim()) throw new Error("Partner name is required");

			// Use API route which has service role key
			const formData = new FormData();
			formData.append("name", partnerName);
			formData.append("logoUrl", useLogoUrl ? logoUrl : "");
			formData.append("logoUrlDark", useLogoUrlDark ? logoUrlDark : "");
			formData.append("websiteUrl", websiteUrl);
			formData.append("isUpdate", editingPartner ? "true" : "false");
			formData.append("existingId", editingPartner?.id || "");

			if (!useLogoUrl && logoFile) {
				formData.append("logoFile", logoFile);
			}
			if (!useLogoUrlDark && logoFileDark) {
				formData.append("logoFileDark", logoFileDark);
			}

			const response = await fetch("/api/admin/partners", {
				method: "POST",
				body: formData,
			});

			const result = await response.json();

			if (!response.ok) {
				throw new Error(result.error || "Failed to save partner");
			}

			setMessage({ type: "success", text: editingPartner ? "Partner updated successfully!" : "Partner added successfully!" });

			resetPartnerForm();
			setEditingPartner(null);
			fetchPartners();
		} catch (error: unknown) {
			const err = error as { message?: string };
			setMessage({ type: "error", text: err.message || "Failed to save partner" });
		}

		setIsLoading(false);
	};

	const handleDeletePartner = async (partnerId: string) => {
		if (!confirm("Are you sure you want to delete this partner?")) return;

		try {
			const response = await fetch(`/api/admin/partners?id=${partnerId}`, {
				method: "DELETE",
			});
			if (!response.ok) {
				throw new Error("Failed to delete partner");
			}
			fetchPartners();
		} catch {
			alert("Failed to delete partner");
		}
	};

	// Filter data
	const filteredMembers = members.filter(
		(m) =>
			m.name.toLowerCase().includes(searchQueryMembers.toLowerCase()) ||
			m.xLink.toLowerCase().includes(searchQueryMembers.toLowerCase()) ||
			m.roleCompany.toLowerCase().includes(searchQueryMembers.toLowerCase()) ||
			m.skills.some((s) => s.toLowerCase().includes(searchQueryMembers.toLowerCase()))
	);

	const filteredPartners = partners.filter(
		(p) =>
			p.name.toLowerCase().includes(searchQueryPartners.toLowerCase()) ||
			p.websiteUrl.toLowerCase().includes(searchQueryPartners.toLowerCase())
	);

	return (
		<div className="min-h-screen bg-background p-4 md:p-8">
			<div className="max-w-6xl mx-auto">
				<div className="flex justify-between items-center mb-6">
					<h1 className="text-2xl font-bold">Admin Dashboard</h1>
					<Button variant="outline" onClick={handleLogout}>Logout</Button>
				</div>

				{/* Tabs */}
				<div className="flex gap-2 mb-6">
					<Button variant={activeTab === "members" ? "default" : "outline"} onClick={() => setActiveTab("members")}>
						<LuUsers className="mr-2 h-4 w-4" /> Members
					</Button>
					<Button variant={activeTab === "partners" ? "default" : "outline"} onClick={() => setActiveTab("partners")}>
						<LuHandshake className="mr-2 h-4 w-4" /> Partners
					</Button>
				</div>

				{/* MEMBERS TAB */}
				{activeTab === "members" && (
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						<Card>
							<CardHeader>
								<CardTitle>{editingMember ? "Edit Member" : "Add New Member"}</CardTitle>
								<CardDescription>{editingMember ? "Update the member details below" : "Fill in the details to add a new member"}</CardDescription>
							</CardHeader>
							<CardContent>
								{editingMember && (
									<div className="mb-4 p-3 bg-yellow-100 text-yellow-800 rounded-md">
										Editing: <strong>{editingMember.name}</strong>
										<Button variant="link" size="sm" onClick={handleCancelEditMember} className="ml-2 p-0 h-auto text-yellow-800">Cancel</Button>
									</div>
								)}
								<form onSubmit={handleSubmitMember} className="space-y-4">
									<div className="space-y-2">
										<Label htmlFor="name">Name *</Label>
										<Input id="name" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required />
									</div>
									<div className="space-y-2">
										<Label>Photo *</Label>
										<div className="flex gap-2 mb-2">
											<Button type="button" variant={!usePhotoUrl ? "default" : "outline"} size="sm" onClick={() => { setUsePhotoUrl(false); setTimeout(() => fileInputRef.current?.click(), 0); }}>Upload File</Button>
											<Button type="button" variant={usePhotoUrl ? "default" : "outline"} size="sm" onClick={() => setUsePhotoUrl(true)}>Use URL</Button>
										</div>
										{usePhotoUrl ? (
											<Input id="photoUrl" placeholder="https://example.com/photo.jpg" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} required={usePhotoUrl} />
										) : (
											<div className="flex items-center gap-4">
												{photoPreview && <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-muted shrink-0"><Image src={photoPreview} alt="Preview" fill className="object-cover" /></div>}
												<div className="flex-1">
													<Input ref={fileInputRef} id="photo" type="file" accept="image/*" onChange={handlePhotoChange} className="cursor-pointer hidden" />
													<Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>Choose File</Button>
												</div>
											</div>
										)}
									</div>
									<div className="space-y-2">
										<Label htmlFor="roleCompany">Role/Company *</Label>
										<Input id="roleCompany" placeholder="Fullstack Developer at Company" value={roleCompany} onChange={(e) => setRoleCompany(e.target.value)} required />
									</div>
									<div className="space-y-2">
										<Label htmlFor="xLink">X Handle *</Label>
										<Input id="xLink" placeholder="username" value={xLink} onChange={(e) => setXLink(e.target.value)} required disabled={!!editingMember} />
									</div>
									<div className="space-y-2">
										<Label htmlFor="skills">Skills (comma-separated) *</Label>
										<Input id="skills" placeholder="React, Node.js, TypeScript" value={skills} onChange={(e) => setSkills(e.target.value)} required />
									</div>
									<div className="space-y-2">
										<Label>Achievements</Label>
										{achievements.map((achievement, index) => (
											<div key={index} className="flex gap-2">
												<select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={achievement.type} onChange={(e) => handleAchievementChange(index, "type", e.target.value)}>
													<option value="">Select type</option>
													<option value="hackathon">Hackathon</option>
													<option value="project">Project</option>
													<option value="grant">Grant</option>
													<option value="dao">DAO</option>
													<option value="bounty">Bounty</option>
												</select>
												<Input placeholder="Description" value={achievement.info} onChange={(e) => handleAchievementChange(index, "info", e.target.value)} className="flex-1" />
												{achievements.length > 1 && <Button type="button" variant="destructive" onClick={() => handleRemoveAchievement(index)}>X</Button>}
											</div>
										))}
										<Button type="button" variant="outline" onClick={handleAddAchievement}>Add Achievement</Button>
									</div>
									{message && <div className={`p-3 rounded-md ${message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{message.text}</div>}
									<div className="flex gap-2">
										<Button type="submit" className="flex-1" disabled={isLoading}>{isLoading ? "Saving..." : editingMember ? "Update Member" : "Add Member"}</Button>
										{editingMember && <Button type="button" variant="outline" onClick={handleCancelEditMember}>Cancel</Button>}
									</div>
								</form>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Existing Members</CardTitle>
								<CardDescription>{members.length} member{members.length !== 1 ? "s" : ""} in database</CardDescription>
								<div className="relative mt-2">
									<LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
									<Input placeholder="Search members..." value={searchQueryMembers} onChange={(e) => setSearchQueryMembers(e.target.value)} className="pl-9" />
								</div>
							</CardHeader>
							<CardContent>
								{isLoadingMembers ? <p>Loading...</p> : filteredMembers.length === 0 ? <p className="text-muted-foreground">{members.length === 0 ? "No members found." : "No members match your search."}</p> : (
									<div className="space-y-3 max-h-[600px] overflow-y-auto">
										{filteredMembers.map((member) => (
											<div key={member.id} className="flex items-center gap-3 p-3 border rounded-lg">
												<div className="relative w-12 h-12 rounded-lg overflow-hidden bg-muted shrink-0"><Image src={member.photoUrl} alt={member.name} fill className="object-cover" /></div>
												<div className="flex-1 min-w-0"><p className="font-medium truncate">{member.name}</p><p className="text-sm text-muted-foreground truncate">@{member.xLink}</p></div>
												<div className="flex gap-2">
													<Button variant="outline" size="sm" onClick={() => handleEditMember(member)}>Edit</Button>
													<Button variant="destructive" size="sm" onClick={() => handleDeleteMember(member.id)}>Delete</Button>
												</div>
											</div>
										))}
									</div>
								)}
							</CardContent>
						</Card>
					</div>
				)}

				{/* PARTNERS TAB */}
				{activeTab === "partners" && (
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						<Card>
							<CardHeader>
								<CardTitle>{editingPartner ? "Edit Partner" : "Add New Partner"}</CardTitle>
								<CardDescription>{editingPartner ? "Update the partner details below" : "Fill in the details to add a new partner"}</CardDescription>
							</CardHeader>
							<CardContent>
								{editingPartner && (
									<div className="mb-4 p-3 bg-yellow-100 text-yellow-800 rounded-md">
										Editing: <strong>{editingPartner.name}</strong>
										<Button variant="link" size="sm" onClick={handleCancelEditPartner} className="ml-2 p-0 h-auto text-yellow-800">Cancel</Button>
									</div>
								)}
								<form onSubmit={handleSubmitPartner} className="space-y-4">
									<div className="space-y-2">
										<Label htmlFor="partnerName">Partner Name *</Label>
										<Input id="partnerName" placeholder="Partner Name" value={partnerName} onChange={(e) => setPartnerName(e.target.value)} required />
									</div>
									<div className="space-y-2">
										<Label>Light Mode Logo *</Label>
										<div className="flex gap-2 mb-2">
											<Button type="button" variant={!useLogoUrl ? "default" : "outline"} size="sm" onClick={() => { setUseLogoUrl(false); setTimeout(() => fileInputRef.current?.click(), 0); }}>Upload File</Button>
											<Button type="button" variant={useLogoUrl ? "default" : "outline"} size="sm" onClick={() => setUseLogoUrl(true)}>Use URL</Button>
										</div>
										{useLogoUrl ? (
											<Input id="logoUrl" placeholder="https://example.com/logo-light.png" value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} required={useLogoUrl} />
										) : (
											<div className="flex items-center gap-4">
												{logoPreview && <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-white border shrink-0"><Image src={logoPreview} alt="Preview" fill className="object-contain" /></div>}
												<div className="flex-1">
													<Input ref={fileInputRef} id="logo" type="file" accept="image/*" onChange={handleLogoChange} className="cursor-pointer hidden" />
													<Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>Choose File</Button>
												</div>
											</div>
										)}
									</div>
									<div className="space-y-2">
										<Label>Dark Mode Logo *</Label>
										<div className="flex gap-2 mb-2">
											<Button type="button" variant={!useLogoUrlDark ? "default" : "outline"} size="sm" onClick={() => { setUseLogoUrlDark(false); setTimeout(() => fileInputDarkRef.current?.click(), 0); }}>Upload File</Button>
											<Button type="button" variant={useLogoUrlDark ? "default" : "outline"} size="sm" onClick={() => setUseLogoUrlDark(true)}>Use URL</Button>
										</div>
										{useLogoUrlDark ? (
											<Input id="logoUrlDark" placeholder="https://example.com/logo-dark.png" value={logoUrlDark} onChange={(e) => setLogoUrlDark(e.target.value)} required={useLogoUrlDark} />
										) : (
											<div className="flex items-center gap-4">
												{logoPreviewDark && <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-black border shrink-0"><Image src={logoPreviewDark} alt="Preview" fill className="object-contain" /></div>}
												<div className="flex-1">
													<Input ref={fileInputDarkRef} id="logoDark" type="file" accept="image/*" onChange={handleLogoDarkChange} className="cursor-pointer hidden" />
													<Button type="button" variant="outline" size="sm" onClick={() => fileInputDarkRef.current?.click()}>Choose File</Button>
												</div>
											</div>
										)}
									</div>
									<div className="space-y-2">
										<Label htmlFor="websiteUrl">Website URL</Label>
										<Input id="websiteUrl" placeholder="https://partner-website.com" value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)} />
									</div>
									{message && <div className={`p-3 rounded-md ${message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{message.text}</div>}
									<div className="flex gap-2">
										<Button type="submit" className="flex-1" disabled={isLoading}>{isLoading ? "Saving..." : editingPartner ? "Update Partner" : "Add Partner"}</Button>
										{editingPartner && <Button type="button" variant="outline" onClick={handleCancelEditPartner}>Cancel</Button>}
									</div>
								</form>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Existing Partners</CardTitle>
								<CardDescription>{partners.length} partner{partners.length !== 1 ? "s" : ""} in database</CardDescription>
								<div className="relative mt-2">
									<LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
									<Input placeholder="Search partners..." value={searchQueryPartners} onChange={(e) => setSearchQueryPartners(e.target.value)} className="pl-9" />
								</div>
							</CardHeader>
							<CardContent>
								{isLoadingPartners ? <p>Loading...</p> : filteredPartners.length === 0 ? <p className="text-muted-foreground">{partners.length === 0 ? "No partners found." : "No partners match your search."}</p> : (
									<div className="space-y-3 max-h-[600px] overflow-y-auto">
										{filteredPartners.map((partner) => (
											<div key={partner.id} className="flex items-center gap-3 p-3 border rounded-lg">
												<div className="flex gap-2">
													<div className="relative w-10 h-10 rounded border overflow-hidden bg-white shrink-0"><Image src={partner.logoUrl} alt={`${partner.name} light`} fill className="object-contain" /></div>
													<div className="relative w-10 h-10 rounded border overflow-hidden bg-black shrink-0"><Image src={partner.logoUrlDark} alt={`${partner.name} dark`} fill className="object-contain" /></div>
												</div>
												<div className="flex-1 min-w-0"><p className="font-medium truncate">{partner.name}</p>{partner.websiteUrl && <p className="text-sm text-muted-foreground truncate">{partner.websiteUrl}</p>}</div>
												<div className="flex gap-2">
													<Button variant="outline" size="sm" onClick={() => handleEditPartner(partner)}>Edit</Button>
													<Button variant="destructive" size="sm" onClick={() => handleDeletePartner(partner.id)}>Delete</Button>
												</div>
											</div>
										))}
									</div>
								)}
							</CardContent>
						</Card>
					</div>
				)}
			</div>
		</div>
	);
}
