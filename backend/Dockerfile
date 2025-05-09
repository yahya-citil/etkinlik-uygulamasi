# Temel imaj
FROM node:18

# Çalışma dizini oluştur
WORKDIR /app

# Paket dosyalarını kopyala ve yükle
COPY package*.json ./
RUN npm install

# .env dosyası da dahil tüm dosyaları kopyala
COPY . .

# Port aç
EXPOSE 5000

# Sunucuyu başlat
CMD ["node", "index.js"]
