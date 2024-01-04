import { CiSearch } from "react-icons/ci";

export default function SearchChat() {
  return (
    <section className="relative ">
      <CiSearch className="absolute left-2 top-6" />
      <input
        type="search"
        placeholder="Search or start a new chat"
        className="bg-gray-200 pl-8 w-full p-2 mt-3 focus:outline-none border-b-2 focus:border-b-2 focus:border-green-600"
      />
    </section>
  );
}
