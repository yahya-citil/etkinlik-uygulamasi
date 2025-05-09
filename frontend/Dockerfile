# Temel Node imajı
FROM node:18

# Çalışma dizinine geç
WORKDIR /app

# Paket bilgilerini kopyala ve yükle
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Uygulama dosyalarını kopyala
COPY . .

# Port aç (React 3000'de çalışır)
EXPOSE 3000

# Başlat
CMD ["npm", "start"]
