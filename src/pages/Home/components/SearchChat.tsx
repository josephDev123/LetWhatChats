import { CiSearch } from "react-icons/ci";

interface SearchChatProps {
  listenToSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function SearchChat({ listenToSearch }: SearchChatProps) {
  return (
    <section className="relative ">
      <CiSearch className="absolute sm:block hidden left-2 top-3" />
      <input
        type="search"
        onChange={listenToSearch}
        placeholder="Search or start a chat"
        className="sm:flex hidden bg-gray-200 pl-8 w-full p-2 mt-3 focus:outline-none border-b-2 focus:border-b-2 focus:border-green-600"
      />
    </section>
  );
}
