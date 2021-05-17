import express from 'express';

import { MerchantRepo } from '../../repo/index.js';
import { Currency } from '../../repo/enums.js';
import { MerchantConfiguration } from '../../db/index.js';

const router = express.Router();

router.post('/', async (req, res, next) => {
  const { data } = req.body;
  const prequal_enabled = data.prequal_enabled;
  const minimum_loan_amount = data.minimum_loan_amount
  const maximum_loan_amount = data.maximum_loan_amount
  const currency = Currency.get(data.currency);

  if (currency !== Currency.usd) {
    res.status(400).send({
      field: 'currency',
      message: 'Only USD is supported presently.'
    })
  }

  const merchant_conf = await MerchantRepo.get_merchant_configuration(data.merchant_id);
  if (!merchant_conf) {
    res.status(400).send({
      field: 'merchant_id',
      message: 'Could not find that merchant.',
    });
  }

  await MerchantConfiguration.update({ prequal_enabled, minimum_loan_amount, maximum_loan_amount}, { where: { merchant_id: data.merchant_id }})

  res.status(200).send({
    field: 'prequal_enabled',
    message: 'Pre-qualification configuration has been updated'
  });
});

export default router;
