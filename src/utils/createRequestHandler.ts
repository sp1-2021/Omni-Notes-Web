import nc from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';

export const createRequestHandler = () => nc<NextApiRequest, NextApiResponse>();
