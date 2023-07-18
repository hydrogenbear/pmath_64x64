# pmath_64x64 Fixed Point Numerical lib for Smart Contracts

- pmath_64x64 is an open-source library aimed at bringing very gas efficient and high-precision numerical operations to smart contracts. This library is a part of an options smart contract project, providing essential numerical functions in a 64x64 fixed-point representation for superior precision and performance.

## Features

The library supports various mathematical operations and functions including:

- Multiplication (`mul`)
- Division (`div`)
- Combined multiplication and division (`muldiv`)
- Natural logarithm (`ln`)
- Sqrt root(`sqrt`)
- Exponential function (`exp`)
- Normal cumulative distribution function (`normcdf`)
- Cauchy cumulative distribution function (`cauchycdf`)

| Function    | Precision / Error    | Average Gas Cost (over 1000 runs unless specified) | comments                                                           |
| ----------- | -------------------- | -------------------------------------------------- | ------------------------------------------------------------------ |
| `ln`        | Full 64x64 precision | 1259                                               | The gas cost is 5 time smaller than the ABDKMath64x64 one (7126)   |
| `sqrt`      | Full 64x64 precision | 629                                                | The gas cost is a little smaller than the ABDKMath64x64 one (699)  |
| `exp`       | 5e-18 relative error | 1793                                               | The gas cost is 1.5 time smaller than the ABDKMath64x64 one (2746) |
| `normcdf`   | 2e-7 absolute error  | 444.7                                              |                                                                    |
| `cauchycdf` | 2e-12 relative error | 587.4                                              |                                                                    |

https://github.com/PaulRBerg/prb-math

## Usage

Install:

```shell
npm install pmath_64x64

```

Import the pmath_64x64 library into your smart contract and instantiate it as needed. Each function takes as input 64x64 fixed point numbers and returns a 64x64 fixed point number.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
```

## Contribute

The contract has not yet been audited. If you're interested in contributing towards the auditing process, donations are welcomed. Please send Ether (ETH) to this address: `0xb39D1b18C3B881a301bd9D6E06393b42052BD112`.

After making a donation, please open a new issue in our GitHub repository with the transaction details so we can acknowledge your contribution. Your support is greatly appreciated!

## License

This project is licensed under MIT LICENSE. See the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or run into any issues, please feel free to open an issue on this repository.
