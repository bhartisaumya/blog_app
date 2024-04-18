import express from "express";
import cors from "cors"
import hbs from "hbs"
import authHandler from "./Routes/authHandler";
import noteHandler from './Routes/noteHandler';
import commentHandler from './Routes/commentHandler'
import "./Helper/connectingMongdb";
import path from "path";

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, './templates/views'));
app.use(express.static(path.join(__dirname, './templates')));


app.use(express.json())
app.use(express.urlencoded({extended : true}));
app.use(cors());


app.use('/home', express.static(path.join(__dirname, 'templates', 'views')));
app.use('/auth', authHandler);
app.use('/notes', noteHandler);
app.use('/comments', commentHandler)


// Error Handling
app.use((err: any, req: any, res: any, next: any) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status,
            message: err.message
        }
    })
})

const PORT = process.env.PORT


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
})



