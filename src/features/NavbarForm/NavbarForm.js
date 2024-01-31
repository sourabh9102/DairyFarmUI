import React, { useState, useEffect } from "react";
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Input,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  Bars4Icon,
  GlobeAmericasIcon,
  NewspaperIcon,
  SquaresPlusIcon,
  TagIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import logo from "../../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartProduct } from "../Cart/cartProductSlice";
import { ProfileMenuDropdown } from "../UserProfile/ProfileMenuDropdown";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setFilteredProducts } from "../Product/productSlice";

const navListMenuItems = [
  {
    title: "Milk",
    description: "Explore the pure essence of nature in every drop.",
    icon: SquaresPlusIcon,
    to: "/milktypes",
    category_id: 1,
  },
  {
    title: "Milk Products",
    description: "Savor the richness of dairy, from farm to table.",
    icon: UserGroupIcon,
    to: "/milkProducts",
    category_id: 2,
  },
  {
    title: "Other Products",
    description: "Discover solutions for spiritual and gardening needs.",
    icon: Bars4Icon,
    to: "/otherProducts",
    category_id: 3,
  },
  {
    title: "Support",
    description: "Reach out to us for assistance or inquiries",
    icon: GlobeAmericasIcon,
    to: "/support",
  },
  {
    title: "News",
    description: "Read insightful articles, tips, and expert opinions.",
    icon: NewspaperIcon,
    to: "/news",
  },
  {
    title: "Special Offers",
    description: "Explore limited-time deals and bundles",
    icon: TagIcon,
    to: "/specialOffers",
  },
];

function NavListMenu(props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const renderItems = navListMenuItems.map(
    ({ icon, title, description, to, category_id }, key) => (
      <Link to={to} key={key}>
        <MenuItem
          className="flex items-center gap-3 rounded-lg"
          onClick={() => props.handleCategory(category_id)}
        >
          <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2 ">
            {" "}
            {React.createElement(icon, {
              strokeWidth: 2,
              className: "h-6 text-gray-900 w-6",
            })}
          </div>
          <div>
            <Typography
              variant="h6"
              color="blue-gray"
              className="flex items-center text-sm font-bold"
            >
              {title}
            </Typography>
            <Typography
              variant="paragraph"
              className="text-xs !font-medium text-blue-gray-500"
            >
              {description}
            </Typography>
          </div>
        </MenuItem>
      </Link>
    )
  );

  return (
    <>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Link as="div" variant="small" className="font-medium">
            <ListItem
              className="flex items-center gap-2 py-2 pr-4 font-medium text-sm"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              Products
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${
                  isMobileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </ListItem>
          </Link>
        </MenuHandler>
        <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
          <ul className="grid grid-cols-3 gap-y-2 outline-none outline-0">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </>
  );
}

function NavList() {
  const dispatch = useDispatch();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const handleCategory = (categoryId) => {
    axios
      .post("http://localhost:5001/auth/filter", { category_id: categoryId })
      .then((res) => {
        console.log("API Response:", res);
        if (res.data.success) {
          console.log("Data from API:", res.data.products);
          dispatch(setFilteredProducts(res.data.products));
        }
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  return (
    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
      <Link
        as="Link"
        to="/"
        variant="small"
        color=""
        className="font-medium text-sm"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">Home</ListItem>
      </Link>
      <Link
        as="Link"
        to="#process"
        variant="small"
        color="blue-gray"
        className="font-medium text-sm"
        onClick={() => scrollToSection("process")}
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">
          Our Process
        </ListItem>
      </Link>
      <Link
        as="Link"
        to="/about"
        variant="small"
        color="blue-gray"
        className="font-medium text-sm"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">
          About Us
        </ListItem>
      </Link>
      <NavListMenu handleCategory={handleCategory} />
      <Link
        as="Link"
        to="/contact"
        variant="small"
        color="blue-gray"
        className="font-medium text-sm"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">
          Contact Us
        </ListItem>
      </Link>
    </List>
  );
}

function NavbarForm() {
  const [openNav, setOpenNav] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState();
  const [searchData, setSearchData] = useState([]);

  const products = useSelector(selectCartProduct);
  const cartItemCount = products.length;

  const userDetail = useSelector((state) => state.userDetails.login);
  console.log("userDetail", userDetail);

  const handleSearch = async (e) => {
    const input = e.target.value;
    setSearchTerm(input);

    try {
      console.log("Fetching data for search term:", input);

      const response = await fetch(`http://localhost:8080/products?q=${input}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const searchData = await response.json();
      console.log("Search data received:", searchData);
      setSearchData(searchData);

      if (input.trim() === "") {
        setSearchData("");
        return;
      }
    } catch (error) {
      console.error("Error fetching search data:", error);
    }
  };

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Navbar className="w-full mx-auto px-4 py-2 sticky top-0 z-10">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Link to="/">
            <img src={logo} alt="Dairy Farm" className=" h-16" />
          </Link>
          <div className="hidden lg:block">
            <NavList />
          </div>
          <div className="text-2xl flex md:gap-5">
            {userDetail ? (
              <ProfileMenuDropdown />
            ) : (
              <Link to="/login" className="flex relative mr-5">
                <AiOutlineUser />
              </Link>
            )}
          </div>
          <div className="text-2xl">
            <Link className="flex mr-3 relative" to="/cart">
              <AiOutlineShoppingCart />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center bg-red-50 justify-center -my-2 -mr-4 h-2 px-2 py-2 rounded-full text-red-700 text-sm font-bold ring-1 ring-inset ring-red-600/10">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
          <div className="hidden lg:flex relative pt-3">
            <Input
              label="Search"
              containerProps={{
                className: "mb-4",
              }}
              value={searchTerm}
              onChange={handleSearch}
            />
            {searchData.length > 0 && (
              <div className="absolute top-full left-0 bg-white mt-2 py-2 rounded-lg shadow-md w-full">
                <ul className="list-none">
                  {searchData.slice(0, 5).map((product, index) => (
                    <Link key={index}>
                      <li className="ml-3 mb-1 mr-3">{product.name}</li>
                    </Link>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <IconButton
            variant="text"
            color="blue-gray"
            className="lg:hidden"
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <XMarkIcon className="h-6 w-6" strokeWidth={2} />
            ) : (
              <Bars3Icon className="h-6 w-6" strokeWidth={2} />
            )}
          </IconButton>
        </div>
        <Collapse open={openNav}>
          <NavList />
          <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden relative">
            <Input
              label="Search"
              containerProps={{
                className: "mb-4",
              }}
              value={searchTerm}
              onChange={handleSearch}
            />
            {searchData.length > 0 && (
              <div className="absolute top-full left-0 bg-white mt-2 py-2 rounded-lg shadow-md w-full">
                <ul className="list-none">
                  {searchData.slice(0, 5).map((product, index) => (
                    <Link key={index}>
                      <li className="ml-3 mb-1 mr-3">{product.name}</li>
                    </Link>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Collapse>
      </Navbar>
    </>
  );
}

export default NavbarForm;
