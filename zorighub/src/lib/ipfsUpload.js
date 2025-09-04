import axios from 'axios';
const API_BASE = import.meta.env.VITE_BACKEND_API || 'http://localhost:5173';

export async function uploadImageToIPFS(file, meta = {}) {
    if (!file) throw new Error('No file provided');
    const form = new FormData();
    form.append('file', file);
    Object.entries(meta).forEach(([k, v]) => v != null && form.append(k, v));

    const { data } = await axios.post(`${API_BASE}/api/uploads/ipfs`, form, { withCredentials: true });
    if (!data?.ok) throw new Error(data?.error || 'Upload failed');
    return { url: data.gatewayUrl, ipfsHash: data.ipfsHash };
}

export async function uploadImagesToIPFS(files, meta = {}) {
    if (!files?.length) throw new Error('No files provided');
    const limited = Array.from(files).slice(0, 4); // enforce <= 4

    const form = new FormData();
    limited.forEach((f) => form.append('files', f)); // multiple 'files'
    Object.entries(meta).forEach(([k, v]) => v != null && form.append(k, v));

    const { data } = await axios.post(`${API_BASE}/api/uploads/ipfs/batch`, form, { withCredentials: true });
    if (!data?.ok) throw new Error(data?.error || 'Batch upload failed');

    // return arrays
    return {
        urls: data.items.map((x) => x.gatewayUrl),
        ipfs: data.items.map((x) => x.ipfsHash),
        items: data.items,
    };
}
