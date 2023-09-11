// import React from "react";
// import { Navbar, Sidebar } from "../components";
// import { FiSettings } from "react-icons/fi";
// import { TooltipComponent } from "@syncfusion/ej2-react-popups";

// // const activeMenu = true;

// const HomePage = () => {
//   return (
//     // <div>
//     //   {/* <div className="fixed w-full bg-white" style={{ zIndex: "1000" }}>
//     //   <SignIn />
//     // </div>   */}
//     //   <div className="fixed right-4 bottom-4" style={{ zIndex: "999" }}>
//     //     <TooltipComponent content="Settings" position="Top">
//     //       <button
//     //         type="button"
//     //         // onClick={() => setThemeSettings(true)}
//     //         style={{ background: "blue", borderRadius: "50%" }}
//     //         className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
//     //       >
//     //         <FiSettings />
//     //       </button>
//     //     </TooltipComponent>
//     //   </div>
//     //   {activeMenu ? (
//     //     <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
//     //       <Sidebar />
//     //     </div>
//     //   ) : (
//     //     <div className="w-0 dark:bg-secondary-dark-bg">
//     //       <Sidebar />
//     //     </div>
//     //   )}
//     //   <div
//     //     className={
//     //       activeMenu
//     //         ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
//     //         : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
//     //     }
//     //   >
//     //     <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
//     //       <Navbar />
//     //     </div>
//     //   </div>
//     // </div>
//     <>
//       <div className="flex relative dark:bg-main-dark-bg">
//         {/* <div className="fixed w-full bg-white" style={{ zIndex: "1000" }}>
//           <SignIn />
//         </div> */}

//         {activeMenu ? (
//           <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
//             {/* <Sidebar /> */} <Sidebar />
//           </div>
//         ) : (
//           <div className="w-0 dark:bg-secondary-dark-bg">
//             {/* <Sidebar /> */} <Sidebar />
//           </div>
//         )}
//         <div
//           className={
//             activeMenu
//               ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
//               : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
//           }
//         >
//           <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
//             {/* <Navbar /> */} <Navbar />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default HomePage;
import React from "react";

export default function HomePage() {
  return <div>hello i am homepage</div>;
}
