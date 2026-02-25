import express, { Request, Response } from 'express';
import productService from '../services/product.service';
import { ReadAllProductsByFilterDto } from '../types/dto/read-all-products-by-filter.dto';

const router = express.Router();

router.get('/keepalive', async function KeepAlive(req, res) {
    const response = { isSuccess: true, message: 'kept alive' };
    res.json(response);
});

router.get('/read-all', async function readAll(req: Request, res: Response) {
    const response = await productService.readAll();
    res.send(response);
});

router.post('/read-all/filter', async function readAllByFilter(req: Request, res: Response) {
    const dto = req.body as ReadAllProductsByFilterDto;
    const response = await productService.readAllByFilter(dto);
    res.send(response);
});

export default router;
