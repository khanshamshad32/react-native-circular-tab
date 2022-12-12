## react-native-circular-tab

A react native library to provide tab view in your app with cyclic swipes. It also supports dynamically add and remove tabs


<img src='https://user-images.githubusercontent.com/32536287/206971655-6af957d7-d33b-4a17-a388-72757a028446.gif' width='30%' />


### Usage

`import CircularTabView from 'react-native-circular-tab';`

`<CircularTabView
  tabs={tabs}
  renderTab={renderTab}
  activeTab={activeTab}
  animated
  cyclicSwipeEnable
  onTabActive={setActiveTab}
/>`

##### Props 
- tabs: any[];  // Array of tabs data
- activeTab?: number; // index of active tab
- animated?: boolean; // showing tab switching be animated when activetab changes
- cyclicSwipeEnable?: boolean;   // allow cyclic tabs
- renderTab: (tab: any) => React.ReactElement;  // tab content
- onTabActive: (index: number) => void;   // on actiev tab changes by swiping

