import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../store/authSlice';

const Profile = () => {
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    if (!user) {
        return <div className="p-8 text-center text-slate-500">Please log in to view your profile.</div>;
    }

    return (
        <div className="flex-1 bg-slate-50 flex flex-col font-display">
            <div className="max-w-2xl mx-auto w-full p-4 md:p-8">
                <h1 className="text-3xl font-bold text-slate-800 mb-6">Your Profile</h1>
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
                            <div className="text-slate-900 font-medium">{user.email}</div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Role</label>
                            <div className="text-slate-900 font-medium capitalize">{user.role}</div>
                        </div>
                        <div className="pt-4 mt-4 border-t border-slate-200 flex gap-4">
                            <button
                                onClick={handleLogout}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                            >
                                Log Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
