import TabBar from "@components/TabBar";
import React from "react";

const TabLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {children}
      <TabBar />
    </div>
  );
};

export default TabLayout;
