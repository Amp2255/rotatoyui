import axios from 'axios';

export async function analyzeImage(file) {
  const formData = new FormData();
  formData.append('image', file);

  const res = await axios.post('/item/image-suggestions', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  // Response shape: { success, message, data: { name: [...], notes: [...], ... } }
  const data = res.data?.data ?? {};
  return {
    name: Array.isArray(data.name) ? data.name[0] ?? '' : data.name ?? '',
    notes: Array.isArray(data.notes) ? data.notes[0] ?? '' : data.notes ?? '',
    category: Array.isArray(data.category) ? data.category[0] ?? '' : data.category ?? '',
  };
}
