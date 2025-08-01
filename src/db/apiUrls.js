
import supabase from "./supabase";

export async function getUrls(user_id) {
  const { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("user_id", user_id);

  if (error) throw new Error(error.message);

  return data;
}

export async function deleteUrl(id) {
  const { data, error } = await supabase.from("urls").delete().eq("id", id);

  if (error) throw new Error(error.message);

  return data;
}

export async function createUrl(
  { title, longUrl, customUrl, user_id },
  qrcode
) {
  const short_url = Math.random().toString(36).substring(2, 6);
  const filename = `qr-${short_url}`;

  const { error: storageError } = await supabase.storage
    .from("qrs")
    .upload(filename, qrcode);

  if (storageError) throw new Error(storageError.message);

  const qr = `${
    import.meta.env.VITE_SUPABASE_URL
  }/storage/v1/object/public/qrs/${filename}`;

  const { data, error } = await supabase
    .from("urls")
    .delete()
    .insert([
      {
        title,
        original_url: longUrl,
        short_url: short_url,
        custome_url: customUrl || null,
        user_id,
        qr,
      },
    ])
    .select();

  if (error) throw new Error(error.message);

  return data;
}

export async function getLongUrl(id) {
  const { data, error } = await supabase
    .from("urls")
    .select("id, original_url")
    .or(`short_url.eq.${id}, custome_url.eq.${id}`)
    .single();

  if (error) throw new Error(error.message);

  return data;
}


export async function getUrl(id,user_id) {
  const { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("id", id)
    .eq("user_id",user_id)
    .single();

  if (error) throw new Error(error.message);

  return data;
}

