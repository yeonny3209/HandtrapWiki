import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
  content: ["./src/**/*.{ts,tsx,js,jsx}"],
  theme: { extend: {} },
  plugins: [typography],      // ✅ 추가
} satisfies Config;