import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../../store/authSlice';
import api from '../../../services/api';
import Header from '../../common/Header';

const LoginPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loginError, setLoginError] = useState('');

    const onSubmit = async (data) => {
        try {
            setLoginError('');
            const response = await api.post('/auth/login', data);
            dispatch(loginSuccess(response.data));
            navigate(response.data.user.role === 'admin' ? '/dashboard' : '/');
        } catch (error) {
            setLoginError(error.response?.data?.message || 'Login failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-display">
            <Header />
            <main className="flex-1 flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 max-w-md w-full">
                    <h2 className="text-2xl font-bold text-slate-800 text-center mb-6">Welcome Back</h2>

                    {loginError && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4">
                            {loginError}
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
                                {...register('password', { required: 'Password is required' })}
                                className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#137EED] focus:border-transparent transition-all"
                                placeholder="••••••••"
                            />
                            {errors.password && <span className="text-red-500 text-xs mt-1 block">{errors.password.message}</span>}
                        </div>

                        <button type="submit" className="w-full bg-[#137EED] hover:bg-blue-600 text-white font-semibold py-2.5 rounded-lg transition-colors shadow-sm">
                            Sign In
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-slate-600">
                        Don't have an account? <span onClick={() => navigate('/register')} className="text-[#137EED] font-semibold cursor-pointer hover:underline">Sign up</span>
                    </p>
                </div>
            </main>
        </div>
    );
};

export default LoginPage;
