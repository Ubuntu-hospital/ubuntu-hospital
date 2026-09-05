export type CloudinaryUploadResult = {
  url: string;
  secureUrl: string;
  publicId: string;
  resourceType: string;
  format: string;
  bytes: number;
};

type CloudinaryUploadOptions = {
  folder?: string;
  onProgress?: (progress: number) => void;
};

type CloudinaryUploadResponse = {
  secure_url?: string;
  url?: string;
  public_id?: string;
  resource_type?: string;
  format?: string;
  bytes?: number;
  error?: { message?: string };
};

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

function getCloudinaryConfig() {
  const cloudName = (
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ??
    process.env.NEXT_PUBLIC_CLOUD_NAME
  )?.trim();
  const uploadPreset = (
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ??
    process.env.NEXT_PUBLIC_CLOUD_PRESET
  )?.trim();

  if (!cloudName || !uploadPreset) {
    throw new Error(
      "Cloudinary upload is not configured. Set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET.",
    );
  }

  return { cloudName, uploadPreset };
}

async function uploadToCloudinary(
  file: File,
  options: CloudinaryUploadOptions = {},
): Promise<CloudinaryUploadResult> {
  if (!(file instanceof File)) {
    throw new TypeError("Cloudinary uploads require browser File objects.");
  }

  if (file.size === 0) {
    throw new Error(`The file "${file.name}" is empty.`);
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    throw new Error(`The file "${file.name}" must be 10 MB or smaller.`);
  }

  const { cloudName, uploadPreset } = getCloudinaryConfig();
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  if (options.folder?.trim()) {
    formData.append("folder", options.folder.trim());
  }

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${encodeURIComponent(cloudName)}/auto/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  const result = (await response.json()) as CloudinaryUploadResponse;

  if (!response.ok || !result.secure_url || !result.url || !result.public_id) {
    throw new Error(
      result.error?.message ??
        `Cloudinary upload failed with status ${response.status}.`,
    );
  }

  options.onProgress?.(100);

  return {
    url: result.url,
    secureUrl: result.secure_url,
    publicId: result.public_id,
    resourceType: result.resource_type ?? "auto",
    format: result.format ?? "",
    bytes: result.bytes ?? file.size,
  };
}

export function uploadFile(file: File, options?: CloudinaryUploadOptions) {
  return uploadToCloudinary(file, options);
}

export async function uploadFiles(
  files: File[] | FileList,
  options?: CloudinaryUploadOptions,
) {
  const fileArray = Array.from(files);

  if (fileArray.length === 0) {
    return [];
  }

  let completed = 0;
  const results = await Promise.all(
    fileArray.map((file) =>
      uploadToCloudinary(file, {
        ...options,
        onProgress: undefined,
      }).then((result) => {
        completed += 1;
        options?.onProgress?.(Math.round((completed / fileArray.length) * 100));
        return result;
      }),
    ),
  );

  return results;
}
