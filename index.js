import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import path from "path";
import postRoutes from "./routes/post-routes.js";

const app = express();
const port = 3000;
const domain = "172.28.0.226";
const dataBase_url = "mongodb+srv://rudiviktor94:Cfy6SBizyU0fuQxP@cluster0.p8ojmyo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.set("strictQuery", false);

app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "views"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(express.json());
app.use(postRoutes);

app.use((req, res, next) => {
    console.log(`Incoming ${req.method} request to ${req.url}`);
    next();
});



mongoose.connect(dataBase_url)
    .then(() => {
        console.log("Database connected");
    })
    .catch((err) => {
        console.error("Database connection error:", err);
    });



////////////////////////////////////////////////////////////////

// Обработка ошибок базы данных
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Обработка несуществующих маршрутов
app.use((req, res) => {
    res.status(404).send("Sorry can't find that!");
});

// Запуск сервера
app.listen(port, domain, () => {
    console.log(`Server is running on http://${domain}:${port}`);
});