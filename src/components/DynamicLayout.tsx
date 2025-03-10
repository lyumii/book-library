import CategoryMenu from "./CategoryMenu";
import Home from "./Home";
import FaveList from "./FaveList";

export default function DynamicLayout() {
  return (
    <div className="bg-[#FAF1E0] dynamiclayout dark:bg-stone-800 grid grid-cols-4 grid-rows-2 p-3 mt-5 rounded-lg shadow-lg">
      <div className="flex imgdiv border-1 col-span-2 border-brown-200 dark:border-orange-200 justify-end p-1 w-[100vh] max-w-full items-end gap-6">
        <p className="uppercase para max-w-[20%] break-words text-right mb-3 dark:text-orange-300">
          Same cozy feels, now digitally.
        </p>
        <img
          className="w-[65vh] mb-4 mr-4 max-w-[80%] h-[35vh]"
          src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2728&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="library row and lights"
        />
      </div>{" "}
      <div className="group categories row-span-1 overflow-auto w-[50vh] h-[40vh] shadow-lg border-1 dark:border-orange-200 p-1 border-brown-200 ">
        <CategoryMenu class={`dynamic`} />
      </div>
      <div className="row-span-2 favelist overflow-auto w-[50vh] h-[66vh] shadow-lg border-1 dark:border-orange-200   p-1 border-brown-200">
        <FaveList />
      </div>
      <div className="w-[153vh] home h-[25vh] col-span-3 dark:border-orange-200 my-2 p-2 shadow-lg border-1 border-brown-200">
        <Home />
      </div>
    </div>
  );
}
