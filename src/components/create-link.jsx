import React, { useEffect, useRef, useState } from "react";
import { UrlState } from "@/context";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Error from "./error";
import { Card } from "./ui/card";
import * as yup from "yup";

import { QRCode } from "react-qrcode-logo";
import useFetch from "@/hooks/use-fetch";
import { createUrl } from "@/db/apiUrls";
import { BeatLoader } from "react-spinners";

const CreateLink = () => {
  const { user } = UrlState();
  const navigate = useNavigate();
  const ref = useRef();
  let [searchParams, setSearchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const [error, setError] = useState([]);
  const [formdata, setFormData] = useState({
    title: "",
    longUrl: longLink ? longLink : "",
    customUrl: "",
  });

  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    longUrl: yup.string().required("Url is required"),
    customUrl: yup.string(),
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };
  const {
    data,
    loading,
    error: createUrlError,
    fn: fnCreateUrl,
  } = useFetch(
    createUrl,
    user ? { ...formdata, user_id: user.id } : null // Pass null or undefined to skip
  );

  useEffect(() => {
    if (error === null && data) {
      navigate(`/link/${data[0].id}`);
    }
  }, [error, data]);

  const createNewUrl = async () => {
    setError([]);
    try {
      schema.validateSync(formdata, { abortEarly: false });
      const canvas = ref.current.canvasRef.canvas;
      const blob = await new Promise((resolve) => canvas.toBlob(resolve));
      await fnCreateUrl(blob);
    } catch (e) {
      const newErrors = {};
      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setError(newErrors);
    }
  };

  return (
    <Dialog
      defaultOpen={longLink}
      onOpenChange={(res) => {
        if (!res) setSearchParams({});
      }}
    >
      <DialogTrigger>
        <Button variant="destructive">Create New Link</Button>
      </DialogTrigger>
      <DialogContent className={"sm:max-w-md"}>
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl">Create New</DialogTitle>
        </DialogHeader>

        {formdata?.longUrl && (
          <QRCode values={formdata.longUrl} size={200} ref={ref} />
        )}
        <Input
          id="title"
          placeholder="Title"
          value={formdata.title}
          onChange={handleChange}
        />
        {error.title && <Error message={error.title} />}
        <Input
          id="longUrl"
          placeholder="Url"
          value={formdata.longUrl}
          onChange={handleChange}
        />
        {error.longUrl && <Error message={error.longUrl} />}
        <div className="flex items-center gap-2">
          <Card className="p-2">nepxlinkr.com</Card> /
          <Input
            id="customUrl"
            placeholder="Custom Link(optional)"
            value={formdata.customUrl}
            onChange={handleChange}
          />
        </div>
        {createUrlError && <Error message={createUrlError} />}
        <DialogFooter className="sm:justify-start">
          <Button
            disabled={loading}
            onClick={createNewUrl}
            variant={"destructive"}
          >
            {loading ? <BeatLoader size={8} color="#36d7b7" /> : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateLink;
