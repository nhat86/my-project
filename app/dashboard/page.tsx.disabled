import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

export default async function DashboardPage() {
  // Récupérer les cookies pour Supabase
  const cookieStore = cookies();
  const access_token = cookieStore.get("sb-access-token")?.value;

  // Créer le client Supabase côté serveur
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: access_token
          ? { Authorization: `Bearer ${access_token}` }
          : undefined,
      },
    }
  );

  // Récupérer le user connecté
  const { data: { user }, error } = await supabase.auth.getUser();

  if (!user) {
    // Redirection si pas connecté
    return (
      <div className="p-6 text-red-500">
        Vous devez vous connecter pour accéder au dashboard.
      </div>
    );
  }

  return (
    <AdminLayout>
      <h1 className="text-2xl mb-4">Xin chào {user.user_metadata.name || user.email}</h1>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>ID:</strong> {user.id}</p>
    </AdminLayout>
  );
}
