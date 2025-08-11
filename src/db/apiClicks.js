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

export const storeClicks = async ({ id, original_url }) => {
  try {
    const parser = new UAParser();
    const res = parser.getResult();
    const device = res.device.type || "desktop";

    let city = "Unknown";
    let country = "Unknown";

    try {
      const response = await fetch("https://ipapi.co/json/");
      if (response.ok) {
        const ipData = await response.json();
        city = ipData.city || "Unknown";
        country = ipData.country_name || "Unknown";
      }
    } catch (geoErr) {
      console.warn("Geo lookup failed:", geoErr);
    }

    const { error } = await supabase.from("clicks").insert({
      url_id: id,
      device,
      city,
      country,
    });

    if (error) {
      console.error("Supabase insert error:", error);
    }

    // Redirect after storing click
    window.location.href = original_url;

  } catch (error) {
    console.error("Click store failed:", error);
    // Still redirect even if tracking fails
    window.location.href = original_url;
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


