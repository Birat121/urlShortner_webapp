import React from "react";
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

const CreateLink = () => {
  const { user } = UrlState();
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button variant="destructive">Create New Link</Button>
        </DialogTrigger>
        <DialogContent className={"sm:max-w-md"}>
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl">Create New</DialogTitle>
          </DialogHeader>
          <Input id="title" placeholder="Title" />
          <Error message={""} />
          <Input id="title" placeholder="Url" />
          <Error message={""} />
          <div className="flex items-center gap-2">
            <Card className="p-2">nepxlinkr.com</Card> /
            <Input id="title" placeholder="Custom Link(optional)" />
          </div>
          <Error message={""} />
          <DialogFooter className="sm:justify-start">
            <Button variant={"destructive"}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateLink;
