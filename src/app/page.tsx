import HomePage from "./home/page";
import Layouts from "@/components/Layouts";

export default function Home() {
  return (
    <div className="font-sans">
      <Layouts isHeader={true} isFooter={true}>
        <HomePage />
      </Layouts>
    </div>
  );
}
