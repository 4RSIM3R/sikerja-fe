import { z } from 'zod';

// Validate that a file is uploaded
export const file_required = () => {
  return (file: FileList, ctx: z.RefinementCtx) => {
    if (!file || file.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'File is required',
      });
    }
  };
};

// Validate the file size
export const file_size = (sizeInMB: number) => {
  return (file: FileList, ctx: z.RefinementCtx) => {
    if (file[0]?.size > sizeInMB * 1024 * 1024) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `File size should be less than ${sizeInMB}MB`,
      });
    }
  };
};

// Validate the file type (e.g., image/*)
export const file_type = (mimeType: string) => {
  return (file: FileList, ctx: z.RefinementCtx) => {
    // Ensure the file list is not empty and file[0] exists
    if (!file || file.length === 0 || !file[0]?.type) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'File is required',
      });
      return;
    }

    // Check if file type starts with the expected MIME type
    if (!file[0].type.startsWith(mimeType)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Only ${mimeType} files are allowed`,
      });
    }
  };
};
