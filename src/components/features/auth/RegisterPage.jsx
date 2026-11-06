import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../../store/authSlice';
import api from '../../../services/api';

const RegisterPage = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [registerError, setRegisterError] = useState('');

    const password = watch("password");

    const onSubmit = async (data) => {
        try {
            setRegisterError('');
            const response = await api.post('/auth/register', {
                email: data.email,
                password: data.password,
                role: 'user' // default role
            });
            dispatch(loginSuccess(response.data));
            navigate('/');
        } catch (error) {
            setRegisterError(error.response?.data?.message || 'Registration failed. Please try again.');
        }
    };

    return (
        <div className="flex-1 bg-slate-50 flex flex-col font-display">
            <main className="flex-1 flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 max-w-md w-full">
                    <h2 className="text-2xl font-bold text-slate-800 text-center mb-6">Create an Account</h2>

                    {registerError && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4">
                            {registerError}
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
                            <input
                                type="email"
                                {...register('email', { required: 'Email is required' })}
                                className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#137EED] focus:border-transparent transition-all"
                                placeholder="you@example.com"
                            />
                            {errors.email && <span className="text-red-500 text-xs mt-1 block">{errors.email.message}</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
                            <input
                                type="password"
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: { value: 6, message: 'Password must be at least 6 characters' }
                                })}
                                className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#137EED] focus:border-transparent transition-all"
                                placeholder="••••••••"
                            />
                            {errors.password && <span className="text-red-500 text-xs mt-1 block">{errors.password.message}</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Confirm Password</label>
                            <input
                                type="password"
                                {...register('confirmPassword', {
                                    required: 'Please confirm password',
                                    validate: value => value === password || "The passwords do not match"
                                })}
                                className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#137EED] focus:border-transparent transition-all"
                                placeholder="••••••••"
                            />
                            {errors.confirmPassword && <span className="text-red-500 text-xs mt-1 block">{errors.confirmPassword.message}</span>}
                        </div>

                        <button type="submit" className="w-full bg-[#137EED] hover:bg-blue-600 text-white font-semibold py-2.5 rounded-lg transition-colors shadow-sm">
                            Sign Up
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-slate-600">
                        Already have an account? <span onClick={() => navigate('/login')} className="text-[#137EED] font-semibold cursor-pointer hover:underline">Log in</span>
                    </p>
                </div>
            </main>
        </div>
    );
};

export default RegisterPage;
