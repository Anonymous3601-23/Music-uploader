import { createClient } from "@supabase/supabase-js";
import multiparty from "multiparty";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export const config = {
  api: {
    bodyParser: false, // Needed for file uploads
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Only POST allowed");

  const form = new multiparty.Form();

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ ok: false, error: err.message });

    const file = files.file[0];
    const fileName = `music/${Date.now()}-${file.originalFilename}`;

    const fs = await import("fs");
    const buffer = fs.readFileSync(file.path);

    const { error } = await supabase.storage
      .from("uploads")
      .upload(fileName, buffer, { contentType: file.headers["content-type"] });

    if (error) return res.status(500).json({ ok: false, error: error.message });

    const { data: urlData } = await supabase.storage
      .from("uploads")
      .createSignedUrl(fileName, 60 * 60 * 24);

    return res.status(200).json({ ok: true, url: urlData.signedUrl });
  });
}
