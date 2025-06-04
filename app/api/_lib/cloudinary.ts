import { UploadApiResponse, v2 } from "cloudinary";

export const cloudinary = v2;

export function joinFolder(...folders: string[]) {
  return ["reclaim-me", ...folders].join("/");
}

/** @throws */
export async function uploadPDF({
  name,
  email,
  file,
}: {
  name: string;
  email: string;
  file: Buffer;
}) {
  // Upload a pdf
  // const upload = await cloudinary.uploader.upload(name, {

  const upload = await new Promise<UploadApiResponse>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          overwrite: true,
          use_filename: true,
          folder: joinFolder(`${email}-${name}.pdf`),
          type: "upload",
          async: true,
          format: "pdf",
          resource_type: "raw",
        },
        (error, uploadResult) => {
          if (uploadResult) {
            resolve(uploadResult);
          }
          if (error) {
            reject(error);
          }
        }
      )
      .end(file);
  });

  return {
    url: upload.secure_url,
  };
}
