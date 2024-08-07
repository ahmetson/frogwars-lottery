import { TransactionButton, useActiveAccount } from "thirdweb/react";
import { linea } from "thirdweb/chains";
import { getContract } from "thirdweb";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { contractAddresses } from "../constants";
import { client } from "./EnterLottery";
import {claimTo} from "thirdweb/extensions/erc1155";

export default function MintContainer({setOwnedNfts}) {
  const account = useActiveAccount();
  const chain = linea;
  const comicBookAddress = contractAddresses[chain.id][2];

  const editionDrop = getContract({
    client, address: comicBookAddress, chain
  });

  return (
    <div >
      <h1 className="text-2xl font-extrabold text-center text-gray-200">Frog Wars - BURN BABY, BURN!</h1>
      <p className="my-4 text-lg text-center text-gray-200">MINT Frog Wars - Edition II NFT to enter lottery!</p>

      <div className={`${styles.nftBox} ${styles.spacerBottom}  ${styles.collectionContainer}`}>
        <Image src="/images/book.png" width={"240"} height={"400"} alt="mine" />
      </div>

      <div className={styles.smallMargin + ' ' + styles.collectionContainer}>
      <TransactionButton
        theme="dark"
        transaction={() => {
          // Create a transaction object and return it
          const tx = claimTo({
            contract: editionDrop,
            to: account.address,
            tokenId: 0n,
            quantity: 1n,
          });
          return tx;
        }}
        onTransactionSent={(result) => {
          console.log("Transaction submitted", result.transactionHash);
        }}
        onTransactionConfirmed={(receipt) => {
          console.log("Transaction confirmed", receipt.transactionHash);
          setOwnedNfts([1])
        }}
      onError={(error) => {
        console.error("Transaction error", error);
      }}
    >
          MINT 
        </TransactionButton>
      </div>
    </div>
  );
}
