import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Transition } from "@headlessui/react";
import { FaBriefcase } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { CiSettings } from "react-icons/ci";
import { IoKeyOutline } from "react-icons/io5";
import { CiBellOn } from "react-icons/ci";
import { IoMdArrowBack } from "react-icons/io";
import userDetailsSlice, {
  selectUserDetails,
  setLogin,
} from "../Counter/userDetailsSlice";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { deepOrange } from "@mui/material/colors";

function EditProfile() {
  const [file, setFile] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const yourRef = useRef();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const navigation = [
    { name: "Profile", to: "#", icon: CgProfile, current: false },
    { name: "Account", to: "#", icon: CiSettings, current: false },
    { name: "Password", to: "/changePass", icon: IoKeyOutline, current: false },
    { name: "Notifications", to: "#", icon: CiBellOn, current: false },
  ];
  const secondaryNavigation = [{ name: "Back", icon: IoMdArrowBack }];

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            ref={yourRef}
            className="fixed inset-0 z-40 flex md:hidden"
            onClose={() => setSidebarOpen(false)}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative max-w-xs w-full bg-white pt-5 pb-4 flex-1 flex flex-col">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-14 p-1">
                    <button
                      type="button"
                      className="h-12 w-12 rounded-full flex items-center justify-center focus:outline-none focus:bg-gray-600"
                      onClick={() => setSidebarOpen(true)}
                    >
                      <FaBriefcase
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                      <span className="sr-only">Close sidebar</span>
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-shrink-0 px-4 flex items-center">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/easywire-logo-purple-600-mark-gray-900-text.svg"
                    alt="Easywire"
                  />
                </div>
                <div className="mt-5 flex-1 h-0 overflow-y-auto">
                  <nav className="h-full flex flex-col">
                    <div className="space-y-1">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            item.current
                              ? "bg-purple-50 border-purple-600 text-purple-600"
                              : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                            "group border-l-4 py-2 px-3 flex items-center text-base font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          <item.icon
                            className={classNames(
                              item.current
                                ? "text-purple-500"
                                : "text-gray-400 group-hover:text-gray-500",
                              "mr-4 flex-shrink-0 h-6 w-6"
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      ))}
                    </div>
                    <div className="mt-auto pt-10 space-y-1">
                      {secondaryNavigation.map((item) => (
                        <Link
                          key={item.name}
                          to="/userprofile"
                          className="group border-l-4 border-transparent py-2 px-3 flex items-center text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                        >
                          <item.icon
                            className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </nav>
                </div>
              </div>
            </Transition.Child>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 pt-20 mt-1">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col flex-grow bg-cyan-700 pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              {/* <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/easywire-logo-cyan-300-mark-white-text.svg"
                alt="Easywire logo"
              /> */}
            </div>
            <nav
              className="mt-5 flex-1 flex flex-col divide-y divide-cyan-800 overflow-y-auto"
              aria-label="Sidebar"
            >
              <div className="px-2 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      item.current
                        ? "bg-cyan-800 text-white"
                        : "text-cyan-100 hover:text-white hover:bg-cyan-600",
                      "group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    <item.icon
                      className="mr-4 flex-shrink-0 h-6 w-6 text-cyan-200"
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="mt-6 pt-6">
                <div className="px-2 space-y-1">
                  {secondaryNavigation.map((item) => (
                    <Link
                      key={item.name}
                      to="/userprofile"
                      className="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-cyan-100 hover:text-white hover:bg-cyan-600"
                    >
                      <item.icon
                        className="mr-4 h-6 w-6 text-cyan-200"
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        </div>

        {/* Content area */}
        <div className="md:pl-60 pr-40">
          <div className="max-w-4xl mx-auto flex flex-col md:px-8 xl:px-0">
            <main className="flex-1">
              <div className="relative max-w-4xl mx-auto md:px-8 xl:px-0">
                <div className="px-4 sm:px-6 md:px-0">
                  {/* Tabs */}

                  <Profile />
                  {/* Description list with inline editing */}
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProfile;

function Profile() {
  const userDetail = useSelector(selectUserDetails);
  console.log("userDetail", userDetail);

  const userArray = [userDetail];

  const dispatch = useDispatch();

  const [updatedUname, setUpdatedUname] = useState(userDetail.uname);
  const [updatedName, setUpdatedName] = useState(userDetail.fname);
  const [updatedEmail, setUpdatedEmail] = useState(userDetail.email);
  const [updatedAddress, setUpdatedAddress] = useState(userDetail.address);
  const [userImage, setUserImage] = useState(null);
  const [avatarSrc, setAvatarSrc] = useState();

  const fileInputRef = useRef(null);

  const handleUpdate = (e, field) => {
    console.log("target value", e.target.value);

    switch (field) {
      case "uname":
        setUpdatedUname(e.target.value);
        break;
      case "fname":
        setUpdatedName(e.target.value);
        break;
      case "email":
        setUpdatedEmail(e.target.value);
        break;
      case "address":
        setUpdatedAddress(e.target.value);
        break;
      default:
        break;
    }
  };

  const submitUpdate = () => {
    const updatedData = {
      ...userDetail,
      uname: updatedUname,
      fname: updatedName,
      email: updatedEmail,
      address: updatedAddress,
    };

    const formData = new FormData();
    formData.append("user", JSON.stringify(updatedData));

    console.log("user click se", updatedData);

    axios
      .post("http://localhost:5001/auth/updateProfile", updatedData)
      .then((res) => {
        if (res.data.success) {
          alert("Profile updated successfully");
          dispatch(
            setLogin({
              userDetail: res.data.updatedUser,
              token: res.data.token,
            })
          );
        }
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  const handleAvatarClick = (e) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.addEventListener("change", (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setAvatarSrc(e.target.result);
        };
        reader.readAsDataURL(file);
        const formData = new FormData();
        formData.append("file", file);
        const userId = userDetail.id;
        formData.append("userId", userId);
        const imageFormData = Object.fromEntries(formData);
        axios
          .post("http://localhost:5001/auth/profilePicUpload", imageFormData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            console.log("res.data", res.data);
            if (res.data.success) {
              console.log("Image uploaded successfully.");
              const imageUrl = `http://localhost:5001${res.data.profileImage}`;
              console.log("imageUrl", imageUrl);
              setAvatarSrc(imageUrl);

              // const imageUrl = res.data.profileImage;
              // console.log("imageUrl", imageUrl);
              // setAvatarSrc(`http://localhost:5001/${imageUrl}`);
            }
          })
          .catch((error) => {
            console.log("Error:", error);
          });
      }
    });
    input.click();
  };

  const handleAvatarError = () => {
    // Handle the error gracefully, set a default image, or log the error
    setAvatarSrc("/images/productImg3.jpg");
  };

  return (
    <>
      <div className="divide-y divide-gray-200 pt-5">
        <div className="w-full space-y-1 shadow-md rounded px-3 py-3 flex">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Profile
            </h3>
            <p className="max-w-2xl text-sm text-gray-500">
              This information will be displayed publicly so be careful what you
              share.
            </p>
          </div>

          <Stack direction="row" spacing={2} className="ml-auto">
            <Avatar
              sx={{ bgcolor: deepOrange[500] }}
              alt={"DairyDelight"}
              src={avatarSrc}
              onClick={handleAvatarClick}
              onError={handleAvatarError}
            />
          </Stack>
        </div>
        <div className="mt-6">
          {userArray?.map((user, index) => (
            <dl key={index} className="divide-y divide-gray-200 px-3 py-3">
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">User Name</dt>
                <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    name="username"
                    autoComplete="username"
                    className="focus:ring-sky-500 focus:border-sky-500 flex-grow block rounded-md sm:text-sm border-gray-300 mr-44"
                    value={updatedUname}
                    onChange={(e) => handleUpdate(e, "uname")}
                  />
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Name</dt>
                <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    name="fname"
                    autoComplete="fname"
                    value={updatedName}
                    className="focus:ring-sky-500 focus:border-sky-500 flex-grow block rounded-md sm:text-sm border-gray-300 mr-44"
                    onChange={(e) => handleUpdate(e, "fname")}
                  />
                </dd>
              </div>

              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    name="email"
                    autoComplete="email"
                    value={updatedEmail}
                    className="focus:ring-sky-500 focus:border-sky-500 flex-grow block rounded-md sm:text-sm border-gray-300 mr-44"
                    onChange={(e) => handleUpdate(e, "email")}
                  />
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200">
                <dt className="text-sm font-medium text-gray-500">Address</dt>
                <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    name="address"
                    autoComplete="address"
                    value={updatedAddress}
                    className="focus:ring-sky-500 focus:border-sky-500 flex-grow block rounded-md sm:text-sm border-gray-300 mr-44"
                    onChange={(e) => handleUpdate(e, "address")}
                  />
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200">
                <dt className="text-sm font-medium text-gray-500 invisible"></dt>
                <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <span className="flex-grow"></span>
                  <button
                    type="button"
                    className="px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={submitUpdate}
                  >
                    Update
                  </button>
                </dd>
              </div>
            </dl>
          ))}
        </div>
      </div>
    </>
  );
}

export function Account() {
  const [automaticTimezoneEnabled, setAutomaticTimezoneEnabled] =
    useState(true);
  const [autoUpdateApplicantDataEnabled, setAutoUpdateApplicantDataEnabled] =
    useState(false);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <>
      <div className="mt-10 divide-y divide-gray-200">
        <div className="space-y-1">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Account
          </h3>
          <p className="max-w-2xl text-sm text-gray-500">
            Manage how information is displayed on your account.
          </p>
        </div>
        <div className="mt-6">
          <dl className="divide-y divide-gray-200">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Language</dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <span className="flex-grow">English</span>
                <span className="ml-4 flex-shrink-0">
                  <button
                    type="button"
                    className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    Update
                  </button>
                </span>
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
              <dt className="text-sm font-medium text-gray-500">Date format</dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <span className="flex-grow">DD-MM-YYYY</span>
                <span className="ml-4 flex-shrink-0 flex items-start space-x-4">
                  <button
                    type="button"
                    className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    Update
                  </button>
                  <span className="text-gray-300" aria-hidden="true">
                    |
                  </span>
                  <button
                    type="button"
                    className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    Remove
                  </button>
                </span>
              </dd>
            </div>
            <Switch.Group
              as="div"
              className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5"
            >
              <Switch.Label
                as="dt"
                className="text-sm font-medium text-gray-500"
                passive
              >
                Automatic timezone
              </Switch.Label>
              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <Switch
                  checked={automaticTimezoneEnabled}
                  onChange={setAutomaticTimezoneEnabled}
                  className={classNames(
                    automaticTimezoneEnabled ? "bg-purple-600" : "bg-gray-200",
                    "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-auto"
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={classNames(
                      automaticTimezoneEnabled
                        ? "translate-x-5"
                        : "translate-x-0",
                      "inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                    )}
                  />
                </Switch>
              </dd>
            </Switch.Group>
            <Switch.Group
              as="div"
              className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200"
            >
              <Switch.Label
                as="dt"
                className="text-sm font-medium text-gray-500"
                passive
              >
                Auto-update applicant data
              </Switch.Label>
              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <Switch
                  checked={autoUpdateApplicantDataEnabled}
                  onChange={setAutoUpdateApplicantDataEnabled}
                  className={classNames(
                    autoUpdateApplicantDataEnabled
                      ? "bg-purple-600"
                      : "bg-gray-200",
                    "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-auto"
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={classNames(
                      autoUpdateApplicantDataEnabled
                        ? "translate-x-5"
                        : "translate-x-0",
                      "inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                    )}
                  />
                </Switch>
              </dd>
            </Switch.Group>
          </dl>
        </div>
      </div>
    </>
  );
}
