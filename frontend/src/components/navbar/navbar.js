import { usePathname } from "next/navigation";
import Link from "next/link";

const tabs = [
  { id: 0, label: "Home", link: "/" },
  { id: 1, label: "Filter 1", link: "/filter1" },
  { id: 2, label: "Filter 2", link: "/filter2" },
  { id: 3, label: "Filter 3", link: "/filter3" },
  { id: 4, label: "Filter 4", link: "/filter4" },
  { id: 5, label: "Filter 5", link: "/filter5" },
];

const Tabs = () => {
  const pathname = usePathname();

  return (
    <div className="flex border-b border-gray-200 mb-5">
      {tabs.map((tab, index) => (
        <Link key={tab.id} href={tab.link}>
          <div
            className={`${
              pathname === tab.link
                ? "border-indigo-500 text-indigo-600 bg-indigo-100"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } flex-1 whitespace-nowrap py-3 px-6 rounded-t-md border-b-2 font-medium text-sm cursor-pointer ${
              index === 0 ? "mr-5" : ""
            }`}
          >
            {tab.label}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Tabs;
