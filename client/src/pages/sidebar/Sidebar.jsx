import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faHillRockslide,
} from "@fortawesome/free-solid-svg-icons";

// eslint-disable-next-line react/prop-types
function Sidebar({ setMenuIndex }) {
  const menuItems = [
    {
      name: "Loading Point",
      icon: faLocationDot,
    },
    {
      name: "Rambu-Rambu",
      icon: faHillRockslide,
    },
  ];

  return (
    <div className="w-full h-full bg-white py-2">
      <ul>
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="flex flex-col items-center gap-2 my-4 ml-2 cursor-pointer hover:bg-blue-500 hover:text-white p-1 "
            onClick={() => {
              setMenuIndex(index);
            }}
          >
            <FontAwesomeIcon icon={item.icon} />
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
