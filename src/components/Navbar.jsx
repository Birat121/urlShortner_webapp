import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LinkIcon, LogOut } from "lucide-react";
import { UrlState } from "@/context";
import { useFetch } from "@/hooks/use-fetch";
import { logout } from "@/db/apiAuth";
import { BarLoader } from "react-spinners";

const Navbar = () => {
  const navigate = useNavigate();

  const { user, fetchuser } = UrlState();

  const { loading, fn: fnlogout } = useFetch(logout);

  return (
    <>
      <nav className="w-full px-4 pt-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="text-4xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent tracking-wide drop-shadow-md"
          >
            NepLinkr
          </Link>

          {/* Nav Links */}
          <div className="flex gap-4 items-center">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="w-10 rounded-full overflow-hidden">
                  <Avatar>
                    <AvatarImage
                      src={user?.user_metadata?.profile_pic}
                      className="object-contain"
                    />
                    <AvatarFallback>BB</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>
                    {user?.user_metadata?.name}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LinkIcon className="mr-2 h-4 w-4" />
                    My Links
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span
                      onClick={() => {
                        fnlogout().then(() => {
                          fetchuser();
                          navigate("/");
                        });
                      }}
                    >
                      Logout
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-5 py-2 rounded-full border border-indigo-600 text-indigo-600 hover:bg-indigo-100 transition text-sm"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
      {true && loading && (
        <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
      )}
    </>
  );
};

export default Navbar;
