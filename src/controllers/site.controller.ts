import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { createSiteDTO, updateSiteDTO } from '../types/types';
import { SiteService } from '../services/site.service';
import { SiteRepository } from '../repositories/site.repository';

export class SiteController {
  static async createNewSite(req: Request, res: Response) {
    try {
      const createSiteDTO = req.body as createSiteDTO;
      await SiteService.newSite(createSiteDTO);
      res.status(StatusCodes.OK).send('Successfully created new site');
    } catch (e: any) {
      res.status(StatusCodes.BAD_REQUEST).send(e.message);
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const updateSiteDTO = req.body as updateSiteDTO;
      await SiteService.updateSite(updateSiteDTO);
      res.status(StatusCodes.OK).send('Successfully updated customer');
    } catch (e: any) {
      res.status(StatusCodes.BAD_REQUEST).send(e.message);
    }
  }

  static async getAllByCustomerId(req: Request, res: Response) {
    try {
      const result = await SiteRepository.findAll(+req.body.customerId);
      if (!result) {
        res.sendStatus(StatusCodes.NOT_FOUND);
      }
      res.status(StatusCodes.OK).json(result);
    } catch (e: any) {
      res.status(StatusCodes.BAD_REQUEST).send(e.message);
    }
  }
}
