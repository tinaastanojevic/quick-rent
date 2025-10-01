import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function AdminTabs({ setRequestType }) {
  return (
    <Tabs
      defaultValue="role"
      className="flex w-full bg-white p-2 rounded-2xl shadow-md"
    >
      <TabsList className="flex w-full bg-white p-2 rounded-2xl">
        <TabsTrigger
          className="text-xl p-4 cursor-pointer text-gray-800 hover:text-blue-500 transition-colors"
          onClick={() => setRequestType("role")}
          value="role"
        >
          Role requests
        </TabsTrigger>
        <TabsTrigger
          className="text-xl p-4 cursor-pointer text-gray-800 hover:text-blue-500 transition-colors"
          onClick={() => setRequestType("rental")}
          value="rental"
        >
          Rental requests
        </TabsTrigger>
        <TabsTrigger
          className="text-xl p-4 cursor-pointer text-gray-800 hover:text-blue-500 transition-colors"
          onClick={() => setRequestType("publish")}
          value="publish"
        >
          Publish requests
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

export default AdminTabs;
