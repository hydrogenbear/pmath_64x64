# PoptionFixedPointLib - 64x64 Fixed Point Numerical Operations for Smart Contracts

PoptionFixedPointLib is an open-source library aimed at bringing high-precision numerical operations to smart contracts. This library is a part of an options smart contract project, providing essential numerical functions in a 64x64 fixed-point representation for superior precision and performance.

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

Sure, here's the information converted into a table:

| Function    | Precision / Error    | Average Gas Cost (over 1000 runs unless specified) |
| ----------- | -------------------- | -------------------------------------------------- |
| `ln`        | Full 64x64 precision | 1259                                               |
| `sqrt`      | Full 64x64 precision | 629                                                |
| `exp`       | 5e-18 relative error | 1793                                               |
| `normcdf`   | 2e-7 absolute error  | 444.7                                              |
| `cauchycdf` | 2e-12 relative error | 587.4                                              |

## Usage

Import the FixedPointLib library into your smart contract and instantiate it as needed. Each function takes as input 64x64 fixed point numbers and returns a 64x64 fixed point number.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts

```

## Contribution

As an open-source project, we welcome contributions from everyone. If you're interested in contributing, please feel free to open issues or make pull requests.

## License

This project is licensed under MIT LICENSE. See the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or run into any issues, please feel free to open an issue on this repository.

Happy coding!
