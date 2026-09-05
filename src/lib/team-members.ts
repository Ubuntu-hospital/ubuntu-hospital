import { teamPageContent } from "@/content/team";

export type ManagedTeamMember = {
  id: string;
  name: string;
  role: string;
  unit: string;
  image: string;
  imageAlt: string;
  group: string;
  sortOrder?: number;
};

function serialize(member: {
  _id: { toString(): string };
  name: string;
  role: string;
  unit: string;
  image: string;
  imageAlt: string;
  group: string;
  sortOrder?: number;
}) {
  return {
    id: member._id.toString(),
    name: member.name,
    role: member.role,
    unit: member.unit,
    image: member.image,
    imageAlt: member.imageAlt,
    group: member.group,
    sortOrder: member.sortOrder ?? 0,
  } satisfies ManagedTeamMember;
}

export async function listTeamMembers() {
  const [{ connectToDatabase }, { TeamMemberModel }] = await Promise.all([
    import("@/lib/mongodb"),
    import("@/models/team-member"),
  ]);
  await connectToDatabase();
  const members = await TeamMemberModel.find({ active: true })
    .sort({ group: 1, sortOrder: 1, createdAt: 1 })
    .lean();
  return members.map(serialize);
}

export async function listTeamMembersForAdmin() {
  const [{ connectToDatabase }, { TeamMemberModel }] = await Promise.all([
    import("@/lib/mongodb"),
    import("@/models/team-member"),
  ]);
  await connectToDatabase();
  const members = await TeamMemberModel.find()
    .sort({ group: 1, sortOrder: 1 })
    .lean();
  return members.map(serialize);
}

export function getTeamFallbackGroups() {
  return teamPageContent.directory.groups;
}
