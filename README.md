import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { ...corsHeaders, 'Content-Type': 'application/json' }
});

const adminClient = () => createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

const appEmail = (username: string) => `${username.trim().toLowerCase()}@users.sandikale.local`;

async function requireAdmin(req: Request) {
  const auth = req.headers.get('Authorization');
  if (!auth?.startsWith('Bearer ')) throw new Error('Sesi login tidak ditemukan.');

  const token = auth.replace('Bearer ', '');
  const client = adminClient();
  const { data: { user }, error } = await client.auth.getUser(token);
  if (error || !user) throw new Error('Sesi login tidak valid.');

  const { data: profile } = await client
    .from('sandikale_users')
    .select('id,name,username,role,status,created_at')
    .eq('id', user.id)
    .single();

  if (!profile || profile.role !== 'Admin' || profile.status !== 'Aktif') {
    throw new Error('Akses ditolak. Hanya Admin yang dapat mengelola user.');
  }
  return { client, user, profile };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const body = await req.json().catch(() => ({}));
    const action = body.action || '';
    const client = adminClient();

    // Dipakai satu kali saja setelah database kosong untuk membuat Admin pertama.
    if (action === 'bootstrap') {
      const { count, error: countError } = await client
        .from('sandikale_users')
        .select('id', { count: 'exact', head: true });
      if (countError) throw countError;
      if ((count ?? 0) > 0) return json({ ok: true, alreadyInitialized: true });

      const { data: created, error: createError } = await client.auth.admin.createUser({
        email: appEmail('admin'),
        password: 'admin123',
        email_confirm: true,
        user_metadata: { name: 'Administrator', username: 'admin', role: 'Admin' }
      });
      if (createError) throw createError;

      const { error: profileError } = await client.from('sandikale_users').insert({
        id: created.user.id,
        name: 'Administrator',
        username: 'admin',
        role: 'Admin',
        status: 'Aktif'
      });
      if (profileError) {
        await client.auth.admin.deleteUser(created.user.id);
        throw profileError;
      }
      return json({ ok: true, initialized: true });
    }

    const { profile } = await requireAdmin(req);

    if (action === 'list') {
      const { data, error } = await client
        .from('sandikale_users')
        .select('id,name,username,role,status,created_at')
        .order('created_at', { ascending: true });
      if (error) throw error;
      return json({ ok: true, users: data || [] });
    }

    if (action === 'create') {
      const name = String(body.name || '').trim();
      const username = String(body.username || '').trim().toLowerCase();
      const password = String(body.password || '');
      const role = String(body.role || 'Kasir');
      const status = String(body.status || 'Aktif');
      if (!name || !username || password.length < 6) throw new Error('Data user tidak lengkap atau password kurang dari 6 karakter.');

      const { data: existing } = await client.from('sandikale_users').select('id').eq('username', username).maybeSingle();
      if (existing) throw new Error('Username sudah digunakan.');

      const { data: created, error: createError } = await client.auth.admin.createUser({
        email: appEmail(username),
        password,
        email_confirm: true,
        user_metadata: { name, username, role }
      });
      if (createError) throw createError;

      const { error: profileError } = await client.from('sandikale_users').insert({
        id: created.user.id, name, username, role, status
      });
      if (profileError) {
        await client.auth.admin.deleteUser(created.user.id);
        throw profileError;
      }
      return json({ ok: true });
    }

    if (action === 'update') {
      const id = String(body.id || '');
      const name = String(body.name || '').trim();
      const username = String(body.username || '').trim().toLowerCase();
      const password = String(body.password || '');
      const role = String(body.role || 'Kasir');
      const status = String(body.status || 'Aktif');
      if (!id || !name || !username) throw new Error('Data user tidak lengkap.');

      const { data: duplicate } = await client.from('sandikale_users')
        .select('id').eq('username', username).neq('id', id).maybeSingle();
      if (duplicate) throw new Error('Username sudah digunakan.');

      const authUpdate: Record<string, unknown> = {
        email: appEmail(username),
        email_confirm: true,
        user_metadata: { name, username, role }
      };
      if (password) {
        if (password.length < 6) throw new Error('Password baru minimal 6 karakter.');
        authUpdate.password = password;
      }
      const { error: authError } = await client.auth.admin.updateUserById(id, authUpdate);
      if (authError) throw authError;

      const { error: profileError } = await client.from('sandikale_users')
        .update({ name, username, role, status })
        .eq('id', id);
      if (profileError) throw profileError;
      return json({ ok: true });
    }

    if (action === 'toggle') {
      const id = String(body.id || '');
      if (!id) throw new Error('ID user tidak ditemukan.');
      const { data: user, error: findError } = await client.from('sandikale_users')
        .select('id,role,status').eq('id', id).single();
      if (findError) throw findError;
      if (user.role === 'Admin' && user.status === 'Aktif') {
        const { count } = await client.from('sandikale_users')
          .select('id', { count: 'exact', head: true }).eq('role', 'Admin').eq('status', 'Aktif');
        if ((count ?? 0) <= 1) throw new Error('Minimal harus ada satu Admin aktif.');
      }
      const nextStatus = user.status === 'Aktif' ? 'Nonaktif' : 'Aktif';
      const { error } = await client.from('sandikale_users').update({ status: nextStatus }).eq('id', id);
      if (error) throw error;
      return json({ ok: true });
    }

    if (action === 'delete') {
      const id = String(body.id || '');
      if (!id) throw new Error('ID user tidak ditemukan.');
      const { data: user, error: findError } = await client.from('sandikale_users')
        .select('id,role,status').eq('id', id).single();
      if (findError) throw findError;
      const { count } = await client.from('sandikale_users').select('id', { count: 'exact', head: true });
      if ((count ?? 0) <= 1) throw new Error('User terakhir tidak dapat dihapus.');
      if (user.role === 'Admin' && user.status === 'Aktif') {
        const { count: adminCount } = await client.from('sandikale_users')
          .select('id', { count: 'exact', head: true }).eq('role', 'Admin').eq('status', 'Aktif');
        if ((adminCount ?? 0) <= 1) throw new Error('Minimal harus ada satu Admin aktif.');
      }
      const { error: deleteError } = await client.auth.admin.deleteUser(id);
      if (deleteError) throw deleteError;
      return json({ ok: true });
    }

    return json({ ok: false, error: `Aksi tidak dikenal: ${action}` }, 400);
  } catch (error) {
    console.error(error);
    return json({ ok: false, error: error instanceof Error ? error.message : 'Terjadi kesalahan server.' }, 400);
  }
});
