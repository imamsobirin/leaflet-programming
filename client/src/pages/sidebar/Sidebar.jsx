import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faHillRockslide,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

// eslint-disable-next-line react/prop-types
function Sidebar({ setMenuIndex, menuIndex }) {
  const menuItems = [
    {
      name: "Loading Point",
      icon: faLocationDot,
    },
    {
      name: "Rambu Rambu",
      icon: faHillRockslide,
    },
    {
      name: "Danger Zone",
      icon: faTriangleExclamation,
    },
  ];

  return (
    <div className="w-full h-full bg-white p-1">
      <ul>
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={`flex flex-col items-center gap-2 py-4 border border-blue-400 my-1 cursor-pointer hover:bg-blue-500 hover:text-white p-1 text-center rounded-2xl ${
              index === menuIndex ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => {
              setMenuIndex(index);
            }}
          >
            <FontAwesomeIcon icon={item.icon} className="font-lg" />
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
