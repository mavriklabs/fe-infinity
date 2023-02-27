import { FlowCmDistributorABI } from '@infinityxyz/lib-frontend/abi';
import { ChainId, DistributionType } from '@infinityxyz/lib-frontend/types/core';
import { getCmDistributorAddress, getFlurTokenAddress, getTokenAddress } from '@infinityxyz/lib-frontend/utils';
import { ENV } from 'src/utils';
import { useNetwork } from 'wagmi';
import { useContract } from '../useContract';

export interface ClaimProps {
  type: DistributionType;
  account: string;
  cumulativeAmount: string;
  merkleRoot: string;
  merkleProof: string[];
  contractAddress: string;
}

export const useClaim = () => {
  const { chain } = useNetwork();
  const chainId = String(chain?.id ?? 1) as ChainId;

  const contractAddress = getCmDistributorAddress(chainId, ENV);
  const contract = useContract(contractAddress, FlowCmDistributorABI);
  const claim = async (data: ClaimProps) => {
    if (data.contractAddress !== contract.address) {
      throw new Error('Contract address does not match');
    }
    const { type, account, cumulativeAmount, merkleRoot, merkleProof } = data;
    let txn: { hash?: string };
    if (type === DistributionType.ETH) {
      txn = await contract?.claimEth(account, cumulativeAmount, merkleRoot, merkleProof);
    } else if (type === DistributionType.FLUR) {
      const flurTokenAddress = getFlurTokenAddress();
      txn = await contract?.claimErc20(flurTokenAddress, account, cumulativeAmount, merkleRoot, merkleProof);
    } else {
      const flowTokenAddress = getTokenAddress(chainId);
      txn = await contract?.claimErc20(flowTokenAddress, account, cumulativeAmount, merkleRoot, merkleProof);
    }

    return {
      hash: txn?.hash ?? ''
    };
  };

  return { claim };
};
