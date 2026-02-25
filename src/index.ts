import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
// import './keepalive.js';
import path from 'path';

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
    const controllersDir = path.join(__dirname, 'controllers');
    const controllers = fs.readdirSync(controllersDir);

    console.log('\n\tLoading Controllers');
    for (const file of controllers) {
        if (!file.match(/\.controller\.(js|ts)$/)) {
            continue;
        };

        const route = file.replace(/\.controller\.(ts|js)$/, '').toLocaleLowerCase();

        await import(`./controllers/${file.replace('.ts', '.js')}`)
            .then((controller) => {
                app.use(`/${route}`, controller.default);
                console.log(`loaded controller: ${route}`);
            })
            .catch((err) =>
                console.error(`\n\tError loading the controller ${file}\n`, err)
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
