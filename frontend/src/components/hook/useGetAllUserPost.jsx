import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserSubmit } from "../../store/userPostSlice";

const useGetAllUserPost = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAllUserPost = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}admin/all-users`,
                    { withCredentials: true }
                );
                if (res.data.success) {
                    console.log("Fetched User Posts:", res?.data?.userPosts);
                    dispatch(setUserSubmit(res?.data?.userPosts));
                } else {
                    console.error("Failed to fetch user posts:", res.data.message);
                }
            } catch (error) {
                console.error("Error fetching user posts:", error.message);
            }
        };

        fetchAllUserPost();
    }, [dispatch]);
};

export default useGetAllUserPost;
