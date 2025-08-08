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
import { login } from "@/db/apiAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "@/context";
import toast from "react-hot-toast";

const Login = () => {
  const [error, setError] = React.useState([]);
  const [formdata, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const {
    data,
    loading,
    error: loginError,
    fn: fnlogin,
  } = useFetch(login, formdata);

  const { fetchuser } = UrlState();

  useEffect(() => {
    if (loginError === null && data) {
      toast.success("Logged in successfully!");
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
      fetchuser();
    }

    if (loginError) {
      toast.error(loginError.message || "Login failed");
    }
  }, [data, loginError]);

  const handleSubmit = async () => {
    setError([]);
    try {
      const schema = yup.object().shape({
        email: yup
          .string()
          .email("Invalid email")
          .required("Email is required"),
        password: yup.string().required("Password is required"),
      });

      await schema.validate(formdata, { abortEarly: false });
      await fnlogin();
    } catch (e) {
      const newErrors = {};
      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
        toast.error(err.message); // Show toast for each validation error
      });
      setError(newErrors);
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Login to your account</CardDescription>
          {error && <Error message={error.message} />}
        </CardHeader>
        <CardContent className="space-y-2">
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
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit}>
            {loading ? <BeatLoader size={10} color="#36d7b9" /> : "Login"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
