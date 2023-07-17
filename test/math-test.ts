import chai, { expect } from "chai";
import { solidity } from "ethereum-waffle";
import { BigNumber } from "ethers";
import { ethers } from "hardhat";
import _ from "lodash";
import chaiAsPromised from "chai-as-promised";
import normData from "./normData.json";
import TestMath from "../typechain/TestMath";
import * as tus from "../testUtils";

chai.use(solidity);
chai.use(chaiAsPromised);

const pres = tus.BF(1).div(tus.TWO_F_64).toNumber();
const TWO_F_63 = tus.BF("0x8000000000000000");

const getRandom = (): BigNumber => {
  const a = tus.BigFloat.random().mul(88.722839111673).sub(44.3614195558365);
  return tus.toDec(tus.toInt(a.exp()));
};

const getSignedRandom = (): BigNumber => {
  const a = tus.BigFloat.random().mul(88.029691931113).sub(44.3614195558365);
  return tus.toDec(tus.toInt(a.exp().mul(Math.random() < 0.5 ? -1 : 1)));
};

describe("test math", () => {
  let math: TestMath;
  before(async () => {
    const TestMathFactory = await ethers.getContractFactory("Test64x64");
    math = await TestMathFactory.deploy();
  });

  it("mul", async () => {
    let passedCount = 0;
    let allGas = 0;
    for (let i = 0; i < 100; i++) {
      const a = getRandom();
      const b = getRandom();
      if (a.mul(b).gt(tus.TWO_F_64)) {
        await expect(math.testMul(tus.toInt(a), tus.toInt(b))).to.be.rejected;
      } else {
        const [r, gas] = await math.testMul(tus.toInt(a), tus.toInt(b));
        expect(tus.toDec(r).sub(a.mul(b)).abs().toNumber()).be.lessThanOrEqual(
          pres,
        );
        passedCount++;
        allGas += +gas;
      }
    }
    console.log(passedCount, allGas / passedCount);
  });

  it("div", async () => {
    let passedCount = 0;
    let allGas = 0;
    for (let i = 0; i < 100; i++) {
      const a = getRandom();
      const b = getRandom();
      if (a.div(b).gt(tus.TWO_F_64)) {
        await expect(math.testDiv(tus.toInt(a), tus.toInt(b))).to.be.rejected;
      } else {
        const [r, gas] = await math.testDiv(tus.toInt(a), tus.toInt(b));
        expect(tus.toDec(r).sub(a.div(b)).abs().toNumber()).be.lessThanOrEqual(
          pres,
        );
        passedCount++;
        allGas += +gas;
      }
    }
    console.log(passedCount, allGas / passedCount);
  });

  it("msb", async () => {
    let passedCount = 0;
    let allGas = 0;
    for (let i = 0; i < 100; i++) {
      const a = getRandom();

      const [r, gas] = await math.testMsb(tus.toInt(a));
      expect(r.toString()).be.eql(
        tus.BigFloat.log2(a).add(64).floor().toFixed(0),
      );
      passedCount++;
      allGas += +gas;
    }
    console.log(passedCount, allGas / passedCount);
  });

  it("signed Mul", async () => {
    let passedCount = 0;
    let allGas = 0;
    for (let i = 0; i < 100; i++) {
      const a = getSignedRandom();
      const b = getSignedRandom();
      if (a.mul(b).abs().gt(TWO_F_63)) {
        await expect(math.testSignedMul(tus.toInt(a), tus.toInt(b))).to.be
          .rejected;
      } else {
        const [r, gas] = await math.testSignedMul(tus.toInt(a), tus.toInt(b));
        expect(tus.toDec(r).sub(a.mul(b)).abs().toNumber()).be.lessThanOrEqual(
          pres,
        );
        passedCount++;
        allGas += +gas;
      }
    }
    console.log(passedCount, allGas / passedCount);
  });

  it("signed Div", async () => {
    let passedCount = 0;
    let allGas = 0;
    for (let i = 0; i < 100; i++) {
      const a = getSignedRandom();
      const b = getSignedRandom();
      if (a.div(b).abs().gt(TWO_F_63)) {
        await expect(math.testSignedDiv(tus.toInt(a), tus.toInt(b))).to.be
          .rejected;
      } else {
        const [r, gas] = await math.testSignedDiv(tus.toInt(a), tus.toInt(b));
        expect(tus.toDec(r).sub(a.div(b)).abs().toNumber()).be.lessThanOrEqual(
          pres,
        );
        passedCount++;
        allGas += +gas;
      }
    }
    console.log(passedCount, allGas / passedCount);
  });
  it("signed msb", async () => {
    let passedCount = 0;
    let allGas = 0;
    for (let i = 0; i < 100; i++) {
      const a = getSignedRandom();
      if (a.lt(0)) {
        await expect(math.testSignedMsb(tus.toInt(a))).to.be.rejected;
      } else {
        const [r, gas] = await math.testSignedMsb(tus.toInt(a));
        expect(r.toString()).be.eql(
          tus.BigFloat.log2(a).add(64).floor().toFixed(0),
        );
        passedCount++;
        allGas += +gas;
      }
    }
    console.log(passedCount, allGas / passedCount);
  });

  it("ln", async () => {
    let passedCount = 0;
    let allGas = 0;
    await expect(math.testLn(0)).to.be.rejected;
    for (let i = 0; i < 100; i++) {
      const a = getRandom();

      const [r, gas] = await math.testLn(tus.toInt(a));
      expect(
        tus.toDec(r).sub(tus.BigFloat.ln(a)).abs().toNumber(),
      ).be.lessThanOrEqual(pres);
      passedCount++;
      allGas += +gas;
    }
    console.log(passedCount, allGas / passedCount);
  });

  it("sqrt", async () => {
    let passedCount = 0;
    let allGas = 0;
    for (let i = 0; i < 100; i++) {
      const a = getRandom();

      const [r, gas] = await math.testSqrt(tus.toInt(a));
      expect(
        tus.toDec(r).sub(tus.BigFloat.sqrt(a)).abs().toNumber(),
      ).be.lessThanOrEqual(pres);
      passedCount++;
      allGas += +gas;
    }
    console.log(passedCount, allGas / passedCount);
  });

  it("exp", async () => {
    let passedCount = 0;
    let allGas = 0;
    const errs = [];
    await expect(math.testExp(tus.toInt(44))).to.be.rejected;
    {
      const [r, gas] = await math.testExp(0);
      expect(r.sub(tus.TWO_I_64).toString()).to.eql("0");
    }
    for (let i = 0; i < 100; i++) {
      const a_ = tus.BigFloat.random().mul(43.66);
      const a = tus.toDec(tus.toInt(a_));

      const [r, gas] = await math.testExp(tus.toInt(a));
      const err = tus.toDec(r).div(tus.BigFloat.exp(a)).sub(1).abs().toNumber();
      expect(err).be.lessThanOrEqual(1e-17);
      errs.push(err);
      passedCount++;
      allGas += +gas;
    }
    console.log(passedCount, allGas / passedCount, Math.max(...errs));
  });

  it("cauchyCdf", async () => {
    let passedCount = 0;
    let allGas = 0;
    const pi = tus.BigFloat.acos(-1);
    const errs = [];
    for (let i = 0; i < 100; i++) {
      const a = getSignedRandom();
      const [r, gas] = await math.testCauchyCdf(tus.toInt(a));
      const err = tus
        .toDec(r)
        .sub(tus.BF(a).atan().div(pi).add(0.5))
        .abs()
        .toNumber();
      expect(err).be.lessThanOrEqual(1e-11);
      errs.push(err);
      passedCount++;
      allGas += +gas;
    }
    console.log(passedCount, allGas / passedCount, Math.max(...errs));
  });

  it("normCdf", async () => {
    let passedCount = 0;
    let allGas = 0;
    const errs = [];
    for (const i in normData) {
      const a = normData[i][0];
      const [r, gas] = await math.testNormCdf(tus.toInt(a));
      const err = tus.toDec(r).sub(normData[i][1]).abs().toNumber();
      expect(err).be.lessThanOrEqual(3e-7);
      errs.push(err);
      passedCount++;
      allGas += +gas;
    }
    console.log(passedCount, allGas / passedCount, Math.max(...errs));
  });
});
