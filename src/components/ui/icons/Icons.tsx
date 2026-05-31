import type { ComponentType, CSSProperties } from "react";
import {
  Activity,
  BedDouble,
  Building2,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Coffee,
  Cross,
  Facebook,
  FlaskConical,
  HeartHandshake,
  HelpCircle,
  Instagram,
  Linkedin,
  Menu,
  Minus,
  Navigation as NavigationIcon,
  Phone,
  Pill,
  Play,
  Plus,
  ScanLine,
  Send,
  ShieldCheck,
  Siren,
  Stethoscope,
  UsersRound,
  X,
  Youtube,
} from "lucide-react";

export const icons: Record<
  string,
  ComponentType<{ size?: number; strokeWidth?: number; className?: string }>
> = {
  activity: Activity,
  bed: BedDouble,
  building: Building2,
  calendar: CalendarDays,
  coffee: Coffee,
  cross: Cross,
  flask: FlaskConical,
  "heart-handshake": HeartHandshake,
  pill: Pill,
  scan: ScanLine,
  shield: ShieldCheck,
  siren: Siren,
  stethoscope: Stethoscope,
  users: UsersRound,
};

export const socialIcons: Record<
  string,
  ComponentType<{ size?: number; strokeWidth?: number; className?: string }>
> = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
};

export function WhatsAppIcon({
  size = 24,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.58-.487-.501-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.075-.792.372-.273.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.693.625.712.227 1.36.195 1.871.118.57-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.981.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.9 6.994c-.003 5.45-4.437 9.884-9.892 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

export function KneeMark() {
  return (
    <svg viewBox="0 0 74 88" fill="none" aria-hidden="true">
      <path
        d="M27 4C29 16 29 24 22 33C16 41 16 49 21 56C25 61 26 69 24 83"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />

      <path
        d="M47 4C45 16 45 24 52 33C58 41 58 49 53 56C49 61 48 69 50 83"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />

      <path
        d="M22 35C30 31 44 31 52 35"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />

      <path
        d="M21 55C29 60 45 60 53 55"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function BrandMark({
  className = "",
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 80 67"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="40" cy="12" r="10" fill="currentColor" />
      <circle cx="15" cy="23" r="7" fill="currentColor" />
      <circle cx="65" cy="23" r="7" fill="currentColor" />

      <path
        d="M22 61C22 37 29 25 40 25C51 25 58 37 58 61"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
      />

      <path
        d="M2 56C2 38 7 29 15 29C23 29 27 38 27 56"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />

      <path
        d="M53 56C53 38 57 29 65 29C73 29 78 38 78 56"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export const NavigationIconComponent = NavigationIcon;
export const XIconComponent = X;
export const MenuIconComponent = Menu;
export const PhoneIconComponent = Phone;
export const SendIconComponent = Send;
export const ChevronLeftIconComponent = ChevronLeft;
export const ChevronRightIconComponent = ChevronRight;
export const PlayIconComponent = Play;
export const HelpCircleIconComponent = HelpCircle;
export const MinusIconComponent = Minus;
export const PlusIconComponent = Plus;
