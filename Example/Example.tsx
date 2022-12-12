import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import CircularTabView from '../CircularTabView';
import Button from './Button';
import Header from './Header';
import MyTab from './MyTab';

const HeaderTitle = 'Circular Tab Story';
const DefaultTabs = ['Tab 0', 'Tab 1', 'Tab 2'];
const AddTabTitle = 'Add New Tab';

const Example: React.FC = () => {
  const [lastTabNumber, setLastTabNumber] = useState(DefaultTabs.length);
  const [tabs, setTabs] = useState(DefaultTabs);
  const [activeTab, setActiveTab] = useState(0);

  function handleAddTabPress() {
    setTabs([...tabs, `Tab ${lastTabNumber}`]);
    setLastTabNumber(lastTabNumber + 1);
  }

  const handleRemoveTab = useCallback(
    (tab: string) => {
      if (tabs.length === 1) {
        console.log('At least one tab should be present');
        return;
      }

      const newTabs = tabs.filter(e => e !== tab);
      setTabs([...newTabs]);
    },
    [tabs],
  );

  function handleSelectedTab(index: number) {
    setActiveTab(index);
  }

  function renderHeaderTab(item: string, index: number) {
    const active = index === activeTab;
    return (
      <Button
        key={item}
        title={item}
        style={[styles.headerTabButton, active && styles.activeHeaderTabButton]}
        onPress={() => handleSelectedTab(index)}
      />
    );
  }

  function renderTab(tab: string) {
    const index = tabs.findIndex((e: string) => e === tab);

    return <MyTab index={index} tab={tab} onRemovePress={handleRemoveTab} />;
  }

  return (
    <View style={styles.main}>
      <Header title={HeaderTitle} />
      <Button title={AddTabTitle} onPress={handleAddTabPress} />
      <View style={styles.tabTitlesListContainer}>
        {tabs.map(renderHeaderTab)}
      </View>
      <CircularTabView
        tabs={tabs}
        renderTab={renderTab}
        activeTab={activeTab}
        animated
        cyclicSwipeEnable
        onTabActive={setActiveTab}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#0D47A1',
  },
  main: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabTitlesListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  headerTabButton: {
    margin: 5,
  },
  activeHeaderTabButton: {
    backgroundColor: '#01579B',
  },
});

export default Example;
