import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Toaster } from "./components/ui/sonner";
import TodayMeal from "./components/TodayMeal";
import LeftoverFood from "./components/LeftoverFood";
import HotDeals from "./components/HotDeals";

export default function App() {
  const [activeTab, setActiveTab] = useState("today-meal");

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      <div className="container mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
            <div className="container mx-auto px-4 py-4">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
                <TabsTrigger value="today-meal" className="text-sm">
                  오늘 밥
                </TabsTrigger>
                <TabsTrigger value="leftover-food" className="text-sm">
                  남은 음식
                </TabsTrigger>
                <TabsTrigger value="hot-deals" className="text-sm">
                  핫딜
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          <div className="pt-6">
            <TabsContent value="today-meal" className="mt-0">
              <TodayMeal />
            </TabsContent>

            <TabsContent value="leftover-food" className="mt-0">
              <LeftoverFood />
            </TabsContent>

            <TabsContent value="hot-deals" className="mt-0">
              <HotDeals />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}