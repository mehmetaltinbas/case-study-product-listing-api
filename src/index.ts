import express from 'express';
import dotenv from 'dotenv';
import fs from 'fs';
import cors from 'cors';
// import './keepalive.js';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(
    cors({
        origin: `${process.env.UI_URL}`,
        credentials: true,
    })
);
app.use(express.json());

async function loadControllers() {
    const controllers = fs.readdirSync('./src/controllers');
    console.log('\n\tLoading Controllers');
    for (const controller of controllers) {
        const route = controller.replace('.controller.ts', '').toLocaleLowerCase();
        await import(`./controllers/${controller.replace('.ts', '.js')}`)
            .then((controller) => {
                app.use(`/${route}`, controller.default);
                console.log(`loaded controller: ${route}`);
            })
            .catch((err) =>
                console.error(`\n\tError loading the controller ${controller}\n`, err)
            );
    }
    console.log('');
}

void (async (): Promise<void> => {
    await loadControllers();
    app.listen(port, () => {
        console.log(`App listening on port: ${port}`);
    });
})();
