/* eslint-disable react/prop-types */
import { Outlet, useNavigate } from "react-router-dom";
import SideNavbar from "../containers/SideNavbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import UseInitialFetch from "../hooks/query/UseInitialFetch";
import LoadingState from "../containers/Loading";
import UseLoginCheck from "../hooks/query/UseLoginCheck";
import GlobalForm from "../containers/GlobalForm";
import { toggleState } from "../redux/slice/toggleSlice";
import OfflineDetector from "../lib/OfflineDetector";

const MainLayout = () => {
  const { hideSidebars } = useSelector(toggleState);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // WORK: MAKING CONTINUOUS CHECKING ONLY AFTER SUCCESSFUL LOGGED IN THAT IS USER IS AUTHENTICATED EVERY 5 MINUTES, THAT IT DOES NOT MAKE ANY CHANGE IN TOKEN
  const { isError, error, isSuccess, isLoading } = UseLoginCheck();

  // WORK: INITIALLY FETCH ALL NOTEBOOKS AND NOTES RELATED TO THAT USER
  const {
    isLoading: initialFetchIsLoading,
    error: initialFetchError,
    isSuccess: initialFetchIsSuccess,
  } = UseInitialFetch(isSuccess);

  useEffect(() => {
    if (error) {
      localStorage.removeItem("notesId");
    }
  }, [error]);

  // WORK: IF ERROR COMES IN CONTINUOUS CHECKING, SHOW ERROR PAGE WHICH THEN TAKE TO LOGIN PAGE
  useEffect(() => {
    if (isError) {
      navigate(`/login?msg=${error?.message}`);
      return;
    }

    if (initialFetchError) {
      navigate(`/login?msg=${initialFetchError?.message}`);
      return;
    }
  }, [isError, error, dispatch, navigate, initialFetchError]);

  if (isLoading || initialFetchIsLoading) {
    return <LoadingState />;
  }

  if (!isSuccess || !initialFetchIsSuccess) {
    return null;
  }

  return (
    <section className="w-full h-screen">
      <OfflineDetector />
      <div className="flex w-full h-full">
        {hideSidebars.bool || (
          <div className="h-full w-60 sm_lap:w-52 tablet:w-40 ">
            <SideNavbar />
          </div>
        )}
        <div className="flex-1 h-full">
          <Outlet />
        </div>
      </div>

      <div className="w-full">
        <GlobalForm />
      </div>
    </section>
  );
};

export default MainLayout;
