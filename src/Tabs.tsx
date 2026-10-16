import { useState } from "react";

interface TabProps {
    title: string;
    content: string;
}

function Tabs({ tabs }: { tabs: TabProps[] }) {

    const [activeTab, setActiveTab] = useState(0)

    const handleChangeTab = (index: number) => {
        setActiveTab(index)
    }

    return (
        <div>
            <div className="tabs-container">
                {
                    tabs.map((tab, i) => {
                        return (
                            <button key={i} onClick={() => handleChangeTab(i)}>{tab.title}</button>
                        )
                    })
                }
            </div>
            {
                 tabs[activeTab].content
            }
        </div>
    );
}

export default Tabs;