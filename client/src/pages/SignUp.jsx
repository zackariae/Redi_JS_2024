import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e, next) => {
    e.preventDefault();
    if (!formData.userName || !formData.email || !formData.password) {
      return setErrorMessage("Please fill out all fields.");
    }
    try {
      setIsLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success == false) {
        setErrorMessage(data.message);
      }
      setIsLoading(false);
      if (res.ok) {
        navigate("/sign-in");
      }
    } catch (error) {
      setErrorMessage(error);
      setIsLoading(false);
    }
  };

  return (
    <div className=" min-h-screen mt-20">
      <div className="flex gap-8 p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center">
        {/**left div */}
        <div className=" flex-1">
          <Link to="/" className="text-4xl font-bold dark:text-white">
            <span className="px-2 bg-gradient-to-r from-sky-500 to-rose-600 rounded-lg text-white">
              Redi
            </span>{" "}
            Blog
          </Link>
          <p className="text-sm mt-5">
            Lorem ipsum dolor sit amet consectetur, ibero doloremque, harum
            magnam sed! Saepe.
          </p>
        </div>

        {/**right div */}
        <div className="flex-1 ">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your username" />
              <TextInput
                type="text"
                placeholder="Username"
                id="userName"
                onChange={handleInput}
              />
            </div>
            <div>
              <Label value="Email" />
              <TextInput
                type="email"
                placeholder="Email"
                id="email"
                onChange={handleInput}
              />
            </div>
            <div>
              <Label value="Password" />
              <TextInput
                type="text"
                placeholder="Password"
                id="password"
                onChange={handleInput}
              />
            </div>
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner size="sm" /> <span className="pl-4">Loading...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-8">
            <span>Have an account ?</span>
            <Link to="/sign-in" className="text-blue-500 ">
              Sing In
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
