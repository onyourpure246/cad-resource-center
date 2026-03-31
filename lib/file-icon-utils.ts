export const getFileIconAndColor = (filename: string): { mui_icon: string | undefined; mui_colour: string | undefined } => {
    if (!filename) {
        return { mui_icon: 'InsertDriveFile', mui_colour: undefined };
    }

    const fileNameLower = filename.toLowerCase();

    if (fileNameLower.endsWith('.pdf')) {
        return { mui_icon: 'PictureAsPdf', mui_colour: '#ef4444' }; // text-red-500
    } else if (fileNameLower.endsWith('.zip') || fileNameLower.endsWith('.7z')) {
        return { mui_icon: 'FolderZip', mui_colour: '#eab308' }; // text-yellow-500
    } else if (fileNameLower.endsWith('.rar')) {
        return { mui_icon: 'Archive', mui_colour: '#8b5cf6' }; // text-purple-500
    } else if (fileNameLower.endsWith('.doc') || fileNameLower.endsWith('.docx')) {
        return { mui_icon: 'Description', mui_colour: '#2563eb' }; // text-blue-600
    } else if (fileNameLower.endsWith('.exe')) {
        return { mui_icon: 'Extension', mui_colour: '#475569' }; // text-slate-600
    }

    // Default fallback
    return { mui_icon: 'InsertDriveFile', mui_colour: undefined };
};
