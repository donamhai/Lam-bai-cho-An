import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import { ethers, utils } from "ethers";
import { abi } from "../../TTVToken-ABI.json";

Blockchain.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(4),
    variant: "contained",
    backgroundColor: theme.palette.secondary.main,
    size: "large",
  },
  text: {
    fontSize: "30px",
    fontWeight: "bold",
  },
}));

function Blockchain(props) {
  const [currentBalance, setCurentBalance] = useState(0);
  const [currentRandomAddress, setSurrentRandomAddress] = useState("");
  const [eventValue, setEventValue] = useState([]);
  const [block, setBlock] = useState([]);
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const myAddress = "0x36276A23fD22FCBe8b9f68Cf10c0f3882A29194c";
  const TtvContract = new ethers.Contract(
    "0x50FE8A546037986C281Aa03451E2eB3B555A7141",
    [
      {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "spender",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        name: "Approval",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        name: "Transfer",
        type: "event",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "address",
            name: "spender",
            type: "address",
          },
        ],
        name: "allowance",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "spender",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "approve",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "balanceOf",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "claim",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "decimals",
        outputs: [
          {
            internalType: "uint8",
            name: "",
            type: "uint8",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "spender",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "subtractedValue",
            type: "uint256",
          },
        ],
        name: "decreaseAllowance",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "spender",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "addedValue",
            type: "uint256",
          },
        ],
        name: "increaseAllowance",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "name",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "symbol",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "totalSupply",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "transfer",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "transferFrom",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    signer
  );

  const filterTo = TtvContract.filters.Transfer(null, myAddress);
  const filterFrom = TtvContract.filters.Transfer(myAddress, null);

  TtvContract.on(filterTo, (from, to, amount) => {
    setEventValue([from, to, ethers.utils.formatEther(amount)]);
  });
  TtvContract.on(filterFrom, (from, to, amount) => {
    setEventValue([from, to, ethers.utils.formatEther(amount)]);
  });

  const classes = useStyles();

  async function connectToWallet() {
    if (!window.ethereum || !window.ethereum.isMetaMask) {
      alert("Please install Metamask wallet");
      return;
    }
    await window.ethereum
      .request({
        method: "wallet_requestPermissions",
        params: [
          {
            eth_accounts: {},
          },
        ],
      })
      .then((permissions) => {
        const accountsPermission = permissions.find(
          (permission) => permission.parentCapability === "eth_accounts"
        );
        if (accountsPermission) {
          console.log("eth_accounts permission successfully requested!");
        }
      })
      .catch((error) => {
        if (error.code === 4001) {
          // EIP-1193 userRejectedRequest error
          console.log("Permissions needed to continue.");
        } else {
          console.error(error);
        }
      });
  }

  async function changeNework() {
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: `0x${Number(137).toString(16)}`,
          chainName: "Polygon Mainnet",
          nativeCurrency: {
            name: "MATIC",
            symbol: "MATIC",
            decimals: 18,
          },
          rpcUrls: ["https://polygon-rpc.com/"],
          blockExplorerUrls: ["https://polygonscan.com/"],
        },
      ],
    });
  }

  async function claimToken() {
    try {
      const amountWei = utils.parseUnits("1", 5);

      const tx = await TtvContract.claim(amountWei);
      console.log(tx);
    } catch (error) {
      console.log(error);
    }
  }

  async function getBalance() {
    try {
      let balance = await TtvContract.balanceOf(
        "0x36276a23fd22fcbe8b9f68cf10c0f3882a29194c"
      );
      balance = ethers.utils.formatEther(balance);
      setCurentBalance(balance);
    } catch (error) {
      console.log(error);
    }
  }

  async function randomWallet() {
    const wallet = ethers.Wallet.createRandom();
    wallet.connect(provider);
    setSurrentRandomAddress(wallet.address);
    if (!wallet) {
      return {
        address: "",
        privateKey: "",
      };
    }

    const signingKey = wallet._signingKey();
    if (!signingKey) {
      return {
        address: "",
        privateKey: "",
      };
    }

    console.log(wallet);
    console.log({ address: wallet.address, privateKey: signingKey.privateKey });

    return {
      address: wallet.address,
      privateKey: signingKey.privateKey,
    };
  }

  async function sendToken() {
    try {
      const amountWei = utils.parseUnits("2000", 18);

      const tx = await TtvContract.transfer(currentRandomAddress, amountWei);
      console.log(tx);
    } catch (error) {
      console.log(error);
    }
  }
  async function filterDataEvent() {
    const result = await TtvContract.queryFilter(
      filterFrom,
      20043244,
      20043344
    );
    console.log(result);
    setBlock(result);
  }

  const [from, to, amount] = eventValue;

  return (
    <Box>
      <Box>
        <Button className={classes.root} onClick={connectToWallet}>
          Connect to wallet
        </Button>
        {/* <Button className={classes.root} onClick={changeNework}>
          Change network
        </Button>
        <Button className={classes.root} onClick={claimToken}>
          Claim 100000 TTV token
        </Button>
        <Button className={classes.root} onClick={getBalance}>
          Get balance
        </Button> */}
        <Button className={classes.root} onClick={randomWallet}>
          Create Random wallet
        </Button>
        <Button className={classes.root} onClick={sendToken}>
          Send 2000 TTV token
        </Button>
        <Button className={classes.root} onClick={filterDataEvent}>
          Filter data event
        </Button>
      </Box>
      <Box>
        {/* <Typography>TTV Token : {currentBalance}</Typography> */}
        <Typography>Random Wallet address : {currentRandomAddress}</Typography>
        <Typography>
          ---------------------------------------------------------
        </Typography>
        <Typography className={classes.text}>Event Transfer</Typography>
        <Box>
          <Typography>From: {from}</Typography>
          <Typography>To: {to}</Typography>
          <Typography>Amount: {amount}</Typography>
        </Box>
        <Typography>
          ---------------------------------------------------------
        </Typography>
        <Typography className={classes.text}>Filter data event</Typography>
        <Box>
          {block.map((x) => (
            <Typography key={x.blockNumber}>
              BlockHash: {x.blockHash} - BlockNumber: {x.blockNumber}
            </Typography>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default Blockchain;
