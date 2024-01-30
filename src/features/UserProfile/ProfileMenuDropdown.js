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
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLogout } from "../Counter/userDetailsSlice";
import { clearCart } from "../Cart/cartProductSlice";



export function ProfileMenuDropdown() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        localStorage.clear();
        axios.post("http://localhost:5001/auth/logout")
            .then(res => {
                if (res.data.success) {
                    alert("Logout Successfully.");
                    dispatch(clearCart());
                    dispatch(setLogout());
                    navigate('/');
                } else {
                    alert("Error");
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <Menu>
            <MenuHandler>
                <Avatar
                    variant="circular"
                    alt="tania andrew"
                    className="cursor-pointer"
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                />
            </MenuHandler>
            <MenuList>
                <Link to='/userprofile'>
                    <MenuItem className="flex items-center gap-2">
                        <FaUserCircle size={18} />
                        <Typography variant="small" className="font-medium">
                            My Profile
                        </Typography>
                    </MenuItem>
                </Link>
                <Link to='/wishlist'>
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
