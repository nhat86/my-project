import { createClient, User } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function auth(): Promise<{ user: User } | null> {
  const token = cookies().get("sb-access-token")?.value;
  if (!token) return null;

  const { data, error } = await supabase.auth.getUser(token);
  if (error) return null;

  return { user: data.user! };
}
