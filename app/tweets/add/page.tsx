"use client";
import Button from "@components/Button";
import { useActionState } from "react";
import { uploadTweet } from "./actions";
import Input from "@components/Input";

const AddProduct = () => {
  const [state, action] = useActionState(uploadTweet, null);
  return (
    <div>
      <form action={action} className="p-5 flex flex-col gap-5">
        <Input
          type="text"
          name="tweet"
          required
          placeholder="Content"
          errors={state?.fieldErrors?.tweet}
        />

        <Button value="Post" />
      </form>
    </div>
  );
};

export default AddProduct;
