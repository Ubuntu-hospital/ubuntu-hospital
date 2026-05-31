import type { hospitalConfig } from "@/config/hospital";

export type HospitalConfig = typeof hospitalConfig;
export type HospitalService = HospitalConfig["services"][number];
export type HospitalFaqItem = HospitalConfig["faqs"]["items"][number];
export type HospitalSocialLink = HospitalConfig["socialLinks"][number];
