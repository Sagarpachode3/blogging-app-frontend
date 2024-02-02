import CustomNavBar from "./CustomNavBar";

const Base = ({ title = "Welcome to my website", children }) => {
  return (
    <div className="container-fluid p-0 m-0">
      <CustomNavBar />
      {children}
      {/* <h1>This is a Footer</h1> */}
    </div>
  );
};

export default Base;
