import supabase from "./supabase";
import { UAParser } from "ua-parser-js";
export async function getClicks(urlIds) {
  const { data, error } = await supabase
    .from("clicks")
    .select("*")
    .in("url_id", urlIds);

  if (error) throw new Error(error.message);

  return data;
}

const parser = UAParser();

export const storeClicks = async ({ id, original_url }) => {
  try {
    const res = parser.getResult();
    const device = res.type || "desktop";
    const response = await fetch ("https://ipapi.co/json");
    const {city,country_name:country} = await response.json();

    await supabase.from("clicks").insert({
      url_id: id,
      device: device,
      city: city,
      country: country,
    });
    window.location.href = original_url;
  } catch (error) {
    console.log(error);
  }
};


export async function getClicksForUrl(url_id) {
  const { data, error } = await supabase
    .from("clicks")
    .select("*")
    .eq("url_id", url_id)

  if (error) throw new Error(error.message);

  return data;
}


