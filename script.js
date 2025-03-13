const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Подключение к MongoDB
mongoose.connect('mongodb://localhost:27017/mapMarkers', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Схема для меток
const markerSchema = new mongoose.Schema({
  lat: Number,
  lng: Number,
  description: String,
});

const Marker = mongoose.model('Marker', markerSchema);

// Сохранение метки
app.post('/markers', async (req, res) => {
  const { lat, lng, description } = req.body;
  const marker = new Marker({ lat, lng, description });
  await marker.save();
  res.status(201).send(marker);
});

// Получение всех меток
app.get('/markers', async (req, res) => {
  const markers = await Marker.find();
  res.send(markers);
});

// Удаление метки
app.delete('/markers/:id', async (req, res) => {
  await Marker.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

// Запуск сервера
app.listen(5000, () => {
  console.log('Сервер запущен на http://localhost:5000');
});
