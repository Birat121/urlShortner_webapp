import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { BeatLoader } from "react-spinners";
import Error from "./error";
import * as yup from "yup";
import useFetch from "@/hooks/use-fetch";
import {  signup } from "@/db/apiAuth";
import { useNavigate, useSearchParams } from "react-router-dom";

const Signup = () => {
  const [error, setError] = React.useState([]);
  const [formdata, setFormData] = React.useState({
    email: "",
    password: "",
    name: "",
    profile_pic: null,
  });

  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: files ? files[0] : value,
    }));
  };

  const {
    data,
    loading,
    error: loginError,
    fn:signupdata,
  } = useFetch(signup, formdata);

  useEffect(() => {
    if (error === null && data) {
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
      fetchuser();
    }
  }, [error, loginError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError([]);
    try {
      const schema = yup.object().shape({
        name: yup.string().required("Name is required"),
        email: yup
          .string()
          .email("Invalid email")
          .required("Email is required"),
        password: yup.string().required("Password is required"),
        profile_pic: yup.mixed().required("Profile pic is required"),
      });
      await schema.validate(formdata, { abortEarly: false });
      await signupdata();
    } catch (e) {
      const newErrors = {};
      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setError(newErrors);
    }
  };
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>SignUp</CardTitle>
          <CardDescription>Create a new account</CardDescription>
          {error && <Error message={error.message} />}
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Input
              placeholder="Name"
              type="text"
              name="name"
              onChange={handleChange}
            />
          </div>
          {error.name && <Error message={error.name} />}
          <div className="space-y-1">
            <Input
              placeholder="Email"
              type="email"
              name="email"
              onChange={handleChange}
            />
          </div>
          {error.email && <Error message={error.email} />}
          <div className="space-y-1">
            <Input
              placeholder="Password"
              type="password"
              name="password"
              onChange={handleChange}
            />
          </div>
          {error.password && <Error message={error.password} />}

          <div className="space-y-1">
            <Input
              accept="image/*"
              type="file"
              name="profile_pic"
              onChange={handleChange}
            />
          </div>
          {error.password && <Error message={error.password} />}
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit}>
            {false ? <BeatLoader size={10} color="#36d7b9" /> : "Create Account"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
