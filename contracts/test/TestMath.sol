// SPDX-License-Identifier: BUSL-1.1
/*
 * Math 64x64 Smart Contract Library.
 * Copyright ©2022 by Poption.org.
 * Author: Hydrogenbear <hydrogenbear@poption.org>
 */

pragma solidity ^0.8.4;
import "./../Math.sol";

contract Test64x64 {
    using Math64x64 for uint128;
    using Math64x64 for int128;

    function testMul(uint128 x, uint128 y)
        public
        view
        returns (uint128, uint256)
    {
        uint128 r;
        uint256 startGas = gasleft();
        r = x.mul(y);
        return (r, startGas - gasleft());
    }

    function testSignedMul(int128 x, int128 y)
        public
        view
        returns (int128, uint256)
    {
        int128 r;
        uint256 startGas = gasleft();
        r = x.mul(y);
        return (r, startGas - gasleft());
    }

    function testDiv(uint128 x, uint128 y)
        public
        view
        returns (uint128, uint256)
    {
        uint128 r;
        uint256 startGas = gasleft();
        r = x.div(y);
        return (r, startGas - gasleft());
    }

    function testSignedDiv(int128 x, int128 y)
        public
        view
        returns (int128, uint256)
    {
        int128 r;
        uint256 startGas = gasleft();
        r = x.div(y);
        return (r, startGas - gasleft());
    }

    function testMsb(uint128 x) public view returns (int128, uint256) {
        int128 r;
        uint256 startGas = gasleft();
        r = x.msb();
        return (r, startGas - gasleft());
    }

    function testSignedMsb(int128 x) public view returns (int128, uint256) {
        int128 r;
        uint256 startGas = gasleft();
        r = x.msb();
        return (r, startGas - gasleft());
    }

    function testLn(uint128 x) public view returns (int128, uint256) {
        int128 r = 0;
        uint256 startGas = gasleft();
        r = x.ln();
        return (r, startGas - gasleft());
    }

    function testSqrt(uint128 x) public view returns (uint128 r, uint256) {
        uint256 startGas = gasleft();
        r = x.sqrt();
        return (r, startGas - gasleft());
    }

    function testCauchyCdf(int128 x)
        public
        view
        returns (uint128 r, uint256 gas)
    {
        gas = gasleft();
        r = x.cauchyCdf();
        gas = gas - gasleft();
    }

    function testNormCdf(int128 x)
        public
        view
        returns (uint128 r, uint256 gas)
    {
        gas = gasleft();
        r = x.normCdf();
        gas = gas - gasleft();
    }

    function testExp(uint128 x) public view returns (uint128 r, uint256 gas) {
        gas = gasleft();
        r = x.exp();
        gas = gas - gasleft();
    }
}
