// import React from "react";
// import { Outlet} from "react-router-dom";
// import Media from "react-media";
// import { Header } from "../../components/header/header";
// import { Navigation } from "../../components/navigation/navitagion";
// import { Balance } from "../../components/balance/balance";
// import { Currency } from "../../components/currency/currency";

// export const DashboardPage = () => {
//   const renderDesktopLayout = () => {
//     return (
//       <div>
//         <Header />
//         <Navigation />
//         <Balance />
//         <Currency />
//         <Outlet />
//       </div>
//     );
//   };

//   const renderMobileLayout = () => {
//     return (
//       <div>
//         <Header />
//         <Navigation />
//         <Outlet />
//       </div>
//     );
//   };

//   return (
//     <div>
//       <h1>Dashboard</h1>
//       <Media query="(min-width: 768px)">
//         {(matches) => (matches ? renderDesktopLayout() : renderMobileLayout())}
//       </Media>
//     </div>
//   );
// };
