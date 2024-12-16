import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 설정
const ICONS_DIR = path.join(process.cwd(), "public/icons");
const SRC_DIR = path.join(process.cwd(), "src");
const COMPONENTS_DIR = path.join(SRC_DIR, "components");
const UTILS_DIR = path.join(SRC_DIR, "utils");
const ICON_DIR = path.join(COMPONENTS_DIR, "icon");
const ICON_TYPES_FILE = path.join(ICON_DIR, "IconName.ts");
const ICON_COMPONENT_FILE = path.join(ICON_DIR, "Icon.tsx");
const CN_UTILS_FILE = path.join(UTILS_DIR, "cn.ts");

function generateCnUtility() {
  const cnContent = `import type { ClassValue } from "clsx";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
`;

  // utils 디렉토리가 없으면 생성
  if (!fs.existsSync(UTILS_DIR)) {
    fs.mkdirSync(UTILS_DIR, { recursive: true });
  }

  // cn.ts 파일이 없을 때만 생성
  if (!fs.existsSync(CN_UTILS_FILE)) {
    fs.writeFileSync(CN_UTILS_FILE, cnContent);
    console.log(`✅ cn utility generated at ${CN_UTILS_FILE}`);
  }
}

function generateIconComponent() {
  const iconComponentContent = `import type { SVGProps } from "react";
import { cn } from "../../utils/cn";
import type { IconName } from "./IconName";

interface IconProps extends SVGProps<SVGSVGElement> {
  id: IconName;
  className?: string;
}

export default function Icon({
  id,
  width = 24,
  height = 24,
  fill = "none",
  className,
  ...rest
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      fill={fill}
      className={cn("shrink-0", className)}
      {...rest}
    >
      <use href={\`/sprite.svg#\${id}\`} />
    </svg>
  );
}`;

  fs.writeFileSync(ICON_COMPONENT_FILE, iconComponentContent);
  console.log(`✅ Icon component generated at ${ICON_COMPONENT_FILE}`);
}

function generateIconTypes() {
  // SVG 파일 목록 가져오기
  const files = fs
    .readdirSync(ICONS_DIR)
    .filter((file) => file.endsWith(".svg"))
    .map((file) => path.basename(file, ".svg"));

  // IconName enum 생성
  const enumContent = `export enum IconName {
  ${files.map((name) => `${name} = "${name}"`).join(",\n  ")}
}`;

  // components 디렉토리가 없으면 생성
  if (!fs.existsSync(COMPONENTS_DIR)) {
    fs.mkdirSync(COMPONENTS_DIR, { recursive: true });
  }

  // icon 디렉토리가 없으면 생성
  if (!fs.existsSync(ICON_DIR)) {
    fs.mkdirSync(ICON_DIR, { recursive: true });
  }

  // cn 유틸리티 생성
  generateCnUtility();

  // 파일들 생성
  fs.writeFileSync(ICON_TYPES_FILE, enumContent);
  console.log(`✅ Icon types generated at ${ICON_TYPES_FILE}`);

  // Icon 컴포넌트 생성
  generateIconComponent();
}

// 스크립트 실행
generateIconTypes();
