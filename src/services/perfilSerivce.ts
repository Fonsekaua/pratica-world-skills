import api from "./api";

export const perfil = async () => {
  const response = await api.get('/api/auth/eu');
  return response.data

};


export const uploadImage = async (formData: FormData) => {
  const response = await api.post("/api/auth/upload-imagem", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
  }
)

  return response.data
};