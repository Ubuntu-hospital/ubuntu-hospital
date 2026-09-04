"use server";

import { revalidatePath } from "next/cache";
import { routes } from "@/config/routes";
import { requireAdminSession } from "@/lib/admin-auth";
import { requireSuperAdminSession } from "@/lib/admin-auth";

type GalleryCategory = "hospital" | "care" | "facilities" | "patients";

function text(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function number(formData: FormData, key: string) {
  const value = Number(text(formData, key));
  return Number.isFinite(value) ? value : 0;
}

function required(value: string, label: string) {
  if (!value) throw new Error(`${label} is required.`);
  return value;
}

export async function createTeamMemberAction(formData: FormData) {
  await requireAdminSession();
  await requireSuperAdminSession();
  const name = required(text(formData, "name"), "Name");
  const role = required(text(formData, "role"), "Role");
  const unit = required(text(formData, "unit"), "Unit");
  const group = required(text(formData, "group"), "Team group");
  const image = required(text(formData, "image"), "Image URL");
  const imageAlt = text(formData, "imageAlt") || `${name} - ${role}`;

  const [{ connectToDatabase }, { TeamMemberModel }] = await Promise.all([
    import("@/lib/mongodb"),
    import("@/models/team-member"),
  ]);
  await connectToDatabase();

  let sortOrder = number(formData, "sortOrder");
  if (!sortOrder || sortOrder <= 0) {
    const highest = await TeamMemberModel.findOne({})
      .sort({ sortOrder: -1 })
      .select("sortOrder")
      .lean();
    sortOrder = ((highest as any)?.sortOrder ?? 0) + 1;
  }

  const member = {
    name,
    role,
    unit,
    group,
    image,
    imageAlt,
    sortOrder,
    active: true,
  };

  await TeamMemberModel.create(member);

  revalidatePath(routes.home);
  revalidatePath(routes.team);
  revalidatePath(routes.admin.team);
  return {
    success: true,
    message: `Team member ${member.name} added successfully.`,
  };
}

export async function deleteTeamMemberAction(formData: FormData) {
  await requireAdminSession();
  await requireSuperAdminSession();
  const id = required(text(formData, "id"), "Member ID");

  const [{ connectToDatabase }, { TeamMemberModel }] = await Promise.all([
    import("@/lib/mongodb"),
    import("@/models/team-member"),
  ]);
  await connectToDatabase();
  await TeamMemberModel.findByIdAndDelete(id);

  revalidatePath(routes.home);
  revalidatePath(routes.team);
  revalidatePath(routes.admin.team);
  return { success: true, message: "Team member removed." };
}

export async function updateTeamMemberAction(formData: FormData) {
  await requireAdminSession();
  await requireSuperAdminSession();
  const id = required(text(formData, "id"), "Member ID");
  const name = required(text(formData, "name"), "Name");
  const role = required(text(formData, "role"), "Role");
  const unit = required(text(formData, "unit"), "Unit");
  const group = required(text(formData, "group"), "Team group");
  const imageAlt = text(formData, "imageAlt") || `${name} - ${role}`;
  const targetOrder = number(formData, "sortOrder");

  const [{ connectToDatabase }, { TeamMemberModel }] = await Promise.all([
    import("@/lib/mongodb"),
    import("@/models/team-member"),
  ]);
  await connectToDatabase();

  const existingMember = await TeamMemberModel.findById(id);
  const oldOrder = existingMember?.sortOrder ?? 0;

  // If new sortOrder collides with an existing member, swap their positions!
  if (targetOrder > 0 && targetOrder !== oldOrder) {
    const conflictingMember = await TeamMemberModel.findOne({
      _id: { $ne: id },
      sortOrder: targetOrder,
    });
    if (conflictingMember) {
      await TeamMemberModel.findByIdAndUpdate(conflictingMember._id, {
        sortOrder: oldOrder,
      });
    }
  }

  const update: Record<string, any> = {
    name,
    role,
    unit,
    group,
    imageAlt,
    sortOrder: targetOrder > 0 ? targetOrder : oldOrder,
  };

  const newImage = text(formData, "image");
  if (newImage) {
    update.image = newImage;
  }

  await TeamMemberModel.findByIdAndUpdate(id, update);

  revalidatePath(routes.home);
  revalidatePath(routes.team);
  revalidatePath(routes.admin.team);
  return { success: true, message: `Updated details for ${name}.` };
}

export async function saveFacilityImageAction(formData: FormData) {
  await requireAdminSession();
  await requireSuperAdminSession();
  const facilityId = required(text(formData, "facilityId"), "Facility");
  const image = required(text(formData, "image"), "Image URL");
  const imageAlt = text(formData, "imageAlt") || facilityId;
  const publicId = text(formData, "publicId") || null;

  const [{ connectToDatabase }, { FacilityImageModel }] = await Promise.all([
    import("@/lib/mongodb"),
    import("@/models/facility-image"),
  ]);
  await connectToDatabase();
  await FacilityImageModel.findOneAndUpdate(
    { facilityId },
    { facilityId, image, imageAlt, publicId },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );

  revalidatePath(routes.home);
  revalidatePath(routes.facilities);
  revalidatePath(routes.gallery);
  revalidatePath(routes.admin.facilities);
  return { success: true, message: "Facility photo updated successfully." };
}

export async function createGalleryImageAction(formData: FormData) {
  await requireAdminSession();
  await requireSuperAdminSession();
  const title = required(text(formData, "title"), "Title");
  const category = text(formData, "category") as GalleryCategory;
  if (!["hospital", "care", "facilities", "patients"].includes(category)) {
    throw new Error("Choose a valid gallery category.");
  }
  const alt = text(formData, "alt") || title;

  const [{ connectToDatabase }, { GalleryImageModel }] = await Promise.all([
    import("@/lib/mongodb"),
    import("@/models/gallery-image"),
  ]);
  await connectToDatabase();

  let sortOrder = number(formData, "sortOrder");
  if (!sortOrder || sortOrder <= 0) {
    const highest = await GalleryImageModel.findOne({})
      .sort({ sortOrder: -1 })
      .select("sortOrder")
      .lean();
    sortOrder = ((highest as any)?.sortOrder ?? 0) + 1;
  }

  const image = {
    title,
    category,
    image: required(text(formData, "image"), "Image URL"),
    alt,
    publicId: text(formData, "publicId") || null,
    featured: formData.get("featured") === "on",
    sortOrder,
    active: true,
  };

  await GalleryImageModel.create(image);

  revalidatePath(routes.home);
  revalidatePath(routes.gallery);
  revalidatePath(routes.admin.gallery);
  return { success: true, message: `Image "${title}" added to gallery.` };
}

export async function deleteGalleryImageAction(formData: FormData) {
  await requireAdminSession();
  await requireSuperAdminSession();
  const id = required(text(formData, "id"), "Image ID");

  const [{ connectToDatabase }, { GalleryImageModel }] = await Promise.all([
    import("@/lib/mongodb"),
    import("@/models/gallery-image"),
  ]);
  await connectToDatabase();
  await GalleryImageModel.findByIdAndDelete(id);

  revalidatePath(routes.home);
  revalidatePath(routes.gallery);
  revalidatePath(routes.admin.gallery);
  return { success: true, message: "Gallery image removed." };
}

export async function saveSectionImageAction(formData: FormData) {
  await requireAdminSession();
  await requireSuperAdminSession();
  const sectionId = required(text(formData, "sectionId"), "Section ID");
  const image = required(text(formData, "image"), "Image URL");
  const imageAlt = text(formData, "imageAlt") || sectionId;
  const publicId = text(formData, "publicId") || null;

  const [{ connectToDatabase }, { SectionImageModel }] = await Promise.all([
    import("@/lib/mongodb"),
    import("@/models/section-image"),
  ]);
  await connectToDatabase();
  await SectionImageModel.findOneAndUpdate(
    { sectionId },
    { sectionId, image, imageAlt, publicId },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );

  revalidatePath(routes.home);
  revalidatePath(routes.patients);
  revalidatePath(routes.contact);
  revalidatePath(routes.services);
  revalidatePath(routes.about);
  revalidatePath(routes.admin.sections);
  return { success: true, message: "Section photo updated successfully." };
}

export async function createTestimonyAction(formData: FormData) {
  await requireAdminSession();
  await requireSuperAdminSession();
  const name = required(text(formData, "name"), "Patient Name");
  const context = required(
    text(formData, "context"),
    "Care context / department",
  );
  const quote = required(text(formData, "quote"), "Testimony / Quote");
  const image = text(formData, "image") || null;
  const imageAlt = text(formData, "imageAlt") || `${name} - ${context}`;
  const publicId = text(formData, "publicId") || null;

  const [{ connectToDatabase }, { TestimonyModel }] = await Promise.all([
    import("@/lib/mongodb"),
    import("@/models/testimony"),
  ]);
  await connectToDatabase();

  const highest = await TestimonyModel.findOne({})
    .sort({ sortOrder: -1 })
    .select("sortOrder")
    .lean();
  const sortOrder = ((highest as any)?.sortOrder ?? 0) + 1;

  await TestimonyModel.create({
    name,
    context,
    quote,
    image,
    imageAlt,
    publicId,
    active: true,
    sortOrder,
  });

  revalidatePath(routes.home);
  revalidatePath(routes.about);
  revalidatePath(routes.admin.testimonies);
  return {
    success: true,
    message: `Testimony from "${name}" added successfully.`,
  };
}

export async function updateTestimonyAction(formData: FormData) {
  await requireAdminSession();
  await requireSuperAdminSession();
  const id = required(text(formData, "id"), "Testimony ID");
  const name = required(text(formData, "name"), "Patient Name");
  const context = required(
    text(formData, "context"),
    "Care context / department",
  );
  const quote = required(text(formData, "quote"), "Testimony / Quote");
  const imageAlt = text(formData, "imageAlt") || `${name} - ${context}`;

  const update: Record<string, any> = {
    name,
    context,
    quote,
    imageAlt,
  };

  const newImage = text(formData, "image");
  if (newImage !== undefined && newImage !== "") {
    update.image = newImage;
  }

  const [{ connectToDatabase }, { TestimonyModel }] = await Promise.all([
    import("@/lib/mongodb"),
    import("@/models/testimony"),
  ]);
  await connectToDatabase();
  await TestimonyModel.findByIdAndUpdate(id, update);

  revalidatePath(routes.home);
  revalidatePath(routes.about);
  revalidatePath(routes.admin.testimonies);
  return { success: true, message: `Updated testimony for "${name}".` };
}

export async function deleteTestimonyAction(formData: FormData) {
  await requireAdminSession();
  await requireSuperAdminSession();
  const id = required(text(formData, "id"), "Testimony ID");

  const [{ connectToDatabase }, { TestimonyModel }] = await Promise.all([
    import("@/lib/mongodb"),
    import("@/models/testimony"),
  ]);
  await connectToDatabase();
  await TestimonyModel.findByIdAndDelete(id);

  revalidatePath(routes.home);
  revalidatePath(routes.about);
  revalidatePath(routes.admin.testimonies);
  return { success: true, message: "Testimony removed successfully." };
}
