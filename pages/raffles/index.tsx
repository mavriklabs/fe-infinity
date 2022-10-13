import { PageBox, Spinner } from 'src/components/common';
import { RaffleDescription } from 'src/components/raffles/raffle-description';
import { useRaffles } from 'src/hooks/api/useRaffles';

const RafflesPage = () => {
  const {
    result: { raffles, ethPrice },
    isLoading
  } = useRaffles();

  return (
    <PageBox title="Raffles" showTitle={true}>
      <div className="space-y-4">
        {isLoading && <Spinner />}
        {!isLoading &&
          raffles.map((raffle) => {
            return <RaffleDescription raffle={raffle} key={raffle.id} ethPrice={ethPrice} />;
          })}
      </div>
    </PageBox>
  );
};

export default RafflesPage;
