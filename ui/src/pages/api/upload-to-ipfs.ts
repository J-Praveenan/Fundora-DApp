
import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const chunks: Uint8Array[] = [];

    for await (const chunk of req) {
      chunks.push(chunk);
    }

    const buffer = Buffer.concat(chunks);

    const contentType = req.headers["content-type"];

    if (!contentType) {
      return res.status(400).json({ error: "Missing content type" });
    }

    const response = await fetch(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.PINATA_JWT}`,
          "Content-Type": contentType,
        },
        body: buffer,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    const ipfsHash = data.IpfsHash;
    const imageUrl = `${process.env.NEXT_PUBLIC_IPFS_GATEWAY}/${ipfsHash}`;

    return res.status(200).json({
      ipfsHash,
      imageUrl,
    });
  } catch (error) {
    console.error("IPFS upload error:", error);
    return res.status(500).json({ error: "Failed to upload image" });
  }
}