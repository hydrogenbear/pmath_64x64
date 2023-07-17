// SPDX-License-Identifier: BUSL-1.1
/*
 * Copyright ©2022 by Poption.
 * Author: Hydrogenbear <hydrogenbear@poption.org>
 */

const Decimal = require("decimal.js");
const _ = require("lodash");

const { BigNumber } = require("ethers");

const BigFloat = Decimal.clone({
  precision: 150,
  toExpNeg: -150,
  toExpPos: 150,
});

const BF = (x) => new BigFloat(x);
const TWO_F_128 = new BigFloat("340282366920938463463374607431768211456");
const TWO_F_64 = new BigFloat("18446744073709551616");
const TWO_I_128 = BigNumber.from("340282366920938463463374607431768211456");
const TWO_I_64 = BigNumber.from("18446744073709551616");

const toDec = (x) => BF(x.toString()).div(TWO_F_64);
const toInt = (x) => BF(x).mul(TWO_F_64).toFixed(0);

const readGas = async (trx) => {
  const receipt = await trx.wait();
  console.log(`gas: ${receipt.gasUsed}`);
};

const estGas = async (trx) => {
  const gas = await trx;
  console.log(`gas: ${gas}`);
};

module.exports = {
  BigFloat,
  BF,
  TWO_I_64,
  TWO_I_128,
  TWO_F_64,
  TWO_F_128,
  toDec,
  toInt,
  readGas,
  estGas,
};
