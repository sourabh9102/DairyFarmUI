import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { GoSignOut } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectUserDetails, setLogout } from "../Counter/userDetailsSlice";
import { clearCart } from "../Cart/cartProductSlice";
import { useEffect, useState } from "react";

export function ProfileMenuDropdown() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetail = useSelector(selectUserDetails);
  // console.log("userDetail1", userDetail);
  const [userImage, setUserImage] = useState();

  const handleLogout = () => {
    localStorage.clear();
    axios
      .post("http://localhost:5001/auth/logout")
      .then((res) => {
        if (res.data.success) {
          alert("Logout Successfully.");
          dispatch(clearCart());
          dispatch(setLogout());
          navigate("/");
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const storedImageUrl = localStorage.getItem("avatarSrc");
    console.log("storedImageUrl", storedImageUrl);
    if (storedImageUrl) {
      setUserImage(storedImageUrl);
    }
    console.log("Attempting to load image:");
  }, []);

  return (
    <Menu>
      <MenuHandler>
        <Avatar
          variant="circular"
          alt=""
          className="cursor-pointer"
          src={userImage}
        />
      </MenuHandler>
      <MenuList>
        <Link to="/userprofile">
          <MenuItem className="flex items-center gap-2">
            <FaUserCircle size={18} />
            <Typography variant="small" className="font-medium">
              My Profile
            </Typography>
          </MenuItem>
        </Link>
        <Link to="/wishlist">
          <MenuItem className="flex items-center gap-2">
            <FaRegHeart size={18} />
            <Typography variant="small" className="font-medium">
              Wishlist
            </Typography>
          </MenuItem>
        </Link>
        <hr className="my-2 border-blue-gray-50" />
        <Link>
          <MenuItem className="flex items-center gap-2 " onClick={handleLogout}>
            <GoSignOut size={18} />
            <Typography variant="small" className="font-medium">
              Sign Out
            </Typography>
          </MenuItem>
        </Link>
      </MenuList>
    </Menu>
  );
}
