import { ChainId } from '@infinityxyz/lib-frontend/types/core';
import { RaffleLeaderboardUser } from '@infinityxyz/lib-frontend/types/dto';
import { useFetch } from 'src/utils';
import { useNetwork } from 'wagmi';

export const useRaffleEntrant = (raffleId: string, userAddress: string) => {
  const { chain } = useNetwork();
  const chainId = String(chain?.id ?? 1) as ChainId;

  const query = {
    chainId: (chainId || ChainId.Mainnet) as ChainId
  };

  const { result, isLoading, isError, error } = useFetch<RaffleLeaderboardUser>(
    userAddress ? `/raffles/${raffleId}/entrants/${userAddress}` : null,
    {
      query
    }
  );

  return {
    result,
    isLoading,
    isError,
    error
  };
};
