import { hospitalConfig } from "@/config/hospital";
import type { NavigationItem } from "@/types/navigation";

export const navigation = hospitalConfig.navigation as readonly NavigationItem[];
