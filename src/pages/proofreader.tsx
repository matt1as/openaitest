// Page that takes a text box "text_to_be_read" and calls the api /api/proofread?text=xxxx to proofread the text. The text is presented in a pparagraph below the input box
import React from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";


export default function Proofread() {
    const router = useRouter();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    const text = data.text_to_be_read;
    router.push(`/api/proofread?text=${text}`);
  };

  return (
    <div>
      <h1>Proofread</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Text to be proofread:
          <input type="text" {...register("text_to_be_read")} />
        </label>
      </form>
    </div>
  );
}