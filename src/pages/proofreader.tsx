// Page that takes a text box "text_to_be_read" and calls the api /api/proofread?text=xxxx to proofread the text. The text is presented in a pparagraph below the input box using nextjs components
import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

async function callApi(text: string) {
  const response = await fetch(`/api/openapi?text=` + text);
  return response.json();
}

export default function Proofread() {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [text, setText] = useState("");

  const onSubmit = async (data: any) => {
    const text_to_be_read = data.text_to_be_read;
    router.push(`/proofreader?text=${text_to_be_read}`);
    const proofreadText = await callApi(text_to_be_read);
    setText(JSON.stringify(proofreadText.proofread_text));
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea
          rows={5}
          placeholder="Enter text to be read"
          {...register("text_to_be_read")}
        />

        <button type="submit">Create story as written by garfield</button>
      </form>
      <p>{text}</p>
    </div>
  );
}
