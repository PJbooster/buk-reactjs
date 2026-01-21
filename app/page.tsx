import Main from "./components/Main";
import { BetProvider } from "./provider/BetProvider";
import { BettingEvent } from "./interfaces";
import mockData from "./mock.json";

const data = mockData as BettingEvent[];

export default function Home() {
  return (
    <main>
      <BetProvider data={data}>
        <Main />
      </BetProvider>
    </main>
  );
}
