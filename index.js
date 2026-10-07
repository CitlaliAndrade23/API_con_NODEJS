import express from "express";
import fs from "fs"; // permite trabajar con file system
import  bodyParser from "body-parser";


const app = express();
app.use(bodyParser.json());

const readData = () => {
    try {
        const data = fs.readFileSync("./db.json");
        return JSON.parse(data);
    } catch (error) {
        console.log(error);
    }
};

const writeData = (data) => {
    try {
        fs.writeFileSync("./db.json", JSON.stringify(data));
    } catch (error) {
        console.log(error);
    }
};


// RUTA PRINCIPAL
app.get("/", (req, res) => {
    res.send("Bienvenido a mi primer api con Node JS !!");
});


// MOSTRAR TODA LA MÚSICA
app.get("/Musica", (req, res) => {
    const data = readData();
    res.json(data.Musica);
});

app.get("/Musica/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const Musica = data.Musica.find((Musica) => Musica,id === id);
    res.json(Musica);
});

app.post("/Musica", (req, res) => {
    const data = readData();
    const body = req.body;
    const newMusica = {
        id: data.Musica.length + 1,
        ...body,
    };
    data.Musica.push(newMusica);
    writeData(data);
    res.json(newMusica);
});

app.put("/Musica/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);

    const MusicaIndex = data.Musica.findIndex(
        (Musica) => Musica.id === id
    );

    data.Musica[MusicaIndex] = {
        ...data.Musica[MusicaIndex],
        ...body,
    };

    writeData(data);

    res.json({
        message: "Music updated successfully"
    });
});

app.delete("/Musica/:id", (req, res) => {
   const data = readData();
    const id = parseInt(req.params.id);
      const MusicaIndex = data.Musica.findIndex(
        (Musica) => Musica.id === id);
        data.Musica.splice(MusicaIndex, 1);
        writeData(data);
        res.json({messege: "Musica ha sido borrada con exito"})

});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor escuchando por el puerto ${PORT}`);
});


// Una función callback => (o función de devolución de llamada) es una función que se
// pasa como argumento a otra función, con la idea de que se ejecute ("se llame
// de vuelta") más tarde, cuando termine una tarea o suceda un evento.