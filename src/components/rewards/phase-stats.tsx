import { TokenomicsPhaseDto } from '@infinityxyz/lib-frontend/types/dto/rewards';
import { round } from '@infinityxyz/lib-frontend/utils';
import { NFT_TOTAL_SUPPLY } from 'src/utils';
import { InfoBox } from './info-box';
// import { RewardsProgressBar } from './progressbar';

export const getPhaseTradingRewardsPercent = (phase: TokenomicsPhaseDto | null) => {
  return `${round((100 * (phase?.tradingFeeRefund?.rewardSupply ?? 0)) / NFT_TOTAL_SUPPLY, 2)}%`;
};

export const RewardPhaseStats = ({ phase }: { phase: TokenomicsPhaseDto }) => {
  return (
    <>
      {phase?.tradingFeeRefund && (
        <div className="flex w-full justify-between">
          {/* <InfoBox.Stat
            label="Progress"
            value={
              <RewardsProgressBar
                amount={phase.tradingFeeRefund.rewardSupplyUsed ?? 0}
                max={phase?.tradingFeeRefund.rewardSupply ?? 0}
              />
            }
          /> */}
          <InfoBox.Stat label="Trading Rewards" value={getPhaseTradingRewardsPercent(phase)} />
          <InfoBox.Stat
            label="$ : $NFT ratio"
            value={`${phase.tradingFeeRefund.rewardRateNumerator ?? 0}:${
              phase.tradingFeeRefund.rewardRateDenominator ?? 0
            }`}
          />
        </div>
      )}
    </>
  );
};
