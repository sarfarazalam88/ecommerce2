import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import toast from 'react-hot-toast'
const Signup = () => {
    const [user, setUser] = useState({
        fullname: "",
        username: "",
        password: "",
        confirmPassword: "",
        gender: "",
    });
    const navigate = useNavigate();
    const handleCheckbox = (gender) => {
        setUser({ ...user, gender })
    }
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`http://localhost:8000/api/register`, user, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            if (res.data) {
                navigate("/login");
                toast(res.data.message)
            }
        } catch (error) {
            toast.error(error.response.message);
            console.log(error)
        }

        setUser({
            fullname: "",
            username: "",
            password: "",
            confirmPassword: "",
            gender: "",
        });
    }
    return (
        <div className=" min-w-96 mx-auto">
            <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100'>
                <h1 className='text-3xl font-bold text-center'>Signup</h1>
                <form onSubmit={onSubmitHandler} action=''>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>username</span>
                        </label>
                        <input
                            value={user.username}
                            onChange={(e) => setUser({ ...user, username: e.target.value })}
                            className='w-full input input-bordered h-10' type='text' placeholder='username' />
                    </div>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>fullname</span>
                        </label>
                        <input
                            value={user.fullname}
                            onChange={(e) => setUser({ ...user, fullname: e.target.value })}
                            className='w-full input input-bordered h-10' type='text' placeholder='fullname' />
                    </div>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>password</span>
                        </label>
                        <input
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            className='w-full input input-bordered h-10' type='password' placeholder='Confirmpassword' />
                    </div>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Confirm password</span>
                        </label>
                        <input
                            value={user.confirmPassword}
                            onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
                            className='w-full input input-bordered h-10' type='password' placeholder='Confirmpassword' />
                    </div>
                    <div className='flex items-center my-4'>
                        <div className='flex items-center'>
                            <p>male</p>
                            <input
                                type="checkbox"
                                checked={user.gender === "male"}
                                onChange={() => handleCheckbox("male")}
                                defaultChecked
                                className="checkbox mx-2" />
                        </div>
                        <div className='flex items-center'>
                            <p>female</p>
                            <input
                                checked={user.gender === "female"}
                                onChange={() => handleCheckbox("female")}
                                type="checkbox"
                                defaultChecked
                                className="checkbox mx-2" />
                        </div>
                    </div>
                    <p className='text-center'>Already have an account?  <Link to="/login">Signup
                    </Link></p>
                    <div>
                        <button type='submit' className='btn btn-block btn-sm mt-2 border border-slate-600'>Signup</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup
