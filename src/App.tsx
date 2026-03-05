import Layout, { type TabId } from "./components/Layout.tsx";
import FamilyTab from "./components/FamilyTab.tsx";
import TargetAudienceWidget from "./components/TargetAudienceWidget.tsx";
import InventoryModule from "./components/InventoryModule.tsx";
import RecommendationOutput from "./components/RecommendationOutput.tsx";
import ScheduleModule from "./components/ScheduleModule.tsx";
import SettingsModal from "./components/SettingsModal.tsx";
import GroceryList from "./components/GroceryList.tsx";
import { AppProvider } from "./context/AppContext.tsx";
import { useState } from "react";

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');

  return (
    <AppProvider>
      <Layout onOpenSettings={() => setShowSettings(true)} activeTab={activeTab} onChangeTab={setActiveTab}>
        {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}

        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <header className="mb-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">Dashboard</p>
              <h1 className="text-3xl font-bold text-textMain tracking-tight">Plan your meals</h1>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Widget 1: Target Audience / Family Select */}
              <div className="space-y-6">
                <TargetAudienceWidget />
              </div>

              {/* Widget 2: Pantry & Vegetables */}
              <div className="space-y-6">
                <InventoryModule />
              </div>
            </div>

            {/* Widget 3: Full-width Recommendations */}
            <div className="w-full">
              <RecommendationOutput />
            </div>
          </div>
        )}

        {activeTab === 'family' && (
          <div className="space-y-8">
            <header className="mb-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">Family</p>
              <h1 className="text-3xl font-bold text-textMain tracking-tight">Manage members</h1>
            </header>
            <div className="max-w-2xl">
              {/* We will move the "Add Member" form here later */}
              <FamilyTab />
            </div>
          </div>
        )}

        {activeTab === 'calendar' && (
          <div className="space-y-8">
            <header className="mb-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">Calendar & Schedule</p>
              <h1 className="text-3xl font-bold text-textMain tracking-tight">Your week at a glance</h1>
            </header>
            <ScheduleModule />
          </div>
        )}

        {activeTab === 'grocery' && (
          <div className="space-y-8">
            <header className="mb-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">Grocery</p>
              <h1 className="text-3xl font-bold text-textMain tracking-tight">Shopping list</h1>
            </header>
            <div className="max-w-4xl">
              <GroceryList />
            </div>
          </div>
        )}

      </Layout>
    </AppProvider>
  );
}

export default App;
