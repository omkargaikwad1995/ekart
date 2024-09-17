import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from "react";
import { useDispatch } from "react-redux";
import CommonForm from "@/components/common/form";
import { useToast } from '@/hooks/use-toast';
import { loginFormControls } from "@/config";
import { loginUser } from '@/store/auth-slice';
// import { registerUser } from "@/store/auth-slice";

const initialState = {
  email: "",
  password: "",
};

const Signin = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
       
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  console.log(formData);

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
    <div className="text-center">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        Signin to your account
      </h1>
      <p className="mt-2">
        Don't have an account
        <Link
          className="font-medium ml-2 text-primary hover:underline"
          to="/auth/signup"
        >
          Login
        </Link>
      </p>
    </div>
    <CommonForm
      formControls={loginFormControls}
      buttonText={"Sign In"}
      formData={formData}
      setFormData={setFormData}
      onSubmit={onSubmit}
    />
  </div>
  )
}

export default Signin