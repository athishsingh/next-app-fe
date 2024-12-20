export const noop = () => {};

export const generateFilePreviews = (files: File[]) => {
  const previews = files
    .map((file) => {
      const fileType = file.type;
      let preview;

      if (fileType.startsWith("image/")) {
        preview = {
          type: "image",
          url: URL.createObjectURL(file),
          fileName: file.name,
          fileSize: formatFileSize(file.size),
        };
      } else if (
        fileType === "application/zip" ||
        fileType === "application/x-zip-compressed"
      ) {
        preview = {
          type: "zip",
          url: "/icons/zip-icon.svg",
          fileName: file.name,
          fileSize: formatFileSize(file.size),
        };
      } else if (fileType.startsWith("video/")) {
        preview = {
          type: "video",
          url: URL.createObjectURL(file),
          fileName: file.name,
          fileSize: formatFileSize(file.size),
        };
      } else if (fileType === "application/pdf") {
        preview = {
          type: "pdf",
          url: URL.createObjectURL(file), // Direct PDF preview
          fileName: file.name,
          fileSize: formatFileSize(file.size),
        };
      } else {
        return null;
      }
      return preview;
    })
    .filter(Boolean) as {
    type: string;
    url: string;
    fileName: string;
    fileSize: string;
  }[];

  return previews;
};

const formatFileSize = (bytes: number): string => {
  const units = ["Bytes", "KB", "MB", "GB", "TB"];
  let index = 0;
  while (bytes >= 1024 && index < units.length - 1) {
    bytes /= 1024;
    index++;
  }
  return `${bytes.toFixed(2)} ${units[index]}`;
};

export const getCapitalized = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== "object") return obj;

  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item)) as unknown as T;
  }

  const clone: { [key: string]: any } = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clone[key] = deepClone(obj[key]);
    }
  }
  return clone as T;
};
