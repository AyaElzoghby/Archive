import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components";
import { useAuth } from "../store/Auth";
function AuthPage({ image }) {
	const [isFocuse, setIsFocuse] = useState("");
	const navigation = useNavigate();
	const [formValues, setFormValues] = useState({
		username: "",
		password: "",
	});
	const { signIn } = useAuth();
	const [errors, setErrors] = useState({});

	function handleSetInputFocuse(name) {
		setIsFocuse(name);
	}

	function handleInputBlur() {
		setIsFocuse("");
	}

	function handleInputChange(e) {
		const { name, value } = e.target;
		setFormValues({ ...formValues, [name]: value });
	}

	async function handleSubmit(e) {
		e.preventDefault();
		setErrors({}); // Clear previous errors
		try {
			const response = await signIn(formValues.username, formValues.password);
			navigation("/");
		} catch (error) {
			if (error.message.includes("Invalid username")) {
				setErrors({ username: "اسم المستخدم غير صحيح" });
			} else if (error.message.includes("Invalid password")) {
				setErrors({ password: "كلمة المرور غير صحيحة" });
			} else {
				setErrors({ general: "حدث خطأ ما. حاول مرة أخرى." });
			}
		}
	}

	const activeClass = `shadow-md shadow-blue-400/70`;

	return (
		<>
			<Header />
			<section
				className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-[#f7f9fc] p-4 sm:p-8 lg:p-0"
				dir="rtl">
				{/* Right Section: Form */}
				<div className="flex-1 flex flex-col justify-center p-4 sm:p-8 lg:p-12 space-y-6 max-w-md w-full mx-auto lg:mx-0">
					<h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-mainBlue mb-4 sm:mb-8 text-center lg:text-left">
						نظام الإدارة الفنية للأصول
					</h1>
					<form
						onSubmit={handleSubmit}
						className="space-y-4 sm:space-y-6">
						<div className="flex flex-col gap-2">
							<label className="text-mainBlue">اسم المستخدم:</label>
							<input
								className={`p-2 border-2 border-mainBlue hover:border-blue-900 text-mainBlue duration-500 rounded-md outline-none transition-all w-full ${
									isFocuse === "username" && activeClass
								}`}
								type="text"
								name="username"
								value={formValues.username}
								onChange={handleInputChange}
								onFocus={() => handleSetInputFocuse("username")}
								onBlur={handleInputBlur}
								placeholder="أدخل اسم المستخدم"
							/>
							{errors.username && (
								<label className="text-red-500 text-sm">
									{errors.username}
								</label>
							)}
						</div>

						<div className="flex flex-col gap-2">
							<label className="text-mainBlue">كلمه المرور</label>
							<input
								className={`p-2 border-2 border-mainBlue hover:border-blue-900 text-mainBlue duration-500 rounded-md outline-none transition-all w-full ${
									isFocuse === "password" && activeClass
								}`}
								type="password"
								name="password"
								value={formValues.password}
								onChange={handleInputChange}
								onFocus={() => handleSetInputFocuse("password")}
								onBlur={handleInputBlur}
								placeholder="أدخل كلمة السر"
							/>
							{errors.password && (
								<label className="text-red-500 text-sm">
									{errors.password}
								</label>
							)}
						</div>

						{errors.general && (
							<label className="text-red-500 text-sm">{errors.general}</label>
						)}

						<button
							type="submit"
							className="bg-mainBlue text-white p-2 rounded-md hover:bg-blue-800 transition duration-500 w-full mt-4 sm:mt-6">
							تسجيل الدخول
						</button>
					</form>
				</div>

				{/* Left Section: Image */}
				<div className="flex-1 flex justify-center items-center p-4 lg:p-6 mt-10 lg:mt-0">
					<img
						src={image}
						alt="Login illustration"
						className="w-3/4 sm:w-2/3 lg:w-[300px] xl:w-[400px] object-cover"
					/>
				</div>
			</section>
		</>
	);
}

export default AuthPage;
