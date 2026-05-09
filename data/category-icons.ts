import type { LucideIcon } from "lucide-react";
import {
  BriefcaseBusiness,
  Gamepad2,
  Headphones,
  Home,
  Keyboard,
  Laptop,
  Monitor,
  PlugZap,
  Smartphone,
  Sparkles,
  Tag,
  TrendingUp,
} from "lucide-react";
import type { Category, CategoryRecord } from "./categories";

const iconMap: Record<string, LucideIcon> = {
  briefcase: BriefcaseBusiness,
  "briefcase-business": BriefcaseBusiness,
  gamepad: Gamepad2,
  headphones: Headphones,
  home: Home,
  keyboard: Keyboard,
  laptop: Laptop,
  monitor: Monitor,
  plug: PlugZap,
  "plug-zap": PlugZap,
  smartphone: Smartphone,
  sparkles: Sparkles,
  tag: Tag,
  trending: TrendingUp,
  "trending-up": TrendingUp,
};

export function withCategoryIcon(category: CategoryRecord): Category {
  return {
    ...category,
    icon: iconMap[category.iconName] ?? Tag,
  };
}
