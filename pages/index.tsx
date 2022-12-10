import Categories from "../components/Categories";
import MiddlePanel from "../components/MiddlePanel";

export default function Home() {
  return (
    <>
    <div className="flex mx-auto px-4 bg-gray-400 h-screen">
      <Categories />
      <MiddlePanel />
      <div className="w-1/6 bg-gray-900 mt-5">dasdasda</div>
    </div>
    </>
  )
}
