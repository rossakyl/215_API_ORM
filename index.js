const express = require('express');
const app = express();
const PORT = 3000;
const db = require('./models');
app.use(express.json());
app.use(express.urlencoded({
     extended: false
}));

app.listen(PORT, () => {
    console.log('server started on port 3000');
});

app.get('/komik', async (req, res) => {
  try {
    const komiks = await db.Komik.findAll();
    res.json(komiks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/komik', async (req, res) => {
  try {
    const newKomik = await db.Komik.create(req.body);
    res.status(201).json(newKomik);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/komik/:id', async (req, res) => {
  try {
    await db.Komik.destroy({
      where: { id: req.params.id }
    });
    res.json({ message: "Komik berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/komik/:id', async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    try {
        const komik = await db.Komik.findByPk(id);
        if (!komik) {
            return res.status(404).json({ message: 'Komik tidak ditemukan' });
        }

        await komik.update(data);
        res.json({ message: 'Komik berhasil diperbarui', komik });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

db.sequelize.sync()
    .then((result) => {
        app.listen(3000 , () => {
            console.log('server started on port 3000');
        })
    })
    .catch((err) => {
        console.log(err);
    });